import express from "express";

import { adminMiddleware } from "../middleware/session.js";
import {
  getFamiliesEvaluationStatus,
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

router.get("/success-families", adminMiddleware, getSuccessFamilies);
router.get("/status-families", adminMiddleware, getFamiliesEvaluationStatus);

//dashboard

router.get("/status-family", adminMiddleware, getStatusFamilies);
router.get("/status-families", adminMiddleware, getFamiliesEvaluationStatus);

export default router;
