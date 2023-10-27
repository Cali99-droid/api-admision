import express from "express";
import { authMiddleware } from "../middleware/session.js";
import { upload } from "../utils/handleUpload.js";
import { validatorGetFamily } from "../validators/family.js";
import { childValidationRules } from "../validators/person.js";

import { get, show, store, update } from "../controllers/ChildrenController.js";

const router = express.Router();

/**
 * @openapi
 * /children/family/{id}:
 *   post:
 *     tags:
 *       - children
 *     summary: "Crear un hijo"
 *     description: "Esta ruta es para Crear un hijo en una damilia especifica"
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
 *               lastname:
 *                 type: string
 *               mLastname:
 *                 type: string
 *               type_doc:
 *                 type: string
 *               doc_number:
 *                 type: integer
 *               gender:
 *                 type: string
 *               birthdate:
 *                 type: string
 *               img1:
 *                 type: string
 *                 format: binary
 *               img2:
 *                 type: string
 *                 format: binary
 *     parameters:
 *     - name: id
 *       in: path
 *       description: id de la familia a la cual se le asignará el hijo creado
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
  "/family/:id",
  authMiddleware,
  upload.fields([{ name: "img1" }, { name: "img2" }]),
  validatorGetFamily,
  childValidationRules,
  store
);

/**
 * @openapi
 * /children/{id}:
 *   put:
 *     tags:
 *       - children
 *     summary: "Actualiza un hijo"
 *     description: "Esta ruta es para actualizar un hijo en una damilia especifica"
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
 *               lastname:
 *                 type: string
 *               mLastname:
 *                 type: string
 *               type_doc:
 *                 type: string
 *               doc_number:
 *                 type: integer
 *               gender:
 *                 type: string
 *               birthdate:
 *                 type: string
 *               img1:
 *                 type: string
 *                 format: binary
 *               img2:
 *                 type: string
 *                 format: binary
 *     parameters:
 *     - name: id
 *       in: path
 *       description: id del  hijo a actualizar(este id debe ser el person_id - tabla persona)
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
  upload.fields([{ name: "img1" }, { name: "img2" }]),
  validatorGetFamily,
  childValidationRules,
  update
);
/**
 * @openapi
 * /children/{id}:
 *    get:
 *      tags:
 *        - children
 *      summary: "Detalle hijo"
 *      description: obtiene los datos de un hijo
 *      security:
 *        - bearerAuth: []
 *      parameters:
 *      - name: id
 *        in: path
 *        description: id del  hijo a consultar
 *        required: true
 *      responses:
 *        '200':
 *          description: Retorna los datos del hijo.

 *                   
 *        '422':
 *          description: Error de validacion.
 */
router.get("/:id", authMiddleware, validatorGetFamily, get);

/**Trae todos los hijos de una familia */
router.get("/family/:id", authMiddleware, validatorGetFamily, show);

export default router;
