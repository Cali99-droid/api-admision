import express from "express";

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
  updateAntecedent,
} from "../controllers/AntecedentController.js";
import { ensureAuthenticated } from "../middleware/ensureAuthenticated.js";

const router = express.Router();

router.get("/", ensureAuthenticated(["secretaria-adm"]), getFamilies);
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
  ensureAuthenticated(["secretaria-adm"]),
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
router.get(
  "/background-summary",
  ensureAuthenticated(["secretaria-adm"]),
  getBackgroundSummary
);
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
  ensureAuthenticated(["secretaria-adm"]),
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
  ensureAuthenticated(["secretaria-adm"]),
  getFamily
);
router.post(
  "/validate-home/:id",
  ensureAuthenticated(["secretaria-adm"]),
  validateHome
);
router.post(
  "/validate-income/:id",
  ensureAuthenticated(["secretaria-adm"]),
  validateIncome
);
router.post(
  "/validate-children/:id",
  ensureAuthenticated(["secretaria-adm"]),
  validateChildren
);
router.post(
  "/validate-school/:id",
  ensureAuthenticated(["secretaria-adm"]),
  validateSchool
);
router.post(
  "/validate-spouse/:id",
  ensureAuthenticated(["secretaria-adm"]),
  validateSpouse
);
router.post(
  "/send-message/:id",
  ensureAuthenticated(["secretaria-adm"]),
  validatorMessage,
  sendMessageSecretary
);

router.get(
  "/get-message/:id",
  ensureAuthenticated(["secretaria-adm"]),
  getMessage
);
// router.get("/get-message/:id",  ensureAuthenticated(["secretaria-adm"]), getMessage);
router.post("/served/:id", ensureAuthenticated(["secretaria-adm"]), setServed);
router.get("/get-served", ensureAuthenticated(["secretaria-adm"]), getServed);

//children
router.delete(
  "/children/:id",
  ensureAuthenticated(["secretaria-adm"]),
  deleteChildren
);

//ev economica
router.get(
  "/economic-family/:familyId",
  ensureAuthenticated(["secretaria-adm", "ev-economic-adm"]),
  validatorIdFamily,

  getEconomic
);

router.post(
  "/economic",
  validatorEconomic,
  ensureAuthenticated(["secretaria-adm", "ev-economic-adm"]),

  createEconomic
);
router.put(
  "/economic/:id",
  validatorEconomic,
  ensureAuthenticated(["secretaria-adm", "ev-economic-adm"]),

  updateEconomic
);

//ev antecedentes
router.get(
  "/antecedent-family/:familyId",
  ensureAuthenticated(["secretaria-adm", "ev-antecedent-adm"]),
  validatorIdFamily,

  getAntecedent
);
/**c */
router.post(
  "/antecedent",
  validatorAntecedent,
  ensureAuthenticated(["secretaria-adm", "ev-antecedent-adm"]),
  createAntecedent
);

router.put(
  "/antecedent/:id",
  validatorAntecedent,
  ensureAuthenticated(["secretaria-adm", "ev-antecedent-adm"]),
  validatorIdFamily,
  updateAntecedent
);

router.get(
  "/all-families",
  ensureAuthenticated(["secretaria-adm"]),

  getAllFamilies
);

export default router;
