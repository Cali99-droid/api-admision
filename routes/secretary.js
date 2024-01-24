import express from "express";

import {
  allMiddleware,
  antecedentMiddleware,
  economicMiddleware,
  sessionSecretaryMiddleware,
} from "../middleware/session.js";
import {
  deleteChildren,
  getAllFamilies,
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
  getBackgroundSummary,
  getSummaryOfApplicantsBySecretary,
  getEconomicEvaluationSummary,
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
  updateEconomic,
} from "../controllers/EconomicController.js";
import {
  createAntecedent,
  getAntecedent,
} from "../controllers/AntecedentController.js";

const router = express.Router();

router.get("/", sessionSecretaryMiddleware, getFamilies);
/**
 * Get all summary-applicants
 * @openapi
 * /secretary/summary-applicants:
 *    get:
 *      tags:
 *        - Secretary
 *      summary: "Listar Resumen de Postulantes por Secretaria"
 *      description: Obtiene todos los Postulantes por Secretaria por la cual requiere mandar token de Secretaria
 *      security:
 *        - bearerAuth: []
 *      responses:
 *        '200':
 *          description: Retorna el resumen de Postulantes por Secretaria".
 *          content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/backgroundSummarySecretary'
 *
 *        '422':
 *          description: Error de validacion.
 */
router.get(
  "/summary-applicants",
  sessionSecretaryMiddleware,
  getSummaryOfApplicantsBySecretary
);
/**
 * Get all background-summary
 * @openapi
 * /secretary/background-summary:
 *    get:
 *      tags:
 *        - Secretary
 *      summary: "Listar Resumen de Evaluacion de Atencedentes"
 *      description: Obtiene todos los Resumenes de Evaluacion de Atencedentes por la cual requiere mandar token de Secretaria
 *      security:
 *        - bearerAuth: []
 *      responses:
 *        '200':
 *          description: Retorna El Resumen de Evaluacion de Atencedentes.
 *          content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/backgroundSummarySecretary'
 *
 *        '422':
 *          description: Error de validacion.
 */
router.get("/background-summary", sessionSecretaryMiddleware, getBackgroundSummary);
/**
 * Get all summary-evaluation
 * @openapi
 * /secretary/economic-summary:
 *    get:
 *      tags:
 *        - Secretary
 *      summary: "Listar Resumen de Evaluacion de Economica "
 *      description: Obtiene el resumen de Evaluacion de Economica por la cual requiere mandar token de Secretaria
 *      security:
 *        - bearerAuth: []
 *      responses:
 *        '200':
 *          description: Retorna el Resumen de Evaluacion de Economica de la secretaria".
 *          content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/backgroundSummarySecretary'
 *
 *        '422':
 *          description: Error de validacion.
 */
router.get(
  "/economic-summary",
  sessionSecretaryMiddleware,
  getEconomicEvaluationSummary
);

/**
 * @openapi
 * /secretary/family/{id}:
 *    get:
 *      tags:
 *        - Secretary
 *      summary: "detalle familia "
 *      description: obtiene el detalle de una familia, las secretarias y los admin tiene permisos de consulta
 *      security:
 *        - bearerAuth: []
 *      parameters:
 *      - name: id
 *        in: path
 *        description: id de la familia
 *        required: true
 *      responses:
 *        '200':
 *          description: Retorna el objecto de la familia incluyendo hijos y conyugue.
 *
 *        '422':
 *          description: Error de validacion.
 */
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
router.put(
  "/economic/:id",
  validatorEconomic,
  sessionSecretaryMiddleware,
  economicMiddleware,
  updateEconomic
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

router.get(
  "/all-families",
  sessionSecretaryMiddleware,
  allMiddleware,
  getAllFamilies
);

export default router;
