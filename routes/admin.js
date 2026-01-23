import express from "express";

import {
  assignVacant,
  getAllVacants,
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
  getStudentByDocNumber,
  migrateAptToApp,
  processExpired,
} from "../controllers/AdminController.js";

import {
  validatorCreateUserRole,
  validatorUpdateUserRole,
  validatorDeleteUserRole,
} from "../validators/userRole.js";
import { validatorConsult } from "../validators/consult.js";
import { destroy, update } from "../controllers/FamilyController.js";
import { validatorFamily, validatorGetFamily } from "../validators/family.js";

import { ensureAuthenticated } from "../middleware/ensureAuthenticated.js";

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

router.get("/users", ensureAuthenticated(["administrador-adm"]), getAllUsers);
router.post("/user-role", validatorCreateUserRole, createUserRole);

router.post("/process-expired", processExpired);

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

  validatorUpdateUserRole,
  updateUserRole,
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

  validatorDeleteUserRole,
  deleteUserRole,
);
router.get(
  "/secretary/assignments",
  ensureAuthenticated(["administrador-adm"]),
  getSecretaryAssignments,
);
router.get(
  "/psychology/assignments",

  getPsychologyAssignments,
);
router.get(
  "/secretaries",
  ensureAuthenticated(["administrador-adm"]),
  getSecretaries,
);
router.get(
  "/psychologists",
  ensureAuthenticated(["administrador-adm"]),
  getPsychologists,
);
/**Gestion familias */
router.put("/family/:id", validatorFamily, validatorGetFamily, update);
router.delete(
  "/family/:id",
  ensureAuthenticated(["administrador-adm"]),
  validatorGetFamily,
  destroy,
);

router.get(
  "/success-families",
  ensureAuthenticated(["administrador-adm"]),
  getSuccessFamilies,
);
// router.get("/status-families", ensureAuthenticated(["administrador-adm"]), getStatusFamilies);
/**
 * Get status families and children with pagination
 * @openapi
 * /admin/status-families:
 *    get:
 *      tags:
 *        - Admin
 *      summary: "Obtener estado de familias e hijos"
 *      description: Obtiene el estado de familias e hijos con evaluaciones, paginado
 *      security:
 *        - bearerAuth: []
 *      parameters:
 *        - in: query
 *          name: page
 *          schema:
 *            type: integer
 *            default: 1
 *          description: Número de página (comienza en 1)
 *        - in: query
 *          name: pageSize
 *          schema:
 *            type: integer
 *            default: 20
 *          description: Cantidad de registros por página
 *        - in: query
 *          name: yearId
 *          schema:
 *            type: integer
 *          description: ID del año (opcional, usa el año activo por defecto)
 *      responses:
 *        '200':
 *          description: Retorna la lista de familias con sus estados de evaluación
 *          content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                 pagination:
 *                   type: object
 *                   properties:
 *                     page:
 *                       type: integer
 *                     pageSize:
 *                       type: integer
 *                     total:
 *                       type: integer
 *                     totalPages:
 *                       type: integer
 *        '401':
 *          description: No autenticado
 *        '403':
 *          description: No tiene permisos
 */
router.get(
  "/status-families",
  ensureAuthenticated(["administrador-adm"]),
  getStatusFamilyAndChildren,
);

//dashboard
// router.get("/statistics/", ensureAuthenticated(["administrador-adm"]), getFilterByLevelGrade);
router.get(
  "/statistics/vacant/:level/:grade",

  getFilterByLevelGrade,
);
router.get(
  "/statistics/vacant/all",
  ensureAuthenticated(["administrador-adm"]),
  getAllVacants,
);
// router.get("/status-family", ensureAuthenticated(["administrador-adm"]), getStatusFamilies);
// router.get("/status-families", ensureAuthenticated(["administrador-adm"]), getFamiliesEvaluationStatus);
//

router.post(
  "/assign/vacant/:idChildren",
  ensureAuthenticated(["administrador-adm"]),
  assignVacant,
);
router.post(
  "/deny/vacant/:idChildren",
  ensureAuthenticated(["administrador-adm"]),
  denyVacant,
);

/**comunicacion con colegio */
router.post(
  "/search-new",
  // ensureAuthenticated(["administrador-adm"]),
  validatorConsult,
  getStudentByDocNumber,
);

router.get(
  "/migrate-col",
  // ensureAuthenticated(["administrador-adm"]),
  migrateAptToApp,
);
// router.get("/assign/vacant/:idChildren", assignVacant);
export default router;
