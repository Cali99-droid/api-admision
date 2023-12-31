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

router.get("/users", adminMiddleware,getAllUsers);
router.post("/user-role",validatorCreateUserRole,adminMiddleware , createUserRole);
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
