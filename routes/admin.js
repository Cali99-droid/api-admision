import express from "express";

import { adminMiddleware, authMiddleware } from "../middleware/session.js";
import {
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
} from "../controllers/AdminController.js";
import { destroy, update } from "../controllers/FamilyController.js";
import { validatorFamily, validatorGetFamily } from "../validators/family.js";

const router = express.Router();

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

/**No usados */
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

export default router;
