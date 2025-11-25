import express from "express";
import {
  showDistrict,
  showProvince,
  showRegion,
} from "../controllers/CitiesController.js";
import { authMiddleware } from "../middleware/session.js";

const router = express.Router();

/**
 * Get all storagesss
 * @openapi
 * /cities/region:
 *    get:
 *      tags:
 *        - cities
 *      summary: "Listar regiones"
 *      description: Obten todas las regiones
 *      security:
 *        - bearerAuth: []
 *      responses:
 *        '200':
 *          description: Retorna la listas de las regiones.
 *          content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/region'
 *
 *        '422':
 *          description: Error de validacion.
 */
router.get("/region", showRegion);
/**
 * Get all storages
 * @openapi
 * /cities/province:
 *    get:
 *      tags:
 *        - cities
 *      summary: "Listar provincias"
 *      description: Obten todas las provincias
 *      security:
 *        - bearerAuth: []
 *      responses:
 *        '200':
 *          description: Retorna la listas de las provincias.
 *          content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/province'
 *
 *        '422':
 *          description: Error de validacion.
 */
router.get("/province", showProvince);
/**
 * Get all storages
 * @openapi
 * /cities/district:
 *    get:
 *      tags:
 *        - cities
 *      summary: "Listar distritos"
 *      description: Obten todas las distritos
 *      security:
 *        - bearerAuth: []
 *      responses:
 *        '200':
 *          description: Retorna la listas de las distritos.
 *          content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/district'
 *
 *        '422':
 *          description: Error de validacion.
 */
router.get("/district", showDistrict);

export default router;
