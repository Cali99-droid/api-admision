import express from "express";
import { authMiddleware } from "../middleware/session.js";
import { upload } from "../utils/handleUpload.js";
import { validatorGetFamily } from "../validators/family.js";
import { childValidationRules } from "../validators/person.js";
import { get, store, update } from "../controllers/SchoolController.js";
import { validatorSchool } from "../validators/school.js";

const router = express.Router();

/**
 * @openapi
 * school/children/{id}:
 *   post:
 *     tags:
 *       - school
 *     summary: "Crear un colegio"
 *     description: "Esta ruta es para crear el colegio de un hijo"
 *
 *     security:
 *            - bearerAuth: []
 *     requestBody:
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *
 *               name:
 *                 type: string
 *               grade:
 *                 type: integer
 *               district_id:
 *                 type: integer
 *               img:
 *                 type: string
 *                 format: binary
 *     parameters:
 *     - name: id
 *       in: path
 *       description: id del hijo al cual se le asignará el colegio creado
 *       required: true
 *     responses:
 *       '200':
 *         description: Respuesta exitosa
 *       '401':
 *         description: Error por validación de datos
 *       '403':
 *         description: No tiene permisos '403'
 */
router.post(
  "/children/:id",
  authMiddleware,
  upload.fields([{ name: "img" }]),
  validatorSchool,
  store
);
/**
 * @openapi
 * school/{id}:
 *   put:
 *     tags:
 *       - school
 *     summary: "Actualizar un colegio"
 *     description: "Esta ruta es para actualizar el colegio de un hijo"
 *
 *     security:
 *            - bearerAuth: []
 *     requestBody:
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *
 *               name:
 *                 type: string
 *               grade:
 *                 type: integer
 *               district_id:
 *                 type: integer
 *               img:
 *                 type: string
 *                 format: binary
 *     parameters:
 *     - name: id
 *       in: path
 *       description: id del  colegio a actualizar
 *       required: true
 *     responses:
 *       '200':
 *         description: Respuesta exitosa
 *       '401':
 *         description: Error por validación de datos
 *       '403':
 *         description: No tiene permisos '403'
 */
router.put(
  "/:id",
  authMiddleware,
  upload.fields([{ name: "img" }]),
  validatorSchool,
  update
);
/**
 * @openapi
 * /school/{id}:
 *    get:
 *      tags:
 *        - school
 *      summary: "Detalle colegio"
 *      description: obtiene los datos de un colegio
 *      security:
 *        - bearerAuth: []
 *      parameters:
 *      - name: id
 *        in: path
 *        description: id del colegio a consultar
 *        required: true
 *      responses:
 *        '200':
 *          description: Retorna los datos del colegio.
 *        '422':
 *          description: Error de validacion.
 */
router.get("/:id", authMiddleware, validatorGetFamily, get);

export default router;
