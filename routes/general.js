import express from "express";
import {
  show,
  showSchoolByDistrict,
  showSchoolByName,
  getOneSchoolByModularCode,
} from "../controllers/SchoolController.js";
import { getStatusFamilyByUser } from "../controllers/AdminController.js";

const router = express.Router();
router.get("/schools", show);
router.get("/schools/:name", showSchoolByName);
router.get("/ubigean/:ubigean", showSchoolByDistrict);
router.get("/modular/:modular", getOneSchoolByModularCode);
router.get("/user/:email", getStatusFamilyByUser);
export default router;
