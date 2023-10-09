import { body, check } from "express-validator";
import validateResults from "../utils/handleValidator.js";

export const validatorRegister = [
  body("name")
    .trim()
    .exists()
    .notEmpty()
    .withMessage("El campo name no puede estar vacío")
    .isLength({ min: 2, max: 99 })
    .withMessage("El campo name debe contener mas dos o mas caracteres"),
  body("mLastname")
    .trim()
    .exists()
    .notEmpty()
    .withMessage("El campo mLastname no puede estar vacío")
    .isLength({ min: 3, max: 99 }),
  body("lastname")
    .trim()
    .exists()
    .withMessage("El campo lastname no puede estar vacío")
    .notEmpty()
    .withMessage("El campo lastname no puede estar vacío")
    .isLength({ min: 3, max: 99 }),
  body("doc_number")
    .trim()
    .exists()
    .notEmpty()
    .withMessage("El campo doc_number no puede estar vacío")
    .isNumeric()
    .isLength({ min: 8, max: 8 })
    .withMessage("El campo doc_number debe ser de 8 caracteres"),
  body("phone")
    .trim()
    .exists()
    .notEmpty()
    .withMessage("El campo phone no puede estar vacío")
    .isNumeric()
    .isLength({ min: 9, max: 9 })
    .withMessage("El campo phone debe ser de 9 caracteres"),

  body("email")
    .trim()
    .exists()
    .notEmpty()
    .withMessage("El campo email debe ser un email")
    .isEmail()
    .withMessage("El campo email debe ser un email"),
  (req, res, next) => {
    return validateResults(req, res, next);
  },
];

export const validatorToken = [
  body("token")
    .trim()
    .exists()
    .notEmpty()
    .withMessage("El campo token no puede estar vacío")
    .isLength({ min: 3, max: 99 }),
  body("password")
    .trim()
    .exists()
    .notEmpty()
    .withMessage("El campo password no puede estar vacío")
    .isLength({ min: 5, max: 50 })
    .withMessage("El campo password no debe contener mas de 5 caracteres"),
  (req, res, next) => {
    return validateResults(req, res, next);
  },
];

export const validatorPassword = [
  body("password")
    .exists()
    .notEmpty()
    .withMessage("El campo password no puede estar vacío")
    .isLength({ min: 5, max: 50 })
    .withMessage("El campo password no debe contener mas de 5 caracteres"),
  body("email")
    .exists()
    .notEmpty()
    .withMessage("El campo email debe ser un email")
    .isEmail()
    .withMessage("El campo email debe ser un email")
    .trim(),
  (req, res, next) => {
    return validateResults(req, res, next);
  },
];

export const validatorLogin = [
  body("password")
    .trim()
    .exists()
    .notEmpty()
    .withMessage("El campo password no puede estar vacío")
    .isLength({ min: 5, max: 50 })
    .withMessage("El campo password no debe contener mas de 5 caracteres"),
  body("email")
    .trim()
    .exists()
    .notEmpty()
    .withMessage("El campo email debe ser un email")
    .isEmail()
    .withMessage("El campo email debe ser un email"),
  (req, res, next) => {
    return validateResults(req, res, next);
  },
];
export const validatorResetPass = [
  body("email")
    .trim()
    .exists()
    .notEmpty()
    .withMessage("El campo email debe ser un email")
    .isEmail()
    .withMessage("El campo email debe ser un email"),
  (req, res, next) => {
    return validateResults(req, res, next);
  },
];

// module.exports = { validatorRegister, validatorLogin };
