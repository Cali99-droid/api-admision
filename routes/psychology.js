import express from "express";

import {
  authMiddleware,
  sessionPsychologyMiddleware,
} from "../middleware/session.js";

import {
  validateDate,
  validatorGetFamily,
  validatorQuote,
} from "../validators/family.js";
import { validatorMessage } from "../validators/message.js";
import {
  cancelCitation,
  createCitation,
  createInterview,
  createReportToChildren,
  getCitations,
  getCompleted,
  getFamilies,
  getFamily,
  updateCitation,
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
  "/citation",
  sessionPsychologyMiddleware,
  validateDate,
  createCitation
);
router.put(
  "/citation/:id",
  sessionPsychologyMiddleware,
  validateDate,
  updateCitation
);
router.put("/cancel-citation/:id", sessionPsychologyMiddleware, cancelCitation);
router.get("/citation", sessionPsychologyMiddleware, getCitations);
router.get("/completed", sessionPsychologyMiddleware, getCompleted);
// router.post(
//   "/gaa",
//   authMiddleware,

//   miSonsera change
// );

export default router;
