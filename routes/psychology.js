import express from "express";

import {
  authMiddleware,
  sessionPsychologyMiddleware,
} from "../middleware/session.js";

import {
  validateDate,
  validatorGetFamily,
  validatorQuote,
} from "../validators/family.js";

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
} from "../controllers/PsychologyController.js";
import { upload } from "../utils/handleUpload.js";
import { validatorInterview, validatorReport } from "../validators/children.js";
import { assignamentPsichology } from "../controllers/FamilyController.js";

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
router.get("/summary-evaluation",sessionPsychologyMiddleware, SummaryPsyEvaluation);

router.get("/families", sessionPsychologyMiddleware, getFamilies);
router.get(
  "/family/:id",
  validatorGetFamily,
  sessionPsychologyMiddleware,
  getFamily
);
router.post(
  "/interview",
  sessionPsychologyMiddleware,
  upload.fields([{ name: "img1" }, { name: "img2" }]),
  validatorInterview,
  createInterview
);
router.post(
  "/report",
  sessionPsychologyMiddleware,
  upload.fields([{ name: "img1" }, { name: "img2" }]),
  validatorReport,

  createReportToChildren
);

router.post(
  "/citation",
  sessionPsychologyMiddleware,
  validateDate,
  createCitation
);
router.put(
  "/citation/:id",
  sessionPsychologyMiddleware,
  validateDate,
  updateCitation
);
router.put("/cancel-citation/:id", sessionPsychologyMiddleware, cancelCitation);
router.get("/citation", sessionPsychologyMiddleware, getCitations);
router.get("/completed", sessionPsychologyMiddleware, getCompleted);

// router.post(
//   "/gaa",
//   authMiddleware,

//   miSonsera change
// );

export default router;
