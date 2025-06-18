import express from "express";
import {
  show,
  showSchoolByDistrict,
  showSchoolByName,
  getOneSchoolByModularCode,
} from "../controllers/SchoolController.js";

const router = express.Router();
router.get("/schools", show);
router.get("/schools/:name", showSchoolByName);
router.get("/ubigean/:ubigean", showSchoolByDistrict);
router.get("/modular/:modular", getOneSchoolByModularCode);
export default router;
