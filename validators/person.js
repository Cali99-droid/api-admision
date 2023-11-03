import { body, check } from "express-validator";
import validateResults from "../utils/handleValidator.js";

export const personValidationRules = [
  body("person.name").exists().withMessage("el name es obligatorio !"),
  body("person.lastname").exists().withMessage("el lastname es obligatorio"),
  body("person.mLastname").exists().withMessage("el mLastname es obligatorio"),
  body("person.type_doc")
    .isIn(["DNI", "CE"])
    .withMessage("el tipo de documento debe ser DNI o CE"),
  body("person.doc_number")
    .trim()
    .isNumeric()
    .withMessage("el numero de documento es incorrecto")
    .isLength({ min: 8, max: 8 })
    .withMessage("el numero de documento debe ser de 8 caracteres"),
  body("person.profession")
    .isAlpha()
    .withMessage("el campo profession es incorrecto"),
  body("person.birthdate")
    .isISO8601()
    .withMessage("la fecha debe estar en formato ISO8601"),
  body("person.role")
    .isIn(["M", "P", ""])
    .withMessage("el tipo de documento debe ser M o P"),

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

export const childValidationRules = [
  body("name")
    .trim()
    .exists()
    .notEmpty()
    .withMessage("el name es incorrecto children"),
  body("lastname").trim().isAlpha().withMessage("el lastname es incorrecto"),
  body("mLastname").trim().isAlpha().withMessage("el mLastname es incorrecto"),
  body("type_doc")
    .isIn(["DNI", "CE"])
    .withMessage("el tipo de documento debe ser DNI o CE"),
  body("doc_number")
    .trim()
    .isNumeric()
    .withMessage("el numero de documento debe ser numerico")
    .isLength({ min: 8, max: 8 })
    .withMessage("el numero de documento debe ser de 8 caracteres"),
  body("gender")
    .trim()
    .isIn(["M", "F"])
    .withMessage("el gender debe ser M o F")
    .isAlpha()
    .withMessage("el campo gender es incorrecto"),
  body("birthdate").isISO8601().withMessage("el birthdate es incorrecto"),

  (req, res, next) => {
    return validateResults(req, res, next);
  },
];
