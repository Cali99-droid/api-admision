import { body, check } from "express-validator";
import validateResults from "../utils/handleValidator.js";
import {
  userIdExist,
  roleIdExist,
  userRoleIdExist,
} from "../utils/db-validator.js";
export const validatorCreateUserRole = [
  body("user_id")
    .isNumeric()
    .withMessage("El campo user_id debe ser un numero")
    .custom(userIdExist),
  body("roles_id")
    .isNumeric()
    .withMessage("El campo roles_id debe ser un numero")
    .custom(roleIdExist),
  body("status")
    .isNumeric()
    .withMessage("El campo status debe ser un numero")
    .isIn(["1", "0"]),
  body("token_boss").optional().trim(),
  body("permissions").optional().isArray(),

  (req, res, next) => {
    return validateResults(req, res, next);
  },
];
export const validatorUpdateUserRole = [
  check("id").custom(userRoleIdExist),
  body("user_id")
    .optional()
    .isNumeric()
    .withMessage("El campo user_id debe ser un numero")
    .custom(userIdExist),
  body("roles_id")
    .isNumeric()
    .withMessage("El campo roles_id debe ser un numero")
    .custom(roleIdExist),
  body("status")
    .isNumeric()
    .withMessage("El campo status debe ser un numero")
    .isIn(["1", "0"]),
  body("token_boss").optional().trim(),
  body("permissions").optional().isArray(),
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
