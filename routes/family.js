import express from "express";
import {
  assignamentPsichology,
  assignamentSecretary,
  createIncome,
  get,
  getHome,
  getIncome,
  getSpouse,
  getStatus,
  saveHome,
  show,
  store,
  updateHome,
  updateIncome,
} from "../controllers/FamilyController.js";

import {
  validatorAssignament,
  validatorFamily,
  validatorGetFamily,
  validatorHome,
  validatorIncome,
} from "../validators/family.js";
import { upload } from "../utils/handleUpload.js";
import { ensureAuthenticated } from "../middleware/ensureAuthenticated.js";

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
router.post("/", validatorFamily, store);
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
router.get("/", ensureAuthenticated(["secretaria-adm", "padre-adm"]), show);
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
 *          description: Retorna el objecto de la familia incluyendo hijos y conyugue.
 *
 *        '422':
 *          description: Error de validacion.
 */
router.get("/:id", validatorGetFamily, get);

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
  validatorHome,
  saveHome
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
  validatorHome,
  updateHome
);

/**
 * @openapi
 * /family/home/{id}:
 *    get:
 *      tags:
 *        - family
 *      summary: "Obtener datos de domicilio de familia "
 *      description: obtiene los datos de domicilio de de una familia
 *      security:
 *        - bearerAuth: []
 *      parameters:
 *      - name: id
 *        in: path
 *        description: id de la familia
 *        required: true
 *      responses:
 *        '200':
 *          description: Retorna el objecto de  los datos de domicilio de de una familia.
 *          content:
 *             application/json:
 *               schema:
 *                   $ref: '#/components/schemas/home'
 *        '422':
 *          description: Error de validacion.
 *        '404':
 *          descripction: no existen los datos

 */
router.get("/home/:id", validatorGetFamily, getHome);
/**
 * http://localhost:3001/api
 *
 * Route domicilio family
 * @openapi
 * /family/income/{id}:
 *      post:
 *          tags:
 *              - family
 *          summary: " Crear datos de ingresos de una familia"
 *          description: "Esta ruta es para Creardatos de ingresos de una familia"
 *          security:
 *            - bearerAuth: []
 *          requestBody:
 *            content:
 *              multipart/form-data:
 *                schema:
 *                  type: object
 *                  required: range_id
 *                  properties:
 *                    range_id:
 *                      type: integer
 *                    images:
 *                      type: array
 *                      items:
 *                        type: string
 *                        format: binary
 *          parameters:
 *          - name: id
 *            in: path
 *            description: id de la familia a la cual se le asignará el ingreso creado
 *            required: true
 *          responses:
 *                  '201':
 *                      description: los datos de ingresos se creo de manera correcta
 *                  '401':
 *                      description: Error por validación de datos
 *                  '403':
 *                      description: No tiene permisos '403'
 *
 */
router.post(
  "/income/:id",
  validatorGetFamily,
  upload.array("images", 5),
  validatorIncome,
  createIncome
);

/**
 * http://localhost:3001/api
 *
 * Route ingresos family
 * @openapi
 * /family/income/{id}:
 *      put:
 *          tags:
 *              - family
 *          summary: "Actualizar datos de ingresos de una familia"
 *          description: "Esta ruta es para Actualizar datos de ingresos de una familia"
 *          security:
 *            - bearerAuth: []
 *          requestBody:
 *            content:
 *              multipart/form-data:
 *                schema:
 *                  type: object
 *                  required: range_id
 *                  properties:
 *                    range_id:
 *                      type: integer
 *                                       
 *                    images:
 *                      type: array
 *                      items:
 *                        type: string
 *                        format: binary
 *          parameters:
 *          - name: id
 *            in: path
 *            description: id de la familia a la cual se le actualizará los ingresos
 *            required: true
 *          responses:
 *                  '201':
 *                      description: los datos de ingresos se creo de manera correcta
 *                      content:
 *                        application/json:
 *                          schema:

 *                               $ref: '#/components/schemas/incomeUpd'
 *                  '401':
 *                      description: Error por validación de datos
 *                  '403':
 *                      description: No tiene permisos '403'
 *
 */
router.put(
  "/income/:id",
  validatorGetFamily,
  upload.array("images", 5),
  validatorIncome,
  updateIncome
);

/**
 * @openapi
 * /family/income/{id}:
 *    get:
 *      tags:
 *        - family
 *      summary: "Obtener datos de ingresos de familia "
 *      description: obtiene los datos de ingresos de de una familia
 *      security:
 *        - bearerAuth: []
 *      parameters:
 *      - name: id
 *        in: path
 *        description: id de la familia
 *        required: true
 *      responses:
 *        '200':
 *          description: Retorna el objecto de  los datos de ingresos de de una familia.
 *          content:
 *             application/json:
 *               schema:
 *                   $ref: '#/components/schemas/incomeUpd'
 *        '422':
 *          description: Error de validacion.
 
 */
router.get("/income/:id", validatorGetFamily, getIncome);

router.get("/spouse/:id", validatorGetFamily, getSpouse);

router.get("/status/:id", validatorGetFamily, getStatus);
router.put(
  "/:idFamily/secretary/:idSecretary",
  validatorAssignament,
  ensureAuthenticated(["secretaria-adm"]),
  assignamentSecretary
);
/**actualizar assignacion */
router.put(
  "/:idFamily/psychology/:idPsychology",
  validatorAssignament,
  ensureAuthenticated(["secretaria-adm"]),
  assignamentPsichology
);
export default router;
