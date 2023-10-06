import { body, check } from "express-validator";
import validateResults from "../utils/handleValidator.js";

export const validatorRegister = [
  body("name").trim().exists().notEmpty().isLength({ min: 3, max: 99 }),
  body("surname").trim().exists().notEmpty().isLength({ min: 3, max: 99 }),
  body("lastname").trim().exists().notEmpty().isLength({ min: 3, max: 99 }),
  body("doc_number")
    .trim()
    .exists()
    .notEmpty()
    .isNumeric()
    .isLength({ min: 8, max: 8 }),
  body("phone")
    .trim()
    .exists()
    .notEmpty()
    .isNumeric()
    .isLength({ min: 9, max: 9 }),
  body("email").trim().exists().notEmpty().isEmail(),
  (req, res, next) => {
    return validateResults(req, res, next);
  },
];

export const validatorToken = [
  body("token").trim().exists().notEmpty().isLength({ min: 3, max: 99 }),
  body("password").trim().exists().notEmpty().isLength({ min: 5, max: 50 }),
  (req, res, next) => {
    return validateResults(req, res, next);
  },
];

export const validatorPassword = [
  body("password").exists().notEmpty().isLength({ min: 5, max: 50 }),
  body("email").exists().notEmpty().isEmail().trim(),
  (req, res, next) => {
    return validateResults(req, res, next);
  },
];

export const validatorLogin = [
  body("password").trim().exists().notEmpty().isLength({ min: 5, max: 50 }),
  body("email").trim().exists().notEmpty().isEmail(),
  (req, res, next) => {
    return validateResults(req, res, next);
  },
];
export const validatorResetPass = [
  body("email").trim().exists().notEmpty().isEmail(),
  (req, res, next) => {
    return validateResults(req, res, next);
  },
];

// module.exports = { validatorRegister, validatorLogin };
