import { body, check } from "express-validator";
import validateResults from "../utils/handleValidator.js";
export const validatorSchool = [
  body("schoolId")
    .trim()
    .exists()
    .notEmpty()
    .withMessage("El campo schoolId no puede estar vacío"),

  body("district_id")
    .trim()
    .exists()
    .notEmpty()
    .withMessage("El campo district_id no puede estar vacío"),

  body("grade")
    .trim()
    .exists()
    .notEmpty()
    .withMessage("El campo grade no puede estar vacío"),

  body("level")
    .trim()
    .exists()
    .notEmpty()
    .withMessage("El campo level no puede estar vacío"),

  (req, res, next) => {
    return validateResults(req, res, next);
  },
];
