import express from "express";
import {
  show,
  showSchoolByDistrict,
  showSchoolByName,
} from "../controllers/SchoolController.js";

const router = express.Router();
router.get("/schools", show);
router.get("/schools/:name", showSchoolByName);
router.get("/ubigean/:ubigean", showSchoolByDistrict);
export default router;
