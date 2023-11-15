import express from "express";
import {
  validatorLogin,
  validatorResetPass,
  validatorRegister,
  validatorToken,
} from "../validators/auth.js";
import {
  confirmEmail,
  forgotPassword,
  login,
  registerUser,
} from "../controllers/AuthController.js";
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
router.post("/register", validatorRegister, registerUser);

/**
 * http://localhost:3001/api
 *
 * Route confirma email
 * @openapi
 * /auth/password:
 *      post:
 *          tags:
 *              - auth
 *          summary: "Ruta para confirmar email y cambiar contraseña"
 *          description: "Esta ruta es para confirmar el email, enviando el token que se encuentra en el enlace enviado por el email y el nuevo password del usuario registrado o del mismo modo cmabiar o recuperar contraseña"
 *          requestBody:
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: "#/components/schemas/authConfirm"
 *          responses:
 *                  '201':
 *                      description: El email se validó de manera correcta y el password fue agregado correctamente
 *                  '401':
 *                      description: El token es inválido
 *                  '403':
 *                      description: Error por validación
 */
router.post("/password", validatorToken, confirmEmail);

/**
 * Login user
 * @openapi
 * /auth/login:
 *    post:
 *      tags:
 *        - auth
 *      summary: "Login user"
 *      description: Iniciar session a un nuevo usuario y obtener el token de sesión
 *      responses:
 *        '200':
 *          description: Retorna el objeto insertado en la coleccion mas el token de sesion.
 *        '404':
 *          description: No existe el email.
 *        '401':
 *          description: Password invalido o email no confirmado.
 *      requestBody:
 *          content:
 *            application/json:
 *              schema:
 *                 $ref: "#/components/schemas/authLogin"
 *
 */
router.post("/login", validatorLogin, login);
/**
 * Forgot password
 * @openapi
 * /auth/forgot-password:
 *    post:
 *      tags:
 *        - auth
 *      summary: "Enviar email de recuperación contraseña"
 *      description: envia el email de recuperacíon
 *      responses:
 *        '200':
 *          description: Retorna el email a donde se envio el correo de recuperacíon.
 *        '404':
 *          description: No existe el email o usuario.
 *        '401':
 *          description: Email no confirmado.
 *      requestBody:
 *          content:
 *            application/json:
 *              schema:
 *                 $ref: "#/components/schemas/authForgot"
 *
 */
router.post("/forgot-password", validatorResetPass, forgotPassword);
// router.post("/check", validatorResetPass, forgotPassword);

export default router;
