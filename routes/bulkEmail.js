import { Router } from "express";
import {
  sendEmailsByRole,
  sendEmailsCustom,
  sendEmailsFromDatabase,
  getProcessStatus,
  listProcesses,
  getProcessResults,
} from "../controllers/BulkEmailController.js";

const router = Router();

/**
 * @swagger
 * tags:
 *   name: BulkEmail
 *   description: Endpoints para envío masivo de emails
 */

/**
 * @swagger
 * /api/bulk-email/send-by-role:
 *   post:
 *     summary: Envía emails masivos a usuarios de un rol de Keycloak
 *     tags: [BulkEmail]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - roleName
 *               - htmlFilePath
 *             properties:
 *               roleName:
 *                 type: string
 *                 description: Nombre del rol de Keycloak
 *                 example: "student"
 *               subject:
 *                 type: string
 *                 description: Asunto del email
 *                 example: "Políticas de admisión 2026"
 *               htmlFilePath:
 *                 type: string
 *                 description: Ruta al archivo HTML del template
 *                 example: "C:/Users/Sistemas/Downloads/mail.html"
 *               isClientRole:
 *                 type: boolean
 *                 description: Si el rol es de tipo cliente
 *                 example: false
 *               batchSize:
 *                 type: number
 *                 description: Cantidad de emails por lote
 *                 example: 5
 *               batchDelay:
 *                 type: number
 *                 description: Delay entre lotes en milisegundos
 *                 example: 2000
 *               pauseAfterBatch:
 *                 type: number
 *                 description: Pausa después de cada lote en milisegundos
 *                 example: 1000
 *     responses:
 *       202:
 *         description: Proceso iniciado exitosamente
 *       400:
 *         description: Parámetros inválidos
 *       500:
 *         description: Error del servidor
 */
router.post("/send-by-role", sendEmailsByRole);

/**
 * @swagger
 * /api/bulk-email/send-custom:
 *   post:
 *     summary: Envía emails masivos a una lista personalizada de usuarios
 *     tags: [BulkEmail]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - users
 *               - htmlFilePath
 *             properties:
 *               users:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     email:
 *                       type: string
 *                     firstName:
 *                       type: string
 *                     lastName:
 *                       type: string
 *               subject:
 *                 type: string
 *               htmlFilePath:
 *                 type: string
 *               batchSize:
 *                 type: number
 *               batchDelay:
 *                 type: number
 *               pauseAfterBatch:
 *                 type: number
 *     responses:
 *       202:
 *         description: Proceso iniciado exitosamente
 *       400:
 *         description: Parámetros inválidos
 *       500:
 *         description: Error del servidor
 */
router.post("/send-custom", sendEmailsCustom);

/**
 * @swagger
 * /api/bulk-email/send-from-database:
 *   post:
 *     summary: Envía emails masivos a usuarios filtrados desde la base de datos
 *     tags: [BulkEmail]
 *     description: Obtiene los 'sub' de la tabla user y envía emails a esos usuarios de Keycloak
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - htmlFilePath
 *             properties:
 *               subject:
 *                 type: string
 *                 description: Asunto del email
 *                 example: "Políticas de admisión 2026"
 *               htmlFilePath:
 *                 type: string
 *                 description: Ruta al archivo HTML del template
 *                 example: "C:/Users/Sistemas/Desktop/api_admision/templates/emails/politicas-admision-2026.html"
 *               batchSize:
 *                 type: number
 *                 description: Cantidad de emails por lote
 *                 example: 5
 *               batchDelay:
 *                 type: number
 *                 description: Delay entre lotes en milisegundos
 *                 example: 2000
 *               pauseAfterBatch:
 *                 type: number
 *                 description: Pausa después de cada lote en milisegundos
 *                 example: 1000
 *     responses:
 *       202:
 *         description: Proceso iniciado exitosamente
 *       400:
 *         description: Parámetros inválidos
 *       500:
 *         description: Error del servidor
 */
router.post("/send-from-database", sendEmailsFromDatabase);

/**
 * @swagger
 * /api/bulk-email/status/{processId}:
 *   get:
 *     summary: Consulta el estado de un proceso de envío
 *     tags: [BulkEmail]
 *     parameters:
 *       - in: path
 *         name: processId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del proceso
 *     responses:
 *       200:
 *         description: Estado del proceso
 *       404:
 *         description: Proceso no encontrado
 *       500:
 *         description: Error del servidor
 */
router.get("/status/:processId", getProcessStatus);

/**
 * @swagger
 * /api/bulk-email/processes:
 *   get:
 *     summary: Lista todos los procesos activos y recientes
 *     tags: [BulkEmail]
 *     responses:
 *       200:
 *         description: Lista de procesos
 *       500:
 *         description: Error del servidor
 */
router.get("/processes", listProcesses);

/**
 * @swagger
 * /api/bulk-email/results/{processId}:
 *   get:
 *     summary: Obtiene los resultados detallados de un proceso
 *     tags: [BulkEmail]
 *     parameters:
 *       - in: path
 *         name: processId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del proceso
 *     responses:
 *       200:
 *         description: Resultados del proceso
 *       404:
 *         description: Proceso no encontrado
 *       500:
 *         description: Error del servidor
 */
router.get("/results/:processId", getProcessResults);

export default router;
