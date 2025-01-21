import express from "express";

import { validateDate, validatorGetFamily } from "../validators/family.js";

import {
  cancelCitation,
  createCitation,
  createInterview,
  createReportToChildren,
  getCitations,
  getCompleted,
  getFamilies,
  getFamily,
  updateCitation,
  SummaryPsyEvaluation,
  changeApproed,
} from "../controllers/PsychologyController.js";
import { upload } from "../utils/handleUpload.js";
import { validatorInterview, validatorReport } from "../validators/children.js";
import { ensureAuthenticated } from "../middleware/ensureAuthenticated.js";

const router = express.Router();
/**
 * Get all summary-evaluation
 * @openapi
 * /psychology/summary-evaluation:
 *    get:
 *      tags:
 *        - Pychology
 *      summary: "Listar Resumen de Evaluacion de Pspicologa"
 *      description: Obtiene el resumen de Evaluacion de Pspicologa por la cual requiere token de Psicologa
 *      security:
 *        - bearerAuth: []
 *      responses:
 *        '200':
 *          description: Retorna el Resumen de Evaluacion de Pspicologa".
 *          content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/summaryEvaluation'
 *
 *        '422':
 *          description: Error de validacion.
 */
router.get(
  "/summary-evaluation",
  ensureAuthenticated(["psicologia-adm"]),
  SummaryPsyEvaluation
);

router.get("/families", ensureAuthenticated(["psicologia-adm"]), getFamilies);
router.get(
  "/family/:id",
  validatorGetFamily,
  ensureAuthenticated(["psicologia-adm"]),
  getFamily
);
router.post(
  "/interview",
  ensureAuthenticated(["psicologia-adm"]),
  upload.fields([{ name: "img1" }, { name: "img2" }]),
  validatorInterview,
  createInterview
);
router.post(
  "/report",
  ensureAuthenticated(["psicologia-adm"]),
  upload.fields([{ name: "img1" }, { name: "img2" }]),
  validatorReport,

  createReportToChildren
);

router.post(
  "/citation",
  ensureAuthenticated(["psicologia-adm"]),
  validateDate,
  createCitation
);
router.put(
  "/citation/:id",
  ensureAuthenticated(["psicologia-adm"]),
  validateDate,
  updateCitation
);
router.put(
  "/cancel-citation/:id",
  ensureAuthenticated(["psicologia-adm"]),
  cancelCitation
);
router.get("/citation", ensureAuthenticated(["psicologia-adm"]), getCitations);
router.get("/completed", ensureAuthenticated(["psicologia-adm"]), getCompleted);

router.put(
  "/change-approved/:id",
  ensureAuthenticated(["administrador-adm"]),
  changeApproed
);
// router.post(
//   "/gaa",
//   authMiddleware,

//   miSonsera change
// );

export default router;
