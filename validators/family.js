import { body, check } from "express-validator";
import validateResults from "../utils/handleValidator.js";

export const validatorFamily = [
  body("name")
    .trim()
    .exists()
    .notEmpty()
    .withMessage("El campo name no puede estar vacío"),

  (req, res, next) => {
    return validateResults(req, res, next);
  },
];
