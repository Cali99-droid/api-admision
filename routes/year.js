import express from "express";

import { adminMiddleware, authMiddleware } from "../middleware/session.js";
import { 
    getAllYears, 
    getYearById,
    createYear,
    updateYear,
    deleteYear,
} from "../controllers/YearController.js";
import {
    validatorCreateYear,
    validatorUpdateYear,
    validatorDeleteYear
} from "../validators/year.js";
  const router = express.Router();
 /**
 * @swagger
 * /year:
 *   get:
 *     summary: Obtiene todos los años
 *     description: Recupera una lista de todos los registros de años.
 *     tags: [Year]
 *     responses:
 *       200:
 *         description: Lista de años recuperada exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                   nombre:
 *                     type: string
 *                   dateStart:
 *                     type: string
 *                     format: date
 *                   dateEnd:
 *                     type: string
 *                     format: date
 *                   status:
 *                     type: boolean
 *                   created_at:
 *                     type: string
 *                     format: date-time
 *                   updated_at:
 *                     type: string
 *                     format: date-time
 *       500:
 *         description: Error al recuperar los años
 */
router.get("/", getAllYears);
/**
 * @swagger
 * /year/{id}:
 *   get:
 *     summary: Obtiene un año por ID
 *     description: Recupera un registro de año por su ID.
 *     tags: [Year]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID del año
 *     responses:
 *       200:
 *         description: Año recuperado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                 nombre:
 *                   type: string
 *                 dateStart:
 *                   type: string
 *                   format: date
 *                 dateEnd:
 *                   type: string
 *                   format: date
 *                 status:
 *                   type: boolean
 *                 created_at:
 *                   type: string
 *                   format: date-time
 *                 updated_at:
 *                   type: string
 *                   format: date-time
 *       404:
 *         description: Año no encontrado
 */
router.get("/:id", getYearById);
/**
 * @swagger
 * /year:
 *   post:
 *     summary: Crea un nuevo año
 *     description: Crea un nuevo registro de año con los datos proporcionados. La fecha de inicio (`dateStart`) debe ser menor que la fecha de fin (`dateEnd`).
 *     tags: [Year]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: Nombre del año
 *               dateStart:
 *                 type: string
 *                 format: date
 *                 description: Fecha de inicio del año (debe ser menor que dateEnd)
 *               dateEnd:
 *                 type: string
 *                 format: date
 *                 description: Fecha de fin del año (debe ser mayor que dateStart)
 *               status:
 *                 type: boolean
 *                 description: Indica si el año está activo. Solo un año puede tener `status` en true.
 *     responses:
 *       201:
 *         description: Año creado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                 name:
 *                   type: string
 *                 dateStart:
 *                   type: string
 *                   format: date
 *                 dateEnd:
 *                   type: string
 *                   format: date
 *                 status:
 *                   type: boolean
 *                 created_at:
 *                   type: string
 *                   format: date-time
 *                 updated_at:
 *                   type: string
 *                   format: date-time
 *       400:
 *         description: Error en los datos de entrada o conflicto en las fechas o estado activo
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 message:
 *                   type: string
 *                   description: Descripción del error
 *       500:
 *         description: Error en el servidor al intentar crear el año
 */
router.post("/", validatorCreateYear,createYear);
/**
 * @swagger
 * /year/{id}:
 *   put:
 *     summary: Actualiza un año existente
 *     description: Modifica un registro de año utilizando su ID.
 *     tags: [Year]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID del año
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nombre:
 *                 type: string
 *               dateStart:
 *                 type: string
 *                 format: date
 *               dateEnd:
 *                 type: string
 *                 format: date
 *               status:
 *                 type: boolean
 *     responses:
 *       200:
 *         description: Año actualizado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                 nombre:
 *                   type: string
 *                 dateStart:
 *                   type: string
 *                   format: date
 *                 dateEnd:
 *                   type: string
 *                   format: date
 *                 status:
 *                   type: boolean
 *                 created_at:
 *                   type: string
 *                   format: date-time
 *                 updated_at:
 *                   type: string
 *                   format: date-time
 *       400:
 *         description: Error en la actualización
 *       404:
 *         description: Año no encontrado
 */
router.put("/:id", validatorUpdateYear,updateYear);
/**
 * @swagger
 * /year/{id}:
 *   delete:
 *     summary: "Eliminar un año"
 *     description: "Elimina un año específico de la base de datos utilizando su ID."
 *     tags: [Year]
 *     operationId: deleteYear
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: "ID del año a eliminar."
 *         schema:
 *           type: integer
 *     responses:
 *       '200':
 *         description: "Año eliminado con éxito."
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: "Año eliminado con éxito."
 *       '404':
 *         description: "Año no encontrado."
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: "Año no encontrado."
 *       '400':
 *         description: "Solicitud inválida."
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: "Error al eliminar el año."
 */
router.delete("/:id", validatorDeleteYear,deleteYear);
export default router;
