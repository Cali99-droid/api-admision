import express from "express";
import {
  downloadVacancyCertificate,
} from "../controllers/PdfController.js";
const router = express.Router();
/**
 * Descargar constancia de vacante
 * @openapi
 * /pdf/{id}:
 *    get:
 *      tags:
 *        - Constancia
 *      summary: "Descargar constancia de vacante"
 *      description: Genera y descarga un archivo PDF de la constancia de vacante
 *      responses:
 *        '200':
 *          description: Retorna el archivo PDF de la constancia de vacante.
 *          content:
 *           application/pdf:
 *             schema:
 *               type: string
 *               format: binary
 *        '500':
 *          description: Error al generar el PDF.
 */
router.get("/:id", downloadVacancyCertificate);

export default router;
