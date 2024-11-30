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
import { ensureAuthenticated } from "../middleware/ensureAuthenticated.js";

const router = express.Router();

router.get(
  "/antecedent",
  ensureAuthenticated(["administrador-adm"]),
  getSummaryAntecedent
);
router.get(
  "/economic",
  ensureAuthenticated(["administrador-adm"]),
  getSummaryAntecedent
);

export default router;
