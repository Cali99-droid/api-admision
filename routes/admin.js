import express from "express";

import { adminMiddleware } from "../middleware/session.js";
import {
  getAllVacants,
  getFamiliesEvaluationStatus,
  getFilterByLevelGrade,
  getPsychologists,
  getPsychologyAssignments,
  getSecretaries,
  getSecretaryAssignments,
  getStatusFamilies,
  getSuccessFamilies,
} from "../controllers/AdminController.js";

const router = express.Router();

router.get("/secretary/assignments", adminMiddleware, getSecretaryAssignments);
router.get(
  "/psychology/assignments",
  adminMiddleware,
  getPsychologyAssignments
);
router.get("/secretaries", adminMiddleware, getSecretaries);
router.get("/psychologists", adminMiddleware, getPsychologists);

/**No usados */
router.get("/success-families", adminMiddleware, getSuccessFamilies);
router.get("/status-families", adminMiddleware, getStatusFamilies);

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

export default router;
