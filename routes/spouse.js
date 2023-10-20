import express from "express";
import { store, update } from "../controllers/SpouseController.js";
import { authMiddleware } from "../middleware/session.js";
import {
  idValidationRules,
  personValidationRules,
  userValidationRules,
} from "../validators/person.js";
import { upload } from "../utils/handleUpload.js";

const router = express.Router();
/**
 * @openapi
 * definitions:
 *   UserData:
 *     type: object
 *     properties:
 *       email:
 *         type: string
 *       phone:
 *         type: integer
 *   Person:
 *     type: object
 *     properties:
 *       name:
 *         type: string
 *       lastname:
 *         type: string
 *       mLastname:
 *         type: string
 *       type_doc:
 *         type: string
 *       doc_number:
 *         type: integer
 *       profession:
 *         type: string
 *       birthdate:
 *         type: string
 */

/**
 * @openapi
 * /spouse/family/{id}:
 *   post:
 *     tags:
 *       - spouse
 *     summary: "Crear un conyugue"
 *     description: "Esta ruta es para Crear un conyugue en una damilia especifica"
 *
 *     security:
 *            - bearerAuth: []
 *     requestBody:
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               userData[email]:
 *                 type: string
 *               userData[phone]:
 *                 type: integer
 *
 *               person[name]:
 *                 type: string
 *               person[lastname]:
 *                 type: string
 *               person[mLastname]:
 *                 type: string
 *               person[type_doc]:
 *                 type: string
 *               person[doc_number]:
 *                 type: integer
 *               person[profession]:
 *                 type: string
 *               person[birthdate]:
 *                 type: string
 *               person[role]:
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
 *       description: id de la familia a la cual se le asignará el conyugue creado
 *       required: true
 *     responses:
 *       '201':
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
  idValidationRules,
  userValidationRules,
  personValidationRules,
  store
);

/**
 * @openapi
 * /spouse/{id}:
 *   put:
 *     tags:
 *       - spouse
 *     summary: "Actualizar los datos de un conyugue"
 *     description: "Esta ruta es para actualizar los datos de un conyugue en una familia especifica"
 *
 *     security:
 *            - bearerAuth: []
 *     requestBody:
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               userData[email]:
 *                 type: string
 *               userData[phone]:
 *                 type: integer
 *               person[name]:
 *                 type: string
 *               person[lastname]:
 *                 type: string
 *               person[mLastname]:
 *                 type: string
 *               person[type_doc]:
 *                 type: string
 *               person[doc_number]:
 *                 type: integer
 *               person[profession]:
 *                 type: string
 *               person[birthdate]:
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
 *       description: id del conyugue el cual será actualizado
 *       required: true
 *     responses:
 *       '201':
 *         description: Respuesta exitosa
 *         content:
 *           application/json:
 *             schema:

 *                 $ref: '#/components/schemas/spouseUpd'
 *       '401':
 *         description: Error por validación de datos
 *       '403':
 *         description: No tiene permisos '403'
 */

router.put(
  "/:id",

  authMiddleware,
  upload.fields([{ name: "img1" }, { name: "img2" }]),
  idValidationRules,
  userValidationRules,
  personValidationRules,
  update
);

export default router;
