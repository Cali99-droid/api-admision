import express from "express";

import { adminMiddleware, authMiddleware } from "../middleware/session.js";
import {
  get,
  getVacantAvailable,
  store,
  update,
} from "../controllers/VacantController.js";
import { validatorParamId } from "../validators/family.js";
import { validatorVacant } from "../validators/vacant.js";
import { getSummaryAntecedent } from "../controllers/SummaryController.js";

const router = express.Router();


router.get("/antecedent", adminMiddleware, getSummaryAntecedent);
router.get("/economic", adminMiddleware, getSummaryAntecedent);

export default router;
