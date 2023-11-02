import express from "express";

import { authMiddleware } from "../middleware/session.js";

import { validatorGetFamily } from "../validators/family.js";

import { get, store } from "../controllers/ValidateController.js";
import { validatorCode } from "../validators/code.js";

const router = express.Router();

router.post("/:code", validatorCode, authMiddleware, store);
router.get("/generate-code/:id", validatorGetFamily, authMiddleware, get);

export default router;
