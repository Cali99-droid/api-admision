import express from "express";
import { validatorRegister, validatorToken } from "../validators/auth.js";
import { matchedData } from "express-validator";
import { confirmEmail, registerUser } from "../controllers/authController.js";
const router = express.Router();

router.post("/register", validatorRegister, registerUser);
router.get("/confirmar/:token", validatorToken, confirmEmail);

export default router;
