import express from "express";

import { adminMiddleware, authMiddleware } from "../middleware/session.js";
import {
  get,
  getVacantAvailable,
  store,
  update,
} from "../controllers/VacantController.js";
import { validatorParamId } from "../validators/family.js";
import { validatorVacant } from "../validators/vacant.js";
import { getSummaryAntecedent } from "../controllers/SummaryController.js";

const router = express.Router();

router.get("/antecedent", adminMiddleware, getSummaryAntecedent);
router.post("/check/available", getVacantAvailable);
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
router.put("/:id", validatorParamId, validatorVacant, authMiddleware, update);
export default router;
