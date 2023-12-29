import { body, check } from "express-validator";
import validateResults from "../utils/handleValidator.js";

export const validatorUserRole = [
  body("user_id")
    .isNumeric()
    .withMessage("El campo user_id debe ser un numero"),
  check("user_id").custom(),
  body("roles_id")
    .isNumeric()
    .withMessage("El campo roles_id debe ser un numero"),
  body("token_boss")
    .optional()
    .trim(),
  (req, res, next) => {
    return validateResults(req, res, next);
  },
];
