import { check } from "express-validator";
import validateResults from "../utils/handleValidator.js";

export const validatorRegister = [
  check("name").exists().notEmpty().isLength({ min: 3, max: 99 }),
  check("surname").exists().notEmpty().isLength({ min: 3, max: 99 }),
  check("lastname").exists().notEmpty().isLength({ min: 3, max: 99 }),
  check("doc_number").exists().notEmpty().isLength({ max: 8 }),
  check("phone").exists().notEmpty().isNumeric().isLength({ max: 9 }),
  check("email").exists().notEmpty().isEmail(),
  (req, res, next) => {
    return validateResults(req, res, next);
  },
];

export const validatorToken = [
  check("token").exists().notEmpty().isLength({ min: 3, max: 99 }),
  (req, res, next) => {
    return validateResults(req, res, next);
  },
];

export const validatorPassword = [
  check("password").exists().notEmpty().isLength({ min: 5, max: 50 }),
  check("email").exists().notEmpty().isEmail(),
  (req, res, next) => {
    return validateResults(req, res, next);
  },
];

export const validatorLogin = [
  check("password").exists().notEmpty().isLength({ min: 5, max: 50 }),
  check("email").exists().notEmpty().isEmail(),
  (req, res, next) => {
    return validateResults(req, res, next);
  },
];

// module.exports = { validatorRegister, validatorLogin };
