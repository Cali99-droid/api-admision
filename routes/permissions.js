import express from "express";
import { getAllPermissions } from "../controllers/PermissionsController.js";
const router = express.Router();
/**
* Get all roles
* @openapi
* /permissions:
*    get:
*      tags:
*        - Permissions
*      summary: "Listar los permisos"
*      description: Obtiene todos los permisos
*      security:
*        - bearerAuth: []
*      responses:
*        '200':
*          description: Retorna la listas de permisos.
*          content:
*           application/json:
*             schema:
*               type: array
*               items:
*                 $ref: '#/components/schemas/permissions'
*
*        '422':
*          description: Error de validacion.
*/
router.get("/", getAllPermissions);
export default router;