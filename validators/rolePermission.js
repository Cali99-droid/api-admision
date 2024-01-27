import { body, check } from "express-validator";
import validateResults from "../utils/handleValidator.js";
import { roleIdExist, permissionsIdExist, rolePermissionsIdExist}  from "../utils/db-validator.js";
export const validatorCreateRolePermissions = [
  body("roles_id")
    .isNumeric()
    .withMessage("El campo roles_id debe ser un numero").custom(roleIdExist),
  body("permissions_id")
    .isNumeric()
    .withMessage("El campo permissions_id debe ser un numero").custom(permissionsIdExist),
  (req, res, next) => {
    return validateResults(req, res, next);
  },
];
export const validatorUpdateRolePermissions = [
  check('id').custom(rolePermissionsIdExist),
  body("roles_id")
    .isNumeric()
    .withMessage("El campo user_id debe ser un numero").custom(roleIdExist),
  body("permissions_id")
    .isNumeric()
    .withMessage("El campo permissions_id debe ser un numero").custom(permissionsIdExist),
  (req, res, next) => {
    return validateResults(req, res, next);
  },
];