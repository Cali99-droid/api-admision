import express from "express";

import { adminMiddleware } from "../middleware/session.js";
import {
  getPsychologyAssignments,
  getSecretaryAssignments,
} from "../controllers/AdminController.js";

const router = express.Router();

router.get("/secretary/assignments", adminMiddleware, getSecretaryAssignments);
router.get(
  "/psychology/assignments",
  adminMiddleware,
  getPsychologyAssignments
);

export default router;
