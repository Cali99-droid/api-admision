import express from "express";
import { store } from "../controllers/FamilyController.js";
import { authMiddleware } from "../middleware/session.js";

const router = express.Router();

/**
 * http://localhost:3001/api
 *
 * Route create family
 * @openapi
 * /family:
 *      post:
 *          tags:
 *              - family
 *          summary: "Crear una familia"
 *          description: "Esta ruta es para crear una familia"
 *          security:
 *            - bearerAuth: []
 *          requestBody:
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: "#/components/schemas/family"
 *          responses:
 *                  '201':
 *                      description: la Familia se creo de manera correcta
 *                  '401':
 *                      description: Error por validación de datos
 *                  '403':
 *                      description: No tiene permisos '403'
 *
 */
router.post("/", authMiddleware, store);

export default router;
