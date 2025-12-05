/**
 * Script de prueba rápida para el envío masivo de emails
 *
 * Este script permite probar el sistema de envío masivo sin afectar usuarios reales.
 * Envía a una lista de prueba de 3 emails ficticios.
 *
 * Uso:
 *   node examples/testBulkEmail.js
 */

import path from "path";
import { fileURLToPath } from "url";
import { sendBulkEmails } from "../helpers/sendBulkEmailsSES.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Lista de emails de prueba (REEMPLAZA CON TUS EMAILS DE PRUEBA)
const emailsPrueba = [
  {
    email: "orellano428@gmail.com", // Cambia por tu email
    firstName: "Usuario",
    lastName: "Prueba 1",
  },
  {
    email: "carlosjhardel4@gmail.com", // Cambia por tu email
    firstName: "Usuario",
    lastName: "Prueba 2",
  },
  {
    email: "carlos.orellano@ae.edu.pe", // Cambia por tu email
    firstName: "Usuario",
    lastName: "Prueba 3",
  },
];

async function testEnvioMasivo() {
  console.log("\n╔═══════════════════════════════════════════════════╗");
  console.log("║         TEST DE ENVÍO MASIVO DE EMAILS           ║");
  console.log("╚═══════════════════════════════════════════════════╝\n");

  const htmlFilePath = path.join(
    __dirname,
    "..",
    "templates",
    "emails",
    "politicas-admision-2026.html"
  );

  console.log("📧 Enviando a:", emailsPrueba.map((u) => u.email).join(", "));
  console.log("📄 Template:", htmlFilePath);
  console.log("\n⏳ Iniciando envío...\n");

  try {
    const processState = await sendBulkEmails({
      users: emailsPrueba,
      htmlTemplatePath: htmlFilePath,
      subject: "TEST - Políticas de admisión 2026",
      batchSize: 2, // 2 emails por lote para ver el proceso
      batchDelay: 3000, // 3 segundos entre lotes
      pauseAfterBatch: 1000, // 1 segundo de pausa

      onProgress: (sent, total, currentBatch) => {
        console.log(`\n📊 Progreso: ${sent}/${total} emails enviados`);
        console.log(
          `   Lote actual: ${currentBatch.map((u) => u.email).join(", ")}`
        );
      },

      onComplete: (results) => {
        console.log("\n" + "=".repeat(60));
        console.log("✅ TEST COMPLETADO");
        console.log("=".repeat(60));
        console.log(`Total emails:     ${results.totalEmails}`);
        console.log(`Enviados:         ${results.sentEmails} ✓`);
        console.log(`Fallidos:         ${results.failedEmails} ✗`);
        console.log(
          `Duración:         ${Math.round(results.duration / 1000)}s`
        );
        console.log("=".repeat(60) + "\n");

        // Mostrar resultados detallados
        console.log("📋 Resultados detallados:");
        results.results.forEach((result, index) => {
          const icon = result.status === "success" ? "✓" : "✗";
          console.log(
            `   ${index + 1}. ${icon} ${result.email} (${result.name}) - ${
              result.status
            }`
          );
          if (result.error) {
            console.log(`      Error: ${result.error}`);
          }
        });

        console.log("\n✨ Revisa tu bandeja de entrada!");
      },

      onError: (error) => {
        console.error("\n" + "=".repeat(60));
        console.error("❌ ERROR EN EL TEST");
        console.error("=".repeat(60));
        console.error("Error:", error.message);
        console.error("=".repeat(60) + "\n");
      },
    });

    console.log("🚀 Proceso iniciado con éxito!");
    console.log("Estado inicial:", {
      totalEmails: processState.totalEmails,
      status: processState.status,
    });
  } catch (error) {
    console.error("\n❌ Error al iniciar el proceso:");
    console.error(error.message);
    console.error("\nVerifica:");
    console.error(
      "  1. Las variables de entorno de AWS SES están configuradas"
    );
    console.error("  2. El archivo HTML existe en la ruta especificada");
    console.error("  3. Los emails de prueba son válidos");
    console.error("  4. Tu cuenta de AWS SES está configurada correctamente\n");
  }
}

// Ejecutar test
testEnvioMasivo()
  .then(() => {
    console.log(
      "\n👋 Test finalizado. El proceso continúa en segundo plano.\n"
    );
  })
  .catch((error) => {
    console.error("\n❌ Error fatal:", error);
    process.exit(1);
  });
