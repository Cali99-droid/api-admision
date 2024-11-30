import { body, check } from "express-validator";
import validateResults from "../utils/handleValidator.js";
import { yearIdExist } from "../utils/db-validator.js";
export const validatorCreateYear = [
  body("name").optional().trim(),
  body("dateStart")
    .optional()
    .isDate()
    .withMessage("La fecha de inicio debe ser una fecha válida")
    .bail(),
  body("dateEnd")
    .optional()
    .isDate()
    .withMessage("La fecha de fin debe ser una fecha válida")
    .bail(),
  body("status")
    .isNumeric()
    .withMessage("El campo status debe ser un numero")
    .isIn(["1", "0"]),
  body("dateEnd").custom((value, { req }) => {
    const { dateStart } = req.body;
    if (dateStart && new Date(dateStart) >= new Date(value)) {
      throw new Error("La fecha de inicio debe ser menor que la fecha de fin");
    }
    return true;
  }),
  (req, res, next) => {
    return validateResults(req, res, next);
  },
];
export const validatorUpdateYear = [
  check("id").isInt().withMessage("El ID debe ser un número entero"),
  check("id").custom(yearIdExist),
  body("name").optional().trim(),
  body("dateStart")
    .optional()
    .isDate()
    .withMessage("La fecha de inicio debe ser una fecha válida")
    .bail(),
  body("dateEnd")
    .optional()
    .isDate()
    .withMessage("La fecha de fin debe ser una fecha válida")
    .bail(),
  body("status")
    .isNumeric()
    .withMessage("El campo status debe ser un numero")
    .isIn(["1", "0"]),
  body("dateEnd").custom((value, { req }) => {
    const { dateStart } = req.body;
    if (dateStart && new Date(dateStart) >= new Date(value)) {
      throw new Error("La fecha de inicio debe ser menor que la fecha de fin");
    }
    return true;
  }),
  (req, res, next) => {
    return validateResults(req, res, next);
  },
];
export const validatorDeleteYear = [
  check("id").isInt().withMessage("El ID debe ser un número entero"),
  check("id").custom(yearIdExist),
  (req, res, next) => {
    return validateResults(req, res, next);
  },
];
