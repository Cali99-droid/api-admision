import express from "express";

import { adminMiddleware, authMiddleware } from "../middleware/session.js";
import { 
    getAllRolesPermissions, 
    getRolesPermissionsById,
    createRolePermissions,
    updateRolePermissions,
} from "../controllers/RolePermissionController.js";
import {
    validatorCreateRolePermissions,
    validatorUpdateRolePermissions,
} from "../validators/rolePermission.js";
  const router = express.Router();
  /**
 * Get all rolePermissions
 * @openapi
 * /rolePermissions:
 *    get:
 *      tags:
 *        - Roles Permissions
 *      summary: "Listar Permisos de Roles"
 *      description: Obtiene todos permisos de los roles
 *      security:
 *        - bearerAuth: []
 *      responses:
 *        '200':
 *          description: Retorna la listas de los permisos de roles
 *          content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/rolePermissions'
 *
 *        '422':
 *          description: Error de validacion.
 */
router.get("/", getAllRolesPermissions);
  /**
 * Get one rol
 * @openapi
 * /rolePermissions/{id}:
 *    get:
 *      tags:
 *        - Roles Permissions
 *      summary: "Listar un Permiso del rol"
 *      description: Obtiene el permiso del rol por el id
 *      security:
 *        - bearerAuth: []
 *      parameters:
 *          - name: id
 *            in: path
 *            description: id de permiso del rol
 *            required: true
 *      responses:
 *        '200':
 *          description: Retorna la listas de los rolePermissions.
 *          content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/rolePermissions'
 *
 *        '422':
 *          description: Error de validacion.
 */
router.get("/:id", getRolesPermissionsById);
/**
 *
 * Route create rolePermission
 * @openapi
 * /rolePermissions:
 *      post:
 *          tags:
 *              - Roles Permissions
 *          summary: "Crear los permisos de los roles"
 *          description: "Esta ruta crea permisos de roles"
 *          security:
 *            - bearerAuth: []
 *          requestBody:
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: "#/components/schemas/rolePermission"
 *          responses:
 *                  '201':
 *                      description: RolePermission se creo de manera correcta
 *                  '401':
 *                      description: Error por validación de datos
 *                  '403':
 *                      description: No tiene permisos '403'
 *
 */
router.post("/", adminMiddleware, validatorCreateRolePermissions, createRolePermissions);
/**
 * Route put rolePermission
 * @openapi
 * /rolePermissions/{id}:
 *      put:
 *          tags:
 *              - Roles Permissions
 *          summary: "Actualiza los permisos de los roles"
 *          description: "Esta ruta actualiza permisos de roles "
 *          security:
 *            - bearerAuth: []
 *          requestBody:
 *            content:
 *              application/json:
 *                schema:
 *                  $ref: "#/components/schemas/rolePermission"
 *          parameters:
 *          - name: id
 *            in: path
 *            description: id de rolePermission a la cual se le actualizará su rol
 *            required: true
 *          responses:
 *                  '201':
 *                      description: los datos rolePermission fue actualizada correctamente
 *                  '401':
 *                      description: Error por validación de datos
 *                  '403':
 *                      description: No tiene permisos '403'
 *
 */
router.put("/:id", adminMiddleware, validatorUpdateRolePermissions, updateRolePermissions);

export default router;