import express from "express";

import { adminMiddleware, authMiddleware } from "../middleware/session.js";
import {
  assignVacant,
  getAllVacants,
  getFamiliesEvaluationStatus,
  getFilterByLevelGrade,
  getPsychologists,
  getPsychologyAssignments,
  getSecretaries,
  getSecretaryAssignments,
  getStatusFamilies,
  getStatusFamilyAndChildren,
  getSuccessFamilies,
  getAllUsers,
  createUserRole,
  updateUserRole,
  deleteUserRole,
  denyVacant,
} from "../controllers/AdminController.js";

import {
  validatorCreateUserRole,
  validatorUpdateUserRole,
  validatorDeleteUserRole,
} from "../validators/userRole.js";

import { destroy, update } from "../controllers/FamilyController.js";
import { validatorFamily, validatorGetFamily } from "../validators/family.js";

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
router.get("/users", getAllUsers);
router.post(
  "/user-role",
  adminMiddleware,
  validatorCreateUserRole,
  createUserRole
);
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
router.put(
  "/user-role/:id",
  adminMiddleware,
  validatorUpdateUserRole,
  updateUserRole
);
/**
 * Route delete user-role
 * @openapi
 * /admin/user-role/{id}:
 *      delete:
 *          tags:
 *              - Admin
 *          summary: "Eliminar el rol-user"
 *          description: "Esta ruta es para Eliminar datos el rol-user "
 *          security:
 *            - bearerAuth: []
 *          parameters:
 *          - name: id
 *            in: path
 *            description: id de rol-user a la cual se eliminara su rol
 *            required: true
 *          responses:
 *                  '201':
 *                      description: los datos user-role fue eliminada correctamente
 *                  '401':
 *                      description: Error por validación de datos
 *                  '403':
 *                      description: No tiene permisos '403'
 *
 */
router.delete(
  "/user-role/:id",
  adminMiddleware,
  validatorDeleteUserRole,
  deleteUserRole
);
router.get("/secretary/assignments", adminMiddleware, getSecretaryAssignments);
router.get(
  "/psychology/assignments",
  adminMiddleware,
  getPsychologyAssignments
);
router.get("/secretaries", adminMiddleware, getSecretaries);
router.get("/psychologists", adminMiddleware, getPsychologists);
/**Gestion familias */
router.put(
  "/family/:id",
  authMiddleware,
  validatorFamily,
  validatorGetFamily,
  update
);
router.delete("/family/:id", adminMiddleware, validatorGetFamily, destroy);

router.get("/success-families", adminMiddleware, getSuccessFamilies);
// router.get("/status-families", adminMiddleware, getStatusFamilies);
router.get("/status-families", adminMiddleware, getStatusFamilyAndChildren);

//dashboard
// router.get("/statistics/", adminMiddleware, getFilterByLevelGrade);
router.get(
  "/statistics/vacant/:level/:grade",
  adminMiddleware,
  getFilterByLevelGrade
);
router.get("/statistics/vacant/all", adminMiddleware, getAllVacants);
// router.get("/status-family", adminMiddleware, getStatusFamilies);
// router.get("/status-families", adminMiddleware, getFamiliesEvaluationStatus);
//

router.post("/assign/vacant/:idChildren", adminMiddleware, assignVacant);
router.post("/deny/vacant/:idChildren", adminMiddleware, denyVacant);
// router.get("/assign/vacant/:idChildren", assignVacant);
export default router;
