import { body, check } from "express-validator";
import validateResults from "../utils/handleValidator.js";
export const validatorReport = [
  body("personId")
    .isNumeric()
    .withMessage("El campo childrenId debe ser un numero"),

  (req, res, next) => {
    return validateResults(req, res, next);
  },
];

export const validatorInterview = [
  body("approved").exists().withMessage("El campo approved debe ser un numero"),
  body("familyId").exists().withMessage("El campo familyId debe ser un numero"),

  (req, res, next) => {
    return validateResults(req, res, next);
  },
];
