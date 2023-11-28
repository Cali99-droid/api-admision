import { body, check } from "express-validator";
import validateResults from "../utils/handleValidator.js";
export const validatorVacant = [
  body("year")
    .trim()
    .exists()
    .notEmpty()
    .withMessage("El campo year no puede estar vacío"),

  body("campus")
    .trim()
    .exists()
    .notEmpty()
    .withMessage("El campo grade no puede estar vacío"),

  body("level")
    .trim()
    .exists()
    .notEmpty()
    .withMessage("El campo level no puede estar vacío"),
  body("grade")
    .trim()
    .exists()
    .notEmpty()
    .withMessage("El campo grade no puede estar vacío"),
  body("validate").optional().isNumeric(),
  (req, res, next) => {
    return validateResults(req, res, next);
  },
];
