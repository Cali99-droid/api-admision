import express from "express";
import { authMiddleware } from "../middleware/session.js";
import { show } from "../controllers/SchoolController.js";

const router = express.Router();
router.get("/schools", authMiddleware, show);
export default router;
