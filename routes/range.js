import express from "express";

import { authMiddleware } from "../middleware/session.js";
import { showRange } from "../controllers/RangeController.js";

const router = express.Router();

/**
 * Get all storages
 * @openapi
 * /range:
 *    get:
 *      tags:
 *        - range
 *      summary: "Listar rangos de ingresos economicos "
 *      description: Obten todos los rangos de ingresos economicos
 *      security:
 *        - bearerAuth: []
 *      responses:
 *        '200':
 *          description: Retorna todos los rangos de ingresos economicos
 *          content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/range'
 *
 *        '422':
 *          description: Error de validacion.
 */
router.get("/", showRange);

export default router;
