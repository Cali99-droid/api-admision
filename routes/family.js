import express from "express";
import {
  createHome,
  get,
  show,
  store,
  updateHome,
} from "../controllers/FamilyController.js";
import { authMiddleware } from "../middleware/session.js";
import {
  validatorFamily,
  validatorGetFamily,
  validatorHome,
} from "../validators/family.js";
import { upload } from "../utils/handleUpload.js";

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
/**
 * @openapi
 * /family/{id}:
 *    get:
 *      tags:
 *        - family
 *      summary: "detalle familia "
 *      description: obtiene el detalle de una familia
 *      security:
 *        - bearerAuth: []
 *      parameters:
 *      - name: id
 *        in: path
 *        description: id de la familia
 *        required: true
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
router.get("/:id", authMiddleware, validatorGetFamily, get);

/**
 * http://localhost:3001/api
 *
 * Route domicilio family
 * @openapi
 * /family/home/{id}:
 *      post:
 *          tags:
 *              - family
 *          summary: "Crear datos de domicilio de una familia"
 *          description: "Esta ruta es para Crear datos de domicilio de una familia"
 *          security:
 *            - bearerAuth: []
 *          requestBody:
 *            content:
 *              multipart/form-data:
 *                schema:
 *                  type: object
 *                  required: address, district_id
 *                  properties:
 *                    address:
 *                      type: string
 *                    reference:
 *                      type: string
 *                    district_id:
 *                      type: integer
 *
 *                    img:
 *                      type: string
 *                      format: binary
 *          parameters:
 *          - name: id
 *            in: path
 *            description: id de la familia a la cual se le asignará el domicilio creado
 *            required: true
 *          responses:
 *                  '201':
 *                      description: los datos de domicilio se creo de manera correcta
 *                  '401':
 *                      description: Error por validación de datos
 *                  '403':
 *                      description: No tiene permisos '403'
 *
 */
router.post(
  "/home/:id",
  validatorGetFamily,
  upload.fields([{ name: "img" }]),
  authMiddleware,
  validatorHome,
  createHome
);

/**
 * http://localhost:3001/api
 *
 * Route domicilio family
 * @openapi
 * /family/home/{id}:
 *      put:
 *          tags:
 *              - family
 *          summary: "Actualizar datos de domicilio de una familia"
 *          description: "Esta ruta es para Actualizar datos de domicilio de una familia"
 *          security:
 *            - bearerAuth: []
 *          requestBody:
 *            content:
 *              multipart/form-data:
 *                schema:
 *                  type: object
 *                  required: address, district_id
 *                  properties:
 *                    address:
 *                      type: string
 *                    reference:
 *                      type: string
 *                    district_id:
 *                      type: integer
 *                    img:
 *                      type: string
 *                      format: binary
 *          parameters:
 *          - name: id
 *            in: path
 *            description: id de la familia a la cual se le actualizará el domicilio
 *            required: true
 *          responses:
 *                  '201':
 *                      description: los datos de domicilio se creo de manera correcta
 *                  '401':
 *                      description: Error por validación de datos
 *                  '403':
 *                      description: No tiene permisos '403'
 *
 */
router.put(
  "/home/:id",
  validatorGetFamily,
  upload.fields([{ name: "img" }]),
  authMiddleware,
  validatorHome,
  updateHome
);

export default router;
