import { body, check } from "express-validator";
import validateResults from "../utils/handleValidator.js";
import { roleIdExist }  from "../utils/db-validator.js";
export const validatorCreateRole = [
  body("rol")
    .trim()
    .exists()
    .notEmpty()
    .withMessage("El campo rol no puede estar vacío"), 
  (req, res, next) => {
    return validateResults(req, res, next);
  },
];
export const validatorUpdateRole = [
  check('id').custom(roleIdExist),
  body("rol")
    .trim()
    .exists()
    .notEmpty()
    .withMessage("El campo rol no puede estar vacío"), 
  (req, res, next) => {
    return validateResults(req, res, next);
  },
];