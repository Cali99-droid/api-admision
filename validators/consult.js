import { body } from "express-validator";
import validateResults from "../utils/handleValidator.js";

export const validatorConsult = [
  body("docNumber")
    .exists()
    .trim()
    .withMessage("El campo docNumber debe ser un numero y tener 8 digitos"),

  (req, res, next) => {
    return validateResults(req, res, next);
  },
];
