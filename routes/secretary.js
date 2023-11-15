import express from "express";

import { sessionSecretaryMiddleware } from "../middleware/session.js";
import {
  getFamilies,
  validateHome,
} from "../controllers/SecretaryController.js";

const router = express.Router();

router.get("/", sessionSecretaryMiddleware, getFamilies);
router.post("/validate-home/:id", sessionSecretaryMiddleware, validateHome);

export default router;
