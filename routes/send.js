import express from "express";

import { authMiddleware } from "../middleware/session.js";

import { validatorGetFamily } from "../validators/family.js";

import { send, store } from "../controllers/ValidateController.js";
import { validatorCode } from "../validators/code.js";

const router = express.Router();

router.post("/verify/:code", validatorCode, authMiddleware, store);
router.post("/message/:id", validatorGetFamily, authMiddleware, send);

export default router;
