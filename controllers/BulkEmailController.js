import { sendBulkEmails, sendBulkEmailsByRole } from "../helpers/sendBulkEmailsSES.js";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/**
 * Almacena los estados de los procesos de envío en ejecución
 * En producción, considerar usar Redis o una base de datos
 */
const activeProcesses = new Map();

/**
 * Envía emails masivos a usuarios de un rol de Keycloak
 * POST /api/bulk-email/send-by-role
 * Body: { roleName, subject, htmlFilePath, isClientRole, batchSize, batchDelay, pauseAfterBatch }
 */
export const sendEmailsByRole = async (req, res) => {
  try {
    const {
      roleName,
      subject = "Información Importante - Colegio Albert Einstein",
      htmlFilePath,
      isClientRole = false,
      batchSize = 5,
      batchDelay = 2000,
      pauseAfterBatch = 1000,
    } = req.body;

    // Validaciones
    if (!roleName) {
      return res.status(400).json({
        success: false,
        message: "El campo roleName es requerido",
      });
    }

    if (!htmlFilePath) {
      return res.status(400).json({
        success: false,
        message: "El campo htmlFilePath es requerido",
      });
    }

    // Generar ID único para el proceso
    const processId = `${Date.now()}_${Math.random().toString(36).substring(7)}`;

    // Iniciar el proceso en segundo plano
    const processState = await sendBulkEmails({
      roleName,
      isClientRole,
      htmlTemplatePath: htmlFilePath,
      subject,
      batchSize,
      batchDelay,
      pauseAfterBatch,
      onProgress: (sent, total, batch) => {
        console.log(`[${processId}] Progreso: ${sent}/${total} emails enviados`);
      },
      onComplete: (results) => {
        console.log(`[${processId}] Proceso completado`);
        const state = activeProcesses.get(processId);
        if (state) {
          state.status = "completed";
          state.completedAt = new Date();
        }
      },
      onError: (error) => {
        console.error(`[${processId}] Error:`, error);
        const state = activeProcesses.get(processId);
        if (state) {
          state.status = "error";
          state.error = error.message;
          state.completedAt = new Date();
        }
      },
    });

    // Guardar referencia al proceso
    activeProcesses.set(processId, {
      ...processState,
      processId,
      roleName,
      subject,
      createdAt: new Date(),
    });

    // Limpiar procesos antiguos (más de 1 hora)
    cleanupOldProcesses();

    // Responder inmediatamente
    res.status(202).json({
      success: true,
      message: "Proceso de envío masivo iniciado en segundo plano",
      processId,
      status: "running",
      totalEmails: processState.totalEmails,
      estimatedDuration: `${Math.ceil((processState.totalEmails * 2) / 60)} minutos aprox.`,
    });
  } catch (error) {
    console.error("Error iniciando envío masivo:", error);
    res.status(500).json({
      success: false,
      message: "Error al iniciar el proceso de envío masivo",
      error: error.message,
    });
  }
};

/**
 * Envía emails masivos a una lista personalizada de usuarios
 * POST /api/bulk-email/send-custom
 * Body: { users: [{email, firstName, lastName}], subject, htmlFilePath, batchSize, batchDelay }
 */
export const sendEmailsCustom = async (req, res) => {
  try {
    const {
      users,
      subject = "Información Importante - Colegio Albert Einstein",
      htmlFilePath,
      batchSize = 5,
      batchDelay = 2000,
      pauseAfterBatch = 1000,
    } = req.body;

    // Validaciones
    if (!users || !Array.isArray(users) || users.length === 0) {
      return res.status(400).json({
        success: false,
        message: "El campo users es requerido y debe ser un array no vacío",
      });
    }

    if (!htmlFilePath) {
      return res.status(400).json({
        success: false,
        message: "El campo htmlFilePath es requerido",
      });
    }

    // Generar ID único para el proceso
    const processId = `${Date.now()}_${Math.random().toString(36).substring(7)}`;

    // Iniciar el proceso en segundo plano
    const processState = await sendBulkEmails({
      users,
      htmlTemplatePath: htmlFilePath,
      subject,
      batchSize,
      batchDelay,
      pauseAfterBatch,
      onProgress: (sent, total) => {
        console.log(`[${processId}] Progreso: ${sent}/${total} emails enviados`);
      },
      onComplete: (results) => {
        console.log(`[${processId}] Proceso completado`);
        const state = activeProcesses.get(processId);
        if (state) {
          state.status = "completed";
          state.completedAt = new Date();
        }
      },
      onError: (error) => {
        console.error(`[${processId}] Error:`, error);
        const state = activeProcesses.get(processId);
        if (state) {
          state.status = "error";
          state.error = error.message;
          state.completedAt = new Date();
        }
      },
    });

    // Guardar referencia al proceso
    activeProcesses.set(processId, {
      ...processState,
      processId,
      subject,
      createdAt: new Date(),
      customUsers: true,
    });

    // Limpiar procesos antiguos
    cleanupOldProcesses();

    // Responder inmediatamente
    res.status(202).json({
      success: true,
      message: "Proceso de envío masivo iniciado en segundo plano",
      processId,
      status: "running",
      totalEmails: processState.totalEmails,
    });
  } catch (error) {
    console.error("Error iniciando envío masivo:", error);
    res.status(500).json({
      success: false,
      message: "Error al iniciar el proceso de envío masivo",
      error: error.message,
    });
  }
};

