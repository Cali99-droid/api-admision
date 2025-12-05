/**
 * Ejemplo de uso del módulo de envío masivo de emails
 *
 * Este script muestra cómo usar la función sendBulkEmails directamente
 * sin necesidad de hacer llamadas a la API.
 *
 * Uso:
 *   node examples/sendBulkEmailExample.js
 */

import path from "path";
import { fileURLToPath } from "url";
import { sendBulkEmails, sendBulkEmailsByRole } from "../helpers/sendBulkEmailsSES.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/**
 * EJEMPLO 1: Enviar a todos los usuarios de un rol
 */
async function ejemplo1_EnviarPorRol() {
  console.log("\n=== EJEMPLO 1: Enviar por Rol ===\n");

  const htmlFilePath = path.join(
    __dirname,
    "..",
    "templates",
    "emails",
    "politicas-admision-2026.html"
  );

  const processState = await sendBulkEmailsByRole(
    "student", // Nombre del rol
    htmlFilePath,
    "Políticas de admisión 2026 - Colegio Albert Einstein",
    false // isClientRole
  );

  console.log("Proceso iniciado:", processState);
}

/**
 * EJEMPLO 2: Enviar a lista personalizada de usuarios
 */
async function ejemplo2_EnviarListaPersonalizada() {
  console.log("\n=== EJEMPLO 2: Lista Personalizada ===\n");

  const usuarios = [
    {
      email: "padre1@example.com",
      firstName: "Juan",
      lastName: "Pérez",
    },
    {
      email: "padre2@example.com",
      firstName: "María",
      lastName: "García",
    },
    {
      email: "padre3@example.com",
      firstName: "Carlos",
      lastName: "López",
    },
  ];

  const htmlFilePath = path.join(
    __dirname,
    "..",
    "templates",
    "emails",
    "politicas-admision-2026.html"
  );

  const processState = await sendBulkEmails({
    users: usuarios,
    htmlTemplatePath: htmlFilePath,
    subject: "Bienvenidos al proceso de admisión 2026",
    batchSize: 2, // 2 emails por lote
    batchDelay: 3000, // 3 segundos entre lotes
    pauseAfterBatch: 1500, // 1.5 segundos de pausa
    onProgress: (sent, total, currentBatch) => {
      console.log(`\n📧 Progreso: ${sent}/${total} emails enviados`);
      console.log(
        `   Lote actual: ${currentBatch.map((u) => u.email).join(", ")}`
      );
    },
    onComplete: (results) => {
      console.log("\n✅ Proceso completado!");
      console.log(`   Total enviados: ${results.sentEmails}`);
      console.log(`   Total fallidos: ${results.failedEmails}`);
      console.log(
        `   Duración: ${Math.round(results.duration / 1000)} segundos`
      );
    },
    onError: (error) => {
      console.error("\n❌ Error en el proceso:", error.message);
    },
  });

  console.log("Proceso iniciado con ID:", processState);
}

/**
 * EJEMPLO 3: Configuración avanzada con callbacks
 */
