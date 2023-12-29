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
import { validatorUserRole } from "../validators/userRole.js";

const router = express.Router();

router.get("/users", getAllUsers);
/**
 * http://localhost:3001/api
 *
 * Route register new user
 * @openapi
 * /auth/register:
 *      post: 
 *          tags:
 *              - auth
 *          summary: "Asignar User-Role"
 *          description: "Esta ruta es para asignar un rol al usuario"
 *          requestBody:
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: "#/components/schemas/createUserRole"
 *          responses:
 *                  '201':
 *                      description: El userRole se registró de manera correcta
 *                  '403':
 *                      description: Error por validación de datos
 */
router.post("/user-role",validatorUserRole,adminMiddleware , createUserRole);
router.put("/user-role/:id",validatorUserRole, adminMiddleware, updateUserRole);
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
