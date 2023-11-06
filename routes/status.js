import express from "express";

import { authMiddleware } from "../middleware/session.js";
import { store } from "../controllers/AgreeController.js";

const router = express.Router();

router.post("/", authMiddleware, store);

export default router;
