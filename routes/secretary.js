import express from "express";

import { sessionSecretaryMiddleware } from "../middleware/session.js";
import {
  getFamilies,
  getFamily,
  validateHome,
  validateIncome,
} from "../controllers/SecretaryController.js";
import { validatorGetFamily } from "../validators/family.js";

const router = express.Router();

router.get("/", sessionSecretaryMiddleware, getFamilies);
router.get(
  "/family/:id",
  validatorGetFamily,
  sessionSecretaryMiddleware,
  getFamily
);
router.post("/validate-home/:id", sessionSecretaryMiddleware, validateHome);
router.post("/validate-income/:id", sessionSecretaryMiddleware, validateIncome);

export default router;
