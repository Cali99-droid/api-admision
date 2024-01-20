import express from "express";

import { adminMiddleware, authMiddleware } from "../middleware/session.js";
import { 
    getAllRoles, 
    getRoleById,
    createUserRole,
    updateUserRole,
} from "../controllers/RoleController.js";
import {
    validatorCreateRole,
    validatorUpdateRole,
} from "../validators/role.js";
  const router = express.Router();
  /**
 * Get all roles
 * @openapi
 * /role:
 *    get:
 *      tags:
 *        - Role
 *      summary: "Listar roles"
 *      description: Obtiene todos los roles
 *      security:
 *        - bearerAuth: []
 *      responses:
 *        '200':
 *          description: Retorna la listas de los roles.
 *          content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/roles'
 *
 *        '422':
 *          description: Error de validacion.
 */
router.get("/", getAllRoles);
  /**
 * Get one rol
 * @openapi
 * /role/{id}:
 *    get:
 *      tags:
 *        - Role
 *      summary: "Listar roles"
 *      description: Obtiene todos los roles
 *      security:
 *        - bearerAuth: []
 *      parameters:
 *          - name: id
 *            in: path
 *            description: id de role al cual se busca
 *            required: true
 *      responses:
 *        '200':
 *          description: Retorna la listas de los roles.
 *          content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/roles'
 *
 *        '422':
 *          description: Error de validacion.
 */
router.get("/:id", getRoleById);
/**
 *
 * Route create role
 * @openapi
 * /role:
 *      post:
 *          tags:
 *              - Role
 *          summary: "Crear Rol"
 *          description: "Esta ruta crea rol"
 *          security:
 *            - bearerAuth: []
 *          requestBody:
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: "#/components/schemas/role"
 *          responses:
 *                  '201':
 *                      description: Role se creo de manera correcta
 *                  '401':
 *                      description: Error por validación de datos
 *                  '403':
 *                      description: No tiene permisos '403'
 *
 */
router.post("/", adminMiddleware, validatorCreateRole,createUserRole);
/**
 * Route put role
 * @openapi
 * /role/{id}:
 *      put:
 *          tags:
 *              - Role
 *          summary: "Actualiza el role"
 *          description: "Esta ruta es para Actualiza datos el rol "
 *          security:
 *            - bearerAuth: []
 *          requestBody:
 *            content:
 *              application/json:
 *                schema:
 *                  $ref: "#/components/schemas/role"
 *          parameters:
 *          - name: id
 *            in: path
 *            description: id de role a la cual se le actualizará su rol
 *            required: true
 *          responses:
 *                  '201':
 *                      description: los datos role fue actualizada correctamente
 *                  '401':
 *                      description: Error por validación de datos
 *                  '403':
 *                      description: No tiene permisos '403'
 *
 */
router.put("/:id", adminMiddleware, validatorUpdateRole,updateUserRole);

export default router;
