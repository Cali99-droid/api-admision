import { body, check } from "express-validator";
import validateResults from "../utils/handleValidator.js";
import {
  userIdExist,
  roleIdExist,
  userRoleIdExist,
} from "../utils/db-validator.js";
export const validatorCreateYear = [
  body("name").optional().trim(),

  (req, res, next) => {
    return validateResults(req, res, next);
  },
];
export const validatorUpdateUserRole = [
  check("id").custom(userRoleIdExist),
  body("name").optional().trim(),
  (req, res, next) => {
    return validateResults(req, res, next);
  },
];
export const validatorDeleteUserRole = [
  check("id").custom(userRoleIdExist),
  (req, res, next) => {
    return validateResults(req, res, next);
  },
];
