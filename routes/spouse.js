import express from "express";
import { store } from "../controllers/SpouseController.js";
import { authMiddleware } from "../middleware/session.js";
import {
  idValidationRules,
  personValidationRules,
  userValidationRules,
} from "../validators/person.js";

const router = express.Router();

/**
 * http://localhost:3001/api
 *
 * Route register new conyugue
 * Get detail
 * @openapi
 * /spouse/{id}:
 *    post:
 *      tags:
 *        - family
 *      summary: "crear un conyugue"
 *      description: ser crea un conyugue a partir de una familia
 *      security:
 *        - bearerAuth: []
 *      requestBody:
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: "#/components/schemas/spouse"
 *      parameters:
 *      - name: id
 *        in: path
 *        description: id de la familia donde se creará la conyugue
 *        required: true
 *      responses:
 *        '201':
 *          description: El conyugue fue agregado correctamente
 *
 *        '422':
 *          description: Error de validacion.
 */
router.post(
  "/:id",
  authMiddleware,
  idValidationRules,
  userValidationRules,
  personValidationRules,
  store
);

export default router;
