import * as aws from "@aws-sdk/client-ses";
import nodemailer from "nodemailer";
import { promises as fs } from "fs";
import path from "path";
import loggerStream from "../utils/handleLogger.js";
import { getUsersByRole, getUsersByRoleClient } from "./getUsersKeycloakByRealmRole.js";

const ses = new aws.SES({
  apiVersion: "2010-12-01",
  region: process.env.AWS_REGION,
  credentials: {
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  },
});

const transporter = nodemailer.createTransport({
  SES: { ses, aws },
  sendingRate: 1, // max 1 messages/second
  maxConnections: 1,
});

/**
 * Envía emails masivos a usuarios de Keycloak en segundo plano
 * @param {Object} options - Opciones de configuración
 * @param {string} options.roleName - Nombre del rol de Keycloak (opcional si se pasa users)
 * @param {boolean} options.isClientRole - Si es un rol de cliente (default: false)
 * @param {Array} options.users - Array de usuarios con { email, firstName, lastName } (opcional si se pasa roleName)
 * @param {string} options.htmlTemplatePath - Ruta al archivo HTML del template
 * @param {string} options.subject - Asunto del email
 * @param {number} options.batchSize - Cantidad de emails por lote (default: 5)
 * @param {number} options.batchDelay - Delay entre lotes en ms (default: 2000)
 * @param {number} options.pauseAfterBatch - Pausa después de cada lote en ms (default: 1000)
 * @param {Function} options.onProgress - Callback para reportar progreso (emailsSent, totalEmails, currentEmail)
 * @param {Function} options.onComplete - Callback cuando termina el proceso (results)
 * @param {Function} options.onError - Callback cuando hay un error general
 * @returns {Promise<Object>} - Objeto con el estado del proceso y resultados
 */
export const sendBulkEmails = async (options) => {
  const {
    roleName,
    isClientRole = false,
    users: providedUsers,
    htmlTemplatePath,
    subject = "Información Importante - Colegio Albert Einstein",
    batchSize = 5,
    batchDelay = 2000,
    pauseAfterBatch = 1000,
    onProgress,
    onComplete,
    onError,
  } = options;

  // Validar que se proporcione roleName o users
  if (!roleName && !providedUsers) {
    throw new Error("Debe proporcionar roleName o users");
  }

  if (!htmlTemplatePath) {
    throw new Error("Debe proporcionar htmlTemplatePath");
  }

  // Estado del proceso
  const processState = {
    status: "running",
    totalEmails: 0,
    sentEmails: 0,
    failedEmails: 0,
    results: [],
    startTime: new Date(),
    endTime: null,
  };

  // Ejecutar en segundo plano
  setImmediate(async () => {
    try {
      // 1. Obtener usuarios
      let users = providedUsers;

      if (!users) {
        console.log(`Obteniendo usuarios del rol: ${roleName}...`);
        if (isClientRole) {
          users = await getUsersByRoleClient(roleName);
        } else {
          users = await getUsersByRole(roleName);
        }
      }

      if (!users || users.length === 0) {
        const error = new Error("No se encontraron usuarios para enviar emails");
        processState.status = "completed";
        processState.endTime = new Date();
        if (onError) onError(error);
        return;
      }

      processState.totalEmails = users.length;
      console.log(`Total de usuarios a enviar: ${users.length}`);

      // 2. Leer el template HTML
      const htmlContent = await fs.readFile(htmlTemplatePath, "utf-8");

      // 3. Filtrar usuarios con email válido
      const validUsers = users.filter(
        (user) => user.email && user.email.includes("@")
      );

      if (validUsers.length === 0) {
        const error = new Error("No se encontraron usuarios con emails válidos");
        processState.status = "completed";
        processState.endTime = new Date();
        if (onError) onError(error);
        return;
      }

      processState.totalEmails = validUsers.length;
      console.log(`Usuarios con email válido: ${validUsers.length}`);

      // 4. Enviar emails en lotes
      for (let i = 0; i < validUsers.length; i += batchSize) {
        const batch = validUsers.slice(i, i + batchSize);
        const batchNumber = Math.floor(i / batchSize) + 1;
        const totalBatches = Math.ceil(validUsers.length / batchSize);

        console.log(
          `Procesando lote ${batchNumber}/${totalBatches} (${batch.length} emails)...`
        );

        // Enviar emails del lote en paralelo
        const batchPromises = batch.map((user) =>
          sendSingleEmail(user, htmlContent, subject, processState)
        );

        await Promise.allSettled(batchPromises);

        // Callback de progreso
        if (onProgress) {
          onProgress(processState.sentEmails, processState.totalEmails, batch);
        }

        // Pausa después del lote (excepto en el último)
        if (i + batchSize < validUsers.length) {
          console.log(`Pausando ${pauseAfterBatch}ms antes del siguiente lote...`);
          await sleep(pauseAfterBatch);
        }

        // Delay entre lotes
        if (i + batchSize < validUsers.length) {
          await sleep(batchDelay);
        }
      }

      // 5. Finalizar proceso
      processState.status = "completed";
      processState.endTime = new Date();
      const duration = processState.endTime - processState.startTime;

      console.log("\n=== RESUMEN DEL ENVÍO ===");
      console.log(`Total emails: ${processState.totalEmails}`);
      console.log(`Enviados exitosamente: ${processState.sentEmails}`);
      console.log(`Fallidos: ${processState.failedEmails}`);
      console.log(`Duración: ${Math.round(duration / 1000)}s`);
      console.log("========================\n");

      // Log al archivo
      loggerStream.write(
        `\n=== BULK EMAIL REPORT ${new Date().toISOString()} ===\n` +
          `Total: ${processState.totalEmails}\n` +
          `Exitosos: ${processState.sentEmails}\n` +
          `Fallidos: ${processState.failedEmails}\n` +
          `Duración: ${Math.round(duration / 1000)}s\n` +
          `================================\n`
      );

      // Callback de completado
      if (onComplete) {
        onComplete({
          ...processState,
          duration,
        });
      }
    } catch (error) {
      console.error("Error en el proceso de envío masivo:", error);
      processState.status = "error";
      processState.endTime = new Date();
      processState.error = error.message;

      if (onError) {
        onError(error);
      }
    }
  });

  return processState;
};

