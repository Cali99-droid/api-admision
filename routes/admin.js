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
  processExpired
} from "../controllers/AdminController.js";

import {
  validatorCreateUserRole,
  validatorUpdateUserRole,
  validatorDeleteUserRole
} from "../validators/userRole.js";

import { validatorConsult } from "../validators/consult.js";
import { destroy, update } from "../controllers/FamilyController.js";
import { validatorFamily, validatorGetFamily } from "../validators/family.js";
import { ensureAuthenticated } from "../middleware/ensureAuthenticated.js";

const router = express.Router();

// --- RUTAS USUARIOS ---
router.get("/users", ensureAuthenticated(["administrador-adm"]), getAllUsers);
router.post("/user-role", validatorCreateUserRole, createUserRole);
router.put("/user-role/:id", validatorUpdateUserRole, updateUserRole);
router.delete("/user-role/:id", validatorDeleteUserRole, deleteUserRole);

// --- SECRETARIAS Y PSICOLOGOS ---
router.get("/secretary/assignments", ensureAuthenticated(["administrador-adm"]), getSecretaryAssignments);
router.get("/psychology/assignments", getPsychologyAssignments);
router.get("/secretaries", ensureAuthenticated(["administrador-adm"]), getSecretaries);
router.get("/psychologists", ensureAuthenticated(["administrador-adm"]), getPsychologists);

// --- GESTION FAMILIAS ---
router.put("/family/:id", validatorFamily, validatorGetFamily, update);
router.delete("/family/:id", ensureAuthenticated(["administrador-adm"]), validatorGetFamily, destroy);
router.get("/success-families", ensureAuthenticated(["administrador-adm"]), getSuccessFamilies);
router.get("/status-families", ensureAuthenticated(["administrador-adm"]), getStatusFamilyAndChildren);

// --- DASHBOARD Y VACANTES ---
router.get("/statistics/vacant/:level/:grade", getFilterByLevelGrade);
router.get("/statistics/vacant/all", ensureAuthenticated(["administrador-adm"]), getAllVacants);
router.post("/assign/vacant/:idChildren", ensureAuthenticated(["administrador-adm"]), assignVacant);
router.post("/deny/vacant/:idChildren", ensureAuthenticated(["administrador-adm"]), denyVacant);

// --- COMUNICACION CON COLEGIO ---
router.post("/search-new", validatorConsult, getStudentByDocNumber);
router.get("/migrate-col", migrateAptToApp);

// --- PROCESOS ---
router.post("/process-expired", processExpired);

export default router;
