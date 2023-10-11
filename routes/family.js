import express from "express";
import { show, store } from "../controllers/FamilyController.js";
import { authMiddleware } from "../middleware/session.js";
import { validatorFamily } from "../validators/family.js";

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
router.post("/", authMiddleware, validatorFamily, store);
/**
 * @openapi
 * /family:
 *    get:
 *      tags:
 *        - family
 *      summary: "Todas las familias de un usuario"
 *      description: obtiene la lista de familias de un usuario
 *      security:
 *        - bearerAuth: []
 *
 *      responses:
 *        '200':
 *          description: Retorna el objecto de la family.
 *          content:
 *             application/json:
 *               schema:
 *                   $ref: '#/components/schemas/family'
 *        '422':
 *          description: Error de validacion.
 */
router.get("/", authMiddleware, show);

export default router;
