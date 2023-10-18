import { body, check } from "express-validator";
import validateResults from "../utils/handleValidator.js";
export const validatorSchool = [
  body("name")
    .trim()
    .exists()
    .notEmpty()
    .withMessage("El campo name no puede estar vacío"),
  body("grade")
    .trim()
    .exists()
    .notEmpty()
    .withMessage("El campo grade no puede estar vacío"),
  body("district_id")
    .trim()
    .exists()
    .notEmpty()
    .withMessage("El campo district_id no puede estar vacío")
    .isNumeric()
    .withMessage("El campo district_id debe ser un numero "),

  (req, res, next) => {
    return validateResults(req, res, next);
  },
];
