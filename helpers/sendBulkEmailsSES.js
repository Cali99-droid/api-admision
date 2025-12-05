import * as aws from "@aws-sdk/client-ses";
import nodemailer from "nodemailer";
import { promises as fs } from "fs";
import path from "path";
import loggerStream from "../utils/handleLogger.js";
import {
  getUsersByRole,
  getUsersByRoleClient,
} from "./getUsersKeycloakByRealmRole.js";
import { getKeycloakUsersByIds } from "./getKeycloakUserById.js";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

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
 * @param {string} options.roleName - Nombre del rol de Keycloak (opcional si se pasa users o filterByDatabase)
 * @param {boolean} options.isClientRole - Si es un rol de cliente (default: false)
 * @param {Array} options.users - Array de usuarios con { email, firstName, lastName } (opcional si se pasa roleName o filterByDatabase)
 * @param {boolean} options.filterByDatabase - Si true, filtra usuarios de Keycloak usando los 'sub' de la BD (default: false)
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
    filterByDatabase = false,
    htmlTemplatePath,
    subject = "Información Importante - Colegio Albert Einstein",
    batchSize = 5,
    batchDelay = 2000,
    pauseAfterBatch = 1000,
    onProgress,
    onComplete,
    onError,
  } = options;
  /**año activo */

  // Validar que se proporcione roleName, users o filterByDatabase
  if (!roleName && !providedUsers && !filterByDatabase) {
    throw new Error("Debe proporcionar roleName, users o filterByDatabase");
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
        if (filterByDatabase) {
          const yearActive = await prisma.year.findFirst({
            where: {
              status: true,
            },
          });

          // Opción nueva: Filtrar por usuarios en la base de datos
          console.log("Obteniendo usuarios de la base de datos...");
          const data = await prisma.familiy_secretary.findMany({
            where: {
              OR: [
                // Familias con vacantes del año especificado
                {
                  family: {
                    children: {
                      some: {
                        vacant: {
                          some: {
                            year_id: yearActive.id,
                          },
                        },
                      },
                    },
                  },
                },
                // Familias con hijos pero sin vacantes
                {
                  family: {
                    children: {
                      some: {
                        vacant: {
                          none: {},
                        },
                      },
                    },
                  },
                },
                // Familias sin hijos
                {
                  family: {
                    children: {
                      none: {},
                    },
                  },
                },
              ],
            },
            select: {
              status: true,
              family: {
                include: {
                  children: {
                    include: {
                      vacant: {
                        where: {
                          year_id: yearActive.id,
                        },
                      },
                    },
                  },
                  person_family_parent_oneToperson: true,
                },
              },
              user: {
                select: {
                  person: true,
                },
              },
            },
            orderBy: {
              id: "asc",
            },
          });
          const ids = data.map((as) => {
            return as.family.person_family_parent_oneToperson.id;
          });
          console.log(`Total de asignaciones en BD: ${data.length}`);
          // Obtener todos los 'sub' de la tabla user
          const dbUsers = await prisma.user.findMany({
            where: {
              person_id: {
                in: ids,
              },
            },
            select: {
              sub: true,
              person: {
                select: {
                  name: true,
                  lastname: true,
                  mLastname: true,
                  email: true,
                },
              },
            },
          });

          console.log(`Total de usuarios en BD: ${dbUsers.length}`);

          if (dbUsers.length === 0) {
            const error = new Error(
              "No se encontraron usuarios en la base de datos"
            );
            processState.status = "completed";
            processState.endTime = new Date();
            if (onError) onError(error);
            return;
          }

          // Extraer los 'sub' (IDs de Keycloak)
          const keycloakIds = dbUsers.map((u) => u.sub);

          // Obtener información de esos usuarios desde Keycloak
          console.log(
            `Obteniendo información de ${keycloakIds.length} usuarios desde Keycloak...`
          );
          const keycloakUsers = await getKeycloakUsersByIds(keycloakIds);

          // Mapear los usuarios de Keycloak con formato esperado
          users = keycloakUsers.map((kUser) => ({
            id: kUser.id,
            email: kUser.email,
            firstName: kUser.firstName || "",
            lastName: kUser.lastName || "",
            username: kUser.username,
          }));

          console.log(`Usuarios de Keycloak obtenidos: ${users.length}`);
        } else {
          // Opción original: Por rol
          console.log(`Obteniendo usuarios del rol: ${roleName}...`);
          if (isClientRole) {
            users = await getUsersByRoleClient(roleName);
          } else {
            users = await getUsersByRole(roleName);
          }
        }
      }

      if (!users || users.length === 0) {
        const error = new Error(
          "No se encontraron usuarios para enviar emails"
        );
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
        const error = new Error(
          "No se encontraron usuarios con emails válidos"
        );
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
          console.log(
            `Pausando ${pauseAfterBatch}ms antes del siguiente lote...`
          );
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
 * Helper para capitalizar la primera letra de cada palabra
 * @private
 */
function capitalizeFirstLetter(text) {
  if (!text) return "";
  return text
    .split(" ")
    .map((word) => {
      if (!word) return "";
      return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
    })
    .join(" ");
}

/**
 * Envía un email individual
 * @private
 */
async function sendSingleEmail(user, htmlContent, subject, processState) {
  const { email, firstName, lastName } = user;
  const fullName = `${firstName || ""} ${lastName || ""}`.trim() || "Usuario";

  // Capitalizar apellidos
  const capitalizedLastName = capitalizeFirstLetter(lastName || "");

  // Personalizar asunto con apellidos
  const personalizedSubject = capitalizedLastName
    ? `${subject} - ${capitalizedLastName}`
    : subject;

  try {
    // Personalizar el HTML (si se necesita)
    const personalizedHtml = htmlContent;

    // Enviar email
    await new Promise((resolve, reject) => {
      transporter.sendMail(
        {
          from: `"Admisión Colegio AE" <${process.env.AWS_SES_FROM}>`,
          to: email,
          subject: personalizedSubject,
          html: personalizedHtml,
          cc: "orellano428@gmail.com",
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

    console.error(
      `✗ Error enviando a ${email} (${fullName}): ${error.message}`
    );

    loggerStream.write(
      `[${new Date().toISOString()}] ERROR: Falló envío a ${email} (${fullName}) - ${
        error.message
      }\n`
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

/**
 * Función simplificada para enviar a usuarios filtrados por base de datos
 * Obtiene todos los 'sub' de la tabla user y envía emails a esos usuarios de Keycloak
 * @param {string} htmlFilePath - Ruta al archivo HTML
 * @param {string} subject - Asunto del email
 * @returns {Promise<Object>} - Estado del proceso
 */
export const sendBulkEmailsFromDatabase = async (htmlFilePath, subject) => {
  return await sendBulkEmails({
    filterByDatabase: true,
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
