import { IncomingWebhook } from "@slack/webhook";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Inicializar webhook de Slack solo si está configurado
let webHook = null;
if (process.env.SLACK_WEBHOOK) {
  try {
    webHook = new IncomingWebhook(process.env.SLACK_WEBHOOK);
  } catch (error) {
    console.warn("⚠️  Slack webhook no configurado. Los logs se escribirán solo en archivo.");
  }
}

// Crear directorio de logs si no existe
const logsDir = path.join(__dirname, "..", "logs");
if (!fs.existsSync(logsDir)) {
  fs.mkdirSync(logsDir, { recursive: true });
}

// Archivo de log con fecha
const logFile = path.join(logsDir, `app-${new Date().toISOString().split('T')[0]}.log`);

const loggerStream = {
  write: (message) => {
    // Escribir a archivo
    try {
      fs.appendFileSync(logFile, message);
    } catch (error) {
      console.error("Error escribiendo log a archivo:", error.message);
    }

    // Enviar a Slack si está configurado (de forma asíncrona, sin bloquear)
    if (webHook) {
      webHook.send({ text: message }).catch((error) => {
        // Silenciar errores de Slack para no interrumpir el flujo principal
        // Solo mostrar en modo debug
        if (process.env.NODE_ENV === 'development') {
          console.debug("⚠️  Error enviando a Slack (no crítico):", error.message);
        }
      });
    }
  },
};

export default loggerStream;
