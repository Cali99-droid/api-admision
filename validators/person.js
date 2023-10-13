import { body, check } from "express-validator";
import validateResults from "../utils/handleValidator.js";

export const personValidationRules = [
  body("person.name").exists().notEmpty().withMessage("el name es incorrecto"),
  body("person.lastname").isAlpha().withMessage("el lastname es incorrecto"),
  body("person.mLastname").isAlpha().withMessage("el mLastname es incorrecto"),
  body("person.type_doc")
    .isIn(["DNI", "CE"])
    .withMessage("el tipo de documento debe ser DNI o CE"),
  body("person.doc_number")
    .isNumeric()
    .withMessage("el numero de documento es incorrecto")
    .isLength({ min: 8, max: 8 })
    .withMessage("el numero de documento debe ser de 8 caracteres"),
  body("person.profession")
    .isAlpha()
    .withMessage("el campo profession es incorrecto"),
  body("person.birthdate").isISO8601().withMessage("el name es incorrecto"),

  (req, res, next) => {
    return validateResults(req, res, next);
  },
];

export const userValidationRules = [
  body("userData[email]")
    .trim()
    .isEmail()
    .withMessage("el email es incorrecto"),
  body("userData.phone")
    .isMobilePhone("es-PE")
    .withMessage("el telefono no tiene el formato PE"), // Ajusta la región según corresponda
  (req, res, next) => {
    return validateResults(req, res, next);
  },
];

export const idValidationRules = [
  check("id")
    .exists()
    .notEmpty()
    .withMessage("parametro no valido")
    .isNumeric()
    .withMessage("el parametro no es un numero"),
  (req, res, next) => {
    return validateResults(req, res, next);
  },
];
