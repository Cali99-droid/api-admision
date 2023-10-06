import express from "express";
import { store } from "../controllers/SpouseController.js";

const router = express.Router();

/**
 * http://localhost:3001/api
 *
 * Route register new user
 * @openapi
 * /auth/register:
 *      post:
 *          tags:
 *              - auth
 *          summary: "Register nuevo usuario"
 *          description: "Esta ruta es para registrar un nuevo usuario"
 *          requestBody:
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: "#/components/schemas/authRegister"
 *          responses:
 *                  '201':
 *                      description: El usuario se registró de manera correcta
 *                  '403':
 *                      description: Error por validación de datos o existe el numero de documento o el email
 */
router.post("/", store);

export default router;