async function ejemplo3_ConfiguracionAvanzada() {
  console.log("\n=== EJEMPLO 3: Configuración Avanzada ===\n");

  const htmlFilePath = path.join(
    __dirname,
    "..",
    "templates",
    "emails",
    "politicas-admision-2026.html"
  );

  // Contador de progreso
  let ultimoPorcentaje = 0;

  const processState = await sendBulkEmails({
    roleName: "student",
    isClientRole: false,
    htmlTemplatePath: htmlFilePath,
    subject: "Información importante - Admisión 2026",
    batchSize: 10, // 10 emails por lote
    batchDelay: 1000, // 1 segundo entre lotes
    pauseAfterBatch: 500, // 0.5 segundos de pausa

    // Callback de progreso
    onProgress: (sent, total, currentBatch) => {
      const porcentaje = Math.round((sent / total) * 100);

      // Solo mostrar cuando cambia el porcentaje
      if (porcentaje !== ultimoPorcentaje) {
        ultimoPorcentaje = porcentaje;

        // Barra de progreso
        const barLength = 30;
        const filledLength = Math.round((barLength * sent) / total);
        const bar = "█".repeat(filledLength) + "░".repeat(barLength - filledLength);

        console.log(`\n[${bar}] ${porcentaje}%`);
        console.log(`   Enviados: ${sent}/${total}`);
      }
    },

    // Callback de completado
    onComplete: (results) => {
      console.log("\n" + "=".repeat(50));
      console.log("✅ ENVÍO MASIVO COMPLETADO");
      console.log("=".repeat(50));
      console.log(`Total emails:     ${results.totalEmails}`);
      console.log(`Enviados:         ${results.sentEmails} ✓`);
      console.log(`Fallidos:         ${results.failedEmails} ✗`);
      console.log(`Tasa de éxito:    ${Math.round((results.sentEmails / results.totalEmails) * 100)}%`);
      console.log(`Inicio:           ${results.startTime.toLocaleString()}`);
      console.log(`Fin:              ${results.endTime.toLocaleString()}`);
      console.log(`Duración total:   ${Math.round(results.duration / 1000)}s`);
      console.log("=".repeat(50) + "\n");

      // Mostrar emails fallidos
      if (results.failedEmails > 0) {
        console.log("\n⚠️  Emails fallidos:");
        results.results
          .filter((r) => r.status === "failed")
          .forEach((r) => {
            console.log(`   - ${r.email} (${r.name}): ${r.error}`);
          });
      }
    },

    // Callback de error
    onError: (error) => {
      console.error("\n" + "=".repeat(50));
      console.error("❌ ERROR EN EL PROCESO");
      console.error("=".repeat(50));
      console.error(error.message);
      console.error("=".repeat(50) + "\n");
    },
  });

  console.log("Proceso iniciado. Estado:", processState);
}

/**
 * EJEMPLO 4: Enviar con rol de cliente
 */
async function ejemplo4_EnviarRolCliente() {
  console.log("\n=== EJEMPLO 4: Enviar con Rol de Cliente ===\n");

  const htmlFilePath = path.join(
    __dirname,
    "..",
    "templates",
    "emails",
    "politicas-admision-2026.html"
  );

  const processState = await sendBulkEmails({
    roleName: "app-student", // Nombre del rol de cliente
    isClientRole: true, // IMPORTANTE: indicar que es rol de cliente
    htmlTemplatePath: htmlFilePath,
    subject: "Actualización importante",
    batchSize: 5,
    batchDelay: 2000,
    onProgress: (sent, total) => {
      console.log(`Enviados ${sent}/${total}`);
    },
  });

  console.log("Proceso iniciado:", processState);
}

/**
 * EJEMPLO 5: Manejo de errores
 */
async function ejemplo5_ManejoErrores() {
  console.log("\n=== EJEMPLO 5: Manejo de Errores ===\n");

  try {
    // Intentar enviar sin proporcionar parámetros requeridos
    await sendBulkEmails({
      // roleName: "student", // Falta este parámetro
      htmlTemplatePath: "ruta/inexistente.html",
      subject: "Test",
    });
  } catch (error) {
    console.error("❌ Error capturado:", error.message);
  }

  try {
    // Intentar con archivo que no existe
    await sendBulkEmails({
      users: [{ email: "test@test.com", firstName: "Test", lastName: "User" }],
      htmlTemplatePath: "/ruta/que/no/existe.html",
      subject: "Test",
    });
  } catch (error) {
    console.error("❌ Error capturado:", error.message);
  }
}

// ============================================
// EJECUTAR EJEMPLOS
// ============================================

async function main() {
  console.log("\n");
  console.log("╔═══════════════════════════════════════════════════╗");
  console.log("║   EJEMPLOS DE ENVÍO MASIVO DE EMAILS             ║");
  console.log("╚═══════════════════════════════════════════════════╝");

  // Descomentar el ejemplo que quieras ejecutar:

  // await ejemplo1_EnviarPorRol();
  await ejemplo2_EnviarListaPersonalizada();
  // await ejemplo3_ConfiguracionAvanzada();
  // await ejemplo4_EnviarRolCliente();
  // await ejemplo5_ManejoErrores();

  console.log("\n✨ Script finalizado\n");
}

// Ejecutar si se llama directamente
if (import.meta.url === `file://${process.argv[1]}`) {
  main().catch(console.error);
}

// Exportar funciones para uso en otros módulos
export {
  ejemplo1_EnviarPorRol,
  ejemplo2_EnviarListaPersonalizada,
  ejemplo3_ConfiguracionAvanzada,
  ejemplo4_EnviarRolCliente,
  ejemplo5_ManejoErrores,
};
