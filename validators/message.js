import { body, check } from "express-validator";
import validateResults from "../utils/handleValidator.js";

export const validatorMessage = [
  check("message").exists().notEmpty().withMessage("mensaje no válido"),
  check("id")
    .exists()
    .notEmpty()
    .withMessage("parameto id no valido")
    .isNumeric()
    .withMessage("el parametro no es un numero"),

  (req, res, next) => {
    return validateResults(req, res, next);
  },
];
