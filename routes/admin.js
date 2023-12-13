import express from "express";

import { adminMiddleware } from "../middleware/session.js";
import {
  getPsychologyAssignments,
  getSecretaries,
  getSecretaryAssignments,
} from "../controllers/AdminController.js";

const router = express.Router();

router.get("/secretary/assignments", adminMiddleware, getSecretaryAssignments);
router.get(
  "/psychology/assignments",
  adminMiddleware,
  getPsychologyAssignments
);
router.get("/secretaries", adminMiddleware, getSecretaries);

export default router;
