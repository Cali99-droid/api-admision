import { body, check } from "express-validator";
import validateResults from "../utils/handleValidator.js";

export const validatorCode = [
  check("code").exists().notEmpty().withMessage("parameto code no valido"),

  (req, res, next) => {
    return validateResults(req, res, next);
  },
];
