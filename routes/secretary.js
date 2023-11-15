import express from "express";

import { sessionSecretaryMiddleware } from "../middleware/session.js";
import { getFamilies } from "../controllers/SecretaryController.js";

const router = express.Router();
//secret
router.get("/", sessionSecretaryMiddleware, getFamilies);

export default router;
