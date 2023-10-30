import express from "express";
import { authMiddleware } from "../middleware/session.js";
import {
  show,
  showSchoolByDistrict,
  showSchoolByName,
} from "../controllers/SchoolController.js";

const router = express.Router();
router.get("/schools", authMiddleware, show);
router.get("/schools/:name", authMiddleware, showSchoolByName);
router.get("/ubigean/:ubigean", authMiddleware, showSchoolByDistrict);
export default router;
