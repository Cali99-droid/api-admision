import express from "express";

import { adminMiddleware } from "../middleware/session.js";
import {
  getFamiliesEvaluationStatus,
  getPsychologists,
  getPsychologyAssignments,
  getSecretaries,
  getSecretaryAssignments,
  getSuccessFamilies,
  getAllUsers,
  createUserRole,
  updateUserRole,
} from "../controllers/AdminController.js";
import { validatorCreateUserRole,validatorUpdateUserRole } from "../validators/userRole.js";
const router = express.Router();
/**
 * Get all users
 * @openapi
 * /admin/users:
 *    get:
 *      tags:
 *        - Admin
 *      summary: "Listar usuarios"
 *      description: Obtiene todos los usuarios
 *      security:
 *        - bearerAuth: []
 *      responses:
 *        '200':
 *          description: Retorna la listas de los usuarios.
 *          content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/users'
 *
 *        '422':
 *          description: Error de validacion.
 */
router.get("/users",adminMiddleware,getAllUsers);
/**
 *
 * Route create user-role
 * @openapi
 * /admin/user-role:
 *      post:
 *          tags:
 *              - Admin
 *          summary: "Asignar  rol a usuario"
 *          description: "Esta ruta crear rol-user donde token_boss no es obligatorio"
 *          security:
 *            - bearerAuth: []
 *          requestBody:
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: "#/components/schemas/userRole"
 *          responses:
 *                  '201':
 *                      description: User-role se creo de manera correcta
 *                  '401':
 *                      description: Error por validación de datos
 *                  '403':
 *                      description: No tiene permisos '403'
 *
 */
router.post("/user-role",validatorCreateUserRole,adminMiddleware , createUserRole);
/**
 * Route put user-role
 * @openapi
 * /admin/user-role/{id}:
 *      put:
 *          tags:
 *              - Admin
 *          summary: "Actualiza el rol-user"
 *          description: "Esta ruta es para Actualiza datos el rol-user "
 *          security:
 *            - bearerAuth: []
 *          requestBody:
 *            content:
 *              application/json:
 *                schema:
 *                  $ref: "#/components/schemas/userRole"
 *          parameters:
 *          - name: id
 *            in: path
 *            description: id de rol-user a la cual se le actualizará su rol
 *            required: true
 *          responses:
 *                  '201':
 *                      description: los datos user-role fue actualizada correctamente
 *                  '401':
 *                      description: Error por validación de datos
 *                  '403':
 *                      description: No tiene permisos '403'
 *
 */
router.put("/user-role/:id",validatorUpdateUserRole, adminMiddleware, updateUserRole);
router.get("/secretary/assignments", adminMiddleware, getSecretaryAssignments);
router.get(
  "/psychology/assignments",
  adminMiddleware,
  getPsychologyAssignments
);
router.get("/secretaries", adminMiddleware, getSecretaries);
router.get("/psychologists", adminMiddleware, getPsychologists);

router.get("/success-families", adminMiddleware, getSuccessFamilies);
router.get("/status-families", adminMiddleware, getFamiliesEvaluationStatus);

export default router;
