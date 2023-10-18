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

export const validatorGetFamily = [
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

export const validatorHome = [
  body("address")
    .trim()
    .exists()
    .notEmpty()
    .withMessage("El campo address no puede estar vacío"),
  body("district_id")
    .trim()
    .exists()
    .notEmpty()
    .withMessage("El campo district no puede estar vacío")
    .isNumeric()
    .withMessage("El campo district debe ser un numero "),

  (req, res, next) => {
    return validateResults(req, res, next);
  },
];

export const validatorIncome = [
  body("range_id")
    .trim()
    .exists()
    .notEmpty()
    .isNumeric()
    .withMessage("El campo range_id no puede estar vacío"),

  (req, res, next) => {
    return validateResults(req, res, next);
  },
];
