import express from "express";

import {
  antecedentMiddleware,
  economicMiddleware,
  sessionSecretaryMiddleware,
} from "../middleware/session.js";
import {
  deleteChildren,
  getFamilies,
  getFamily,
  getMessage,
  getServed,
  sendMessageSecretary,
  setServed,
  validateChildren,
  validateHome,
  validateIncome,
  validateSchool,
  validateSpouse,
} from "../controllers/SecretaryController.js";
import {
  validatorAntecedent,
  validatorEconomic,
  validatorGetFamily,
  validatorIdFamily,
} from "../validators/family.js";
import { validatorMessage } from "../validators/message.js";
import {
  createEconomic,
  getEconomic,
} from "../controllers/EconomicController.js";
import {
  createAntecedent,
  getAntecedent,
} from "../controllers/AntecedentController.js";

const router = express.Router();

router.get("/", sessionSecretaryMiddleware, getFamilies);
router.get(
  "/family/:id",
  validatorGetFamily,
  sessionSecretaryMiddleware,
  getFamily
);
router.post("/validate-home/:id", sessionSecretaryMiddleware, validateHome);
router.post("/validate-income/:id", sessionSecretaryMiddleware, validateIncome);
router.post(
  "/validate-children/:id",
  sessionSecretaryMiddleware,
  validateChildren
);
router.post("/validate-school/:id", sessionSecretaryMiddleware, validateSchool);
router.post("/validate-spouse/:id", sessionSecretaryMiddleware, validateSpouse);
router.post(
  "/send-message/:id",
  sessionSecretaryMiddleware,
  validatorMessage,
  sendMessageSecretary
);

router.get("/get-message/:id", sessionSecretaryMiddleware, getMessage);
// router.get("/get-message/:id", sessionSecretaryMiddleware, getMessage);
router.post("/served/:id", sessionSecretaryMiddleware, setServed);
router.get("/get-served", sessionSecretaryMiddleware, getServed);

//children
router.delete("/children/:id", sessionSecretaryMiddleware, deleteChildren);

//ev economica
router.get(
  "/economic-family/:familyId",
  sessionSecretaryMiddleware,
  validatorIdFamily,
  economicMiddleware,
  getEconomic
);

router.post(
  "/economic",
  validatorEconomic,
  sessionSecretaryMiddleware,
  economicMiddleware,
  createEconomic
);

//ev antecedentes
router.get(
  "/antecedent-family/:familyId",
  sessionSecretaryMiddleware,
  validatorIdFamily,
  antecedentMiddleware,
  getAntecedent
);

router.post(
  "/antecedent",
  validatorAntecedent,
  sessionSecretaryMiddleware,
  antecedentMiddleware,
  createAntecedent
);

export default router;