/**
 * Envía un email individual
 * @private
 */
async function sendSingleEmail(user, htmlContent, subject, processState) {
  const { email, firstName, lastName } = user;
  const fullName = `${firstName || ""} ${lastName || ""}`.trim() || "Usuario";

  try {
    // Personalizar el HTML (si se necesita)
    const personalizedHtml = htmlContent;

    // Enviar email
    await new Promise((resolve, reject) => {
      transporter.sendMail(
        {
          from: `"Admisión Colegio AE" <${process.env.AWS_SES_FROM}>`,
          to: email,
          subject: subject,
          html: personalizedHtml,
        },
        (err, info) => {
          if (err) {
            reject(err);
          } else {
            resolve(info);
          }
        }
      );
    });

    processState.sentEmails++;
    processState.results.push({
      email,
      name: fullName,
      status: "success",
      timestamp: new Date(),
    });

    console.log(`✓ Email enviado a: ${email} (${fullName})`);

    loggerStream.write(
      `[${new Date().toISOString()}] SUCCESS: Email enviado a ${email} (${fullName})\n`
    );
  } catch (error) {
    processState.failedEmails++;
    processState.results.push({
      email,
      name: fullName,
      status: "failed",
      error: error.message,
      timestamp: new Date(),
    });

    console.error(`✗ Error enviando a ${email} (${fullName}): ${error.message}`);

    loggerStream.write(
      `[${new Date().toISOString()}] ERROR: Falló envío a ${email} (${fullName}) - ${error.message}\n`
    );
  }
}

/**
 * Helper para pausar la ejecución
 * @private
 */
function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

/**
 * Función simplificada para enviar a todos los usuarios de un rol
 * @param {string} roleName - Nombre del rol de Keycloak
 * @param {string} htmlFilePath - Ruta al archivo HTML
 * @param {string} subject - Asunto del email
 * @param {boolean} isClientRole - Si es rol de cliente
 * @returns {Promise<Object>} - Estado del proceso
 */
export const sendBulkEmailsByRole = async (
  roleName,
  htmlFilePath,
  subject,
  isClientRole = false
) => {
  return await sendBulkEmails({
    roleName,
    isClientRole,
    htmlTemplatePath: htmlFilePath,
    subject,
    batchSize: 5,
    batchDelay: 2000,
    pauseAfterBatch: 1000,
    onProgress: (sent, total) => {
      console.log(`Progreso: ${sent}/${total} emails enviados`);
    },
    onComplete: (results) => {
      console.log("Proceso completado exitosamente");
    },
    onError: (error) => {
      console.error("Error en el proceso:", error);
    },
  });
};
