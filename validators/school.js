import { body, check } from "express-validator";
import validateResults from "../utils/handleValidator.js";
export const validatorSchool = [
  body("schoolId")
    .trim()
    .exists()
    .notEmpty()
    .withMessage("El campo schoolId no puede estar vacío")
    .isNumeric()
    .withMessage("El campo schoolId debe ser un numero "),

  body("grade")
    .trim()
    .exists()
    .notEmpty()
    .withMessage("El campo grade no puede estar vacío")
    .isNumeric()
    .withMessage("El campo schoolId debe ser un numero "),
  body("level")
    .trim()
    .exists()
    .notEmpty()
    .withMessage("El campo level no puede estar vacío")
    .isNumeric()
    .withMessage("El campo level debe ser un numero "),

  (req, res, next) => {
    return validateResults(req, res, next);
  },
];
