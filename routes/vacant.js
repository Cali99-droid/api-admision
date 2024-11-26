import express from "express";

import { authMiddleware } from "../middleware/session.js";
import {
  get,
  getVacantAvailable,
  store,
  update,
  createVacant,
} from "../controllers/VacantController.js";
import { validatorParamId } from "../validators/family.js";
import {
  validatorVacant,
  validatorCreateVacant,
} from "../validators/vacant.js";

const router = express.Router();

router.post("/:id", validatorParamId, validatorVacant, store);
router.get("/:id", validatorParamId, get);
router.post("/check/available", getVacantAvailable);
/**
 * @openapi
 * /vacant:
 *   post:
 *     tags:
 *       - vacant
 *     summary: Crea un nuevo registro de vacante
 *     description: Este endpoint crea un nuevo registro de vacante con los datos proporcionados.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               campus:
 *                 type: string
 *                 example: "Sede1"
 *               level:
 *                 type: string
 *                 example: "Primaria"
 *               grade:
 *                 type: string
 *                 example: "3er grado"
 *               children_id:
 *                 type: string
 *                 example: "12345"
 *             required:
 *               - campus
 *               - level
 *               - grade
 *               - children_id
 *     responses:
 *       200:
 *         description: Registro creado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Registro creado exitosamente"
 *       400:
 *         description: Error en la solicitud
 */
// router.post("/", validatorCreateVacant, authMiddleware, createVacant);
router.post("/", validatorCreateVacant, createVacant);

/**
 * @openapi
 * /vacant/{id}:
 *   put:
 *     tags:
 *       - vacant
 *     summary: "Actualiza una vacante"
 *     description: "Esta ruta es para actualizar una vacante enviando el id"
 *
 *     security:
 *            - bearerAuth: []
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               year:
 *                 type: string
 *               campus:
 *                 type: number
 *               level:
 *                 type: number
 *               grade:
 *                 type: number
 *
 *     parameters:
 *     - name: id
 *       in: path
 *       description: id de la vacante
 *       required: true
 *     responses:
 *       '200':
 *         description: Respuesta exitosa
 *       '401':
 *         description: Error por validación de datos
 *       '403':
 *         description: No tiene permisos '403'
 */
router.put("/:id", validatorParamId, validatorVacant, update);
export default router;
