import express from "express";

import {
  authMiddleware,
  sessionPsychologyMiddleware,
} from "../middleware/session.js";

import { validatorGetFamily } from "../validators/family.js";
import { validatorMessage } from "../validators/message.js";
import {
  createInterview,
  createReportToChildren,
  getFamilies,
  getFamily,
  miSonsera,
} from "../controllers/PsychologyController.js";
import { upload } from "../utils/handleUpload.js";
import { validatorInterview, validatorReport } from "../validators/children.js";

const router = express.Router();

router.get("/families", sessionPsychologyMiddleware, getFamilies);
router.get(
  "/family/:id",
  validatorGetFamily,
  sessionPsychologyMiddleware,
  getFamily
);
router.post(
  "/interview",
  sessionPsychologyMiddleware,
  upload.fields([{ name: "img1" }, { name: "img2" }]),
  validatorInterview,
  createInterview
);
router.post(
  "/report",
  sessionPsychologyMiddleware,
  upload.fields([{ name: "img1" }, { name: "img2" }]),
  validatorReport,

  createReportToChildren
);

router.post(
  "/gaa",
  authMiddleware,

  miSonsera
);

export default router;
