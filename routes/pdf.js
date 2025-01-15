import express from "express";

import { adminMiddleware, authMiddleware } from "../middleware/session.js";
import {
  downloadVacancyCertificate,
} from "../controllers/PdfController.js";
import {
  validatorCreateRole,
  validatorUpdateRole,
} from "../validators/role.js";
import { ensureAuthenticated } from "../middleware/ensureAuthenticated.js";
const router = express.Router();
/**
 * Descargar constancia de vacante
 * @openapi
 * /pdf/{id}:
 *    get:
 *      tags:
 *        - Constancia
 *      summary: "Descargar constancia de vacante"
 *      description: Genera y descarga un archivo PDF de la constancia de vacante
 *      responses:
 *        '200':
 *          description: Retorna el archivo PDF de la constancia de vacante.
 *          content:
 *           application/pdf:
 *             schema:
 *               type: string
 *               format: binary
 *        '500':
 *          description: Error al generar el PDF.
 */
router.get("/:id", downloadVacancyCertificate);
/**
 * Get one rol
 * @openapi
 * /role/{id}:
 *    get:
 *      tags:
 *        - Role
 *      summary: "Listar roles"
 *      description: Obtiene todos los roles
 *      security:
 *        - bearerAuth: []
 *      parameters:
 *          - name: id
 *            in: path
 *            description: id de role al cual se busca
 *            required: true
 *      responses:
 *        '200':
 *          description: Retorna la listas de los roles.
 *          content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/roles'
 *
 *        '422':
 *          description: Error de validacion.
 */
// router.get("/:id", getRoleById);

export default router;
