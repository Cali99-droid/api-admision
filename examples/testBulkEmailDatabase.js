/**
 * Script de prueba para envío masivo desde base de datos
 *
 * Este script prueba el envío de emails a usuarios cuyo 'sub' existe en la BD
 *
 * Uso:
 *   node examples/testBulkEmailDatabase.js
 */

import path from "path";
import { fileURLToPath } from "url";
import { sendBulkEmailsFromDatabase } from "../helpers/sendBulkEmailsSES.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function testEnvioDesdeBaseDatos() {
  console.log("\n╔═══════════════════════════════════════════════════╗");
  console.log("║   TEST DE ENVÍO DESDE BASE DE DATOS              ║");
  console.log("╚═══════════════════════════════════════════════════╝\n");

  const htmlFilePath = path.join(
    __dirname,
    "..",
    "templates",
    "emails",
    "politicas-admision-2026.html"
  );

  console.log("📄 Template:", htmlFilePath);
  console.log("🔍 Filtro: Usuarios con 'sub' en la base de datos");
  console.log("\n⏳ Iniciando envío...\n");

  try {
    const processState = await sendBulkEmailsFromDatabase(
      htmlFilePath,
      "Políticas de admisión 2026 - Colegio Albert Einstein"
    );

    console.log("🚀 Proceso iniciado con éxito!");
    console.log("Estado inicial:", {
      totalEmails: processState.totalEmails,
      status: processState.status,
    });
  } catch (error) {
    console.error("\n❌ Error al iniciar el proceso:");
    console.error(error.message);
    console.error("\nVerifica:");
    console.error("  1. Las variables de entorno de AWS SES están configuradas");
    console.error("  2. La base de datos está accesible");
    console.error("  3. Hay usuarios en la tabla 'user'");
    console.error("  4. El archivo HTML existe en la ruta especificada\n");
  }
}

// Ejecutar test
testEnvioDesdeBaseDatos()
  .then(() => {
    console.log(
      "\n👋 Test finalizado. El proceso continúa en segundo plano.\n"
    );
    console.log("💡 Los emails se enviarán a todos los usuarios cuyo 'sub' exista en la BD.");
    console.log("💡 Solo se obtendrán de Keycloak los usuarios que estén en tu sistema.\n");
  })
  .catch((error) => {
    console.error("\n❌ Error fatal:", error);
    process.exit(1);
  });