/**
 * Consulta el estado de un proceso de envío
 * GET /api/bulk-email/status/:processId
 */
export const getProcessStatus = async (req, res) => {
  try {
    const { processId } = req.params;

    const processState = activeProcesses.get(processId);

    if (!processState) {
      return res.status(404).json({
        success: false,
        message: "Proceso no encontrado o ya expiró",
      });
    }

    res.json({
      success: true,
      process: {
        processId: processState.processId,
        status: processState.status,
        totalEmails: processState.totalEmails,
        sentEmails: processState.sentEmails,
        failedEmails: processState.failedEmails,
        progress: processState.totalEmails > 0
          ? Math.round((processState.sentEmails / processState.totalEmails) * 100)
          : 0,
        startTime: processState.startTime,
        endTime: processState.endTime,
        duration: processState.endTime
          ? processState.endTime - processState.startTime
          : Date.now() - processState.startTime,
        error: processState.error,
      },
    });
  } catch (error) {
    console.error("Error consultando estado:", error);
    res.status(500).json({
      success: false,
      message: "Error al consultar el estado del proceso",
      error: error.message,
    });
  }
};

/**
 * Lista todos los procesos activos y recientes
 * GET /api/bulk-email/processes
 */
export const listProcesses = async (req, res) => {
  try {
    const processes = Array.from(activeProcesses.values()).map((process) => ({
      processId: process.processId,
      status: process.status,
      roleName: process.roleName,
      totalEmails: process.totalEmails,
      sentEmails: process.sentEmails,
      failedEmails: process.failedEmails,
      progress: process.totalEmails > 0
        ? Math.round((process.sentEmails / process.totalEmails) * 100)
        : 0,
      startTime: process.startTime,
      endTime: process.endTime,
      createdAt: process.createdAt,
    }));

    res.json({
      success: true,
      total: processes.length,
      processes,
    });
  } catch (error) {
    console.error("Error listando procesos:", error);
    res.status(500).json({
      success: false,
      message: "Error al listar procesos",
      error: error.message,
    });
  }
};

/**
 * Obtiene los resultados detallados de un proceso completado
 * GET /api/bulk-email/results/:processId
 */
export const getProcessResults = async (req, res) => {
  try {
    const { processId } = req.params;

    const processState = activeProcesses.get(processId);

    if (!processState) {
      return res.status(404).json({
        success: false,
        message: "Proceso no encontrado o ya expiró",
      });
    }

    res.json({
      success: true,
      process: {
        processId: processState.processId,
        status: processState.status,
        totalEmails: processState.totalEmails,
        sentEmails: processState.sentEmails,
        failedEmails: processState.failedEmails,
        startTime: processState.startTime,
        endTime: processState.endTime,
        results: processState.results || [],
      },
    });
  } catch (error) {
    console.error("Error obteniendo resultados:", error);
    res.status(500).json({
      success: false,
      message: "Error al obtener los resultados del proceso",
      error: error.message,
    });
  }
};

/**
 * Limpia procesos antiguos (más de 1 hora)
 * @private
 */
function cleanupOldProcesses() {
  const ONE_HOUR = 60 * 60 * 1000;
  const now = Date.now();

  for (const [processId, state] of activeProcesses.entries()) {
    const age = now - state.startTime.getTime();
    if (age > ONE_HOUR) {
      activeProcesses.delete(processId);
      console.log(`Proceso ${processId} eliminado (antigüedad: ${Math.round(age / 60000)} min)`);
    }
  }
}
