import express from "express";
import {
  validatorLogin,
  validatorPassword,
  validatorRegister,
  validatorToken,
} from "../validators/auth.js";
import {
  confirmEmail,
  login,
  registerUser,
  resetPassword,
} from "../controllers/authController.js";
const router = express.Router();

router.post("/register", validatorRegister, registerUser);
router.get("/confirmar/:token", validatorToken, confirmEmail);
router.post("/password", validatorPassword, resetPassword);
router.post("/login", validatorLogin, login);

export default router;
