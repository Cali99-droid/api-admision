import express from "express";

import { authMiddleware } from "../middleware/session.js";
import { get, store } from "../controllers/VAcantController.js";
import { validatorGetFamily } from "../validators/family.js";
import { validatorVacant } from "../validators/vacant.js";

const router = express.Router();

router.post("/:id", validatorGetFamily, validatorVacant, authMiddleware, store);
router.get("/:id", validatorGetFamily, authMiddleware, get);

export default router;
