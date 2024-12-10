import { body, check } from "express-validator";
import validateResults from "../utils/handleValidator.js";

export const personValidationRules = [
  body("person.name")
    .exists()
    .notEmpty()
    .withMessage("el name es obligatorio !"),
  body("person.lastname")
    .exists()
    .notEmpty()
    .withMessage("el lastname es obligatorio"),
  body("person.mLastname").exists().withMessage("el mLastname es obligatorio"),
  body("person.type_doc")
    .isIn(["DNI", "CE"])
    .withMessage("el tipo de documento debe ser DNI o CE"),
  body("person.doc_number")
    .isNumeric()
    .withMessage("el numero de documento es incorrecto")
    .isLength({ min: 8, max: 8 })
    .withMessage("el numero de documento debe ser de 8 caracteres"),
  body("person.profession")
    .exists()
    .notEmpty()
    .withMessage("el campo profession es incorrecto"),
  body("person.birthdate")
    .isISO8601()
    .withMessage("la fecha debe estar en formato ISO8601"),
  body("person.role")
    .isIn(["M", "P", ""])
    .withMessage("el tipo de documento debe ser M o P"),
  body("person.ubigeo").optional(),
  body("person.issuance_doc").optional().isISO8601(),
  body("person.civil_status").optional(),
  body("person.validate").optional().isNumeric(),
  body("img1").optional(),
  body("img2").optional(),

  (req, res, next) => {
    return validateResults(req, res, next);
  },
];

export const userValidationRules = [
  body("userData[email]")
    .optional({ checkFalsy: true })
    .trim()
    .isEmail()
    .withMessage("el email es incorrecto"),
  body("userData.phone")
    .optional({ checkFalsy: true })
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
export const validatorCRM = [
  body("personId")
    .exists()
    .notEmpty()
    .withMessage("personId no valido")
    .isNumeric()
    .withMessage("el father_id no es un numero"),
  body("crmGHLId").trim().notEmpty().withMessage("el crmGHLId es incorrecto"),
  (req, res, next) => {
    return validateResults(req, res, next);
  },
];
export const validatorCreateChildren = [
  body("children_name")
    .trim()
    .exists()
    .notEmpty()
    .withMessage("el children_name es incorrecto children"),
  body("children_lastname")
    .exists()
    .notEmpty()
    .withMessage("el children_lastname es incorrecto"),
  body("children_mLastname")
    .exists()
    .notEmpty()
    .withMessage("el children_mLastname es incorrecto"),
  body("children_type_doc")
    .isIn(["DNI", "CE"])
    .withMessage("el children_type_doc de documento debe ser DNI o CE"),
  body("children_doc_number")
    .isNumeric()
    .withMessage("el children_doc_number de documento debe ser numerico")
    .isLength({ min: 8, max: 8 })
    .withMessage("el children de documento debe ser de 8 caracteres"),
  body("children_gender")
    .trim()
    .isIn(["M", "F"])
    .withMessage("el children_gender debe ser M o F")
    .isAlpha()
    .withMessage("el campo children_gender es incorrecto"),
  body("children_birthdate")
    .isISO8601()
    .withMessage("el children_birthdate es incorrecto"),
  body("children_img1").optional(),
  body("children_img2").optional(),
  body("father_name")
    .trim()
    .exists()
    .notEmpty()
    .withMessage("el father es incorrecto children"),
  body("father_lastname")
    .exists()
    .notEmpty()
    .withMessage("el father es incorrecto"),
  body("father_mLastname")
    .exists()
    .notEmpty()
    .withMessage("el father es incorrecto"),
  body("father_type_doc")
    .isIn(["DNI", "CE"])
    .withMessage("el father de documento debe ser DNI o CE"),
  body("father_doc_number")
    .isNumeric()
    .withMessage("el father de documento debe ser numerico")
    .isLength({ min: 8, max: 8 })
    .withMessage("el father de documento debe ser de 8 caracteres"),
  body("mother_name")
    .trim()
    .exists()
    .notEmpty()
    .withMessage("el mother es incorrecto children"),
  body("mother_lastname")
    .exists()
    .notEmpty()
    .withMessage("el mother es incorrecto"),
  body("mother_mLastname")
    .exists()
    .notEmpty()
    .withMessage("el mother es incorrecto"),
  body("mother_type_doc")
    .isIn(["DNI", "CE"])
    .withMessage("el mother.type_doc de documento debe ser DNI o CE"),
  body("mother_doc_number")
    .isNumeric()
    .withMessage("el mother de documento debe ser numerico")
    .isLength({ min: 8, max: 8 })
    .withMessage("el mother de documento debe ser de 8 caracteres"),
  // body("ubigeo").optional(),
  // body("issuance_doc").optional().isISO8601(),
  // body("civil_status").optional(),
  // body("validate").optional().isNumeric(),

  (req, res, next) => {
    return validateResults(req, res, next);
  },
];
export const validatorUpdateChildren = [
  body("children_name")
    .trim()
    .exists()
    .notEmpty()
    .withMessage("el children_name es incorrecto children"),
  body("children_lastname")
    .exists()
    .notEmpty()
    .withMessage("el children_lastname es incorrecto"),
  body("children_mLastname")
    .exists()
    .notEmpty()
    .withMessage("el children_mLastname es incorrecto"),
  body("children_type_doc")
    .isIn(["DNI", "CE"])
    .withMessage("el children_type_doc de documento debe ser DNI o CE"),
  body("children_validate")
    .optional()
    .withMessage("el children_validate es necesario"),
  body("children_doc_number")
    .isNumeric()
    .withMessage("el children_doc_number de documento debe ser numerico")
    .isLength({ min: 8, max: 8 })
    .withMessage("el children de documento debe ser de 8 caracteres"),
  body("children_gender")
    .trim()
    .isIn(["M", "F"])
    .withMessage("el children_gender debe ser M o F")
    .isAlpha()
    .withMessage("el campo children_gender es incorrecto"),
  body("children_birthdate")
    .isISO8601()
    .withMessage("el children_birthdate es incorrecto"),
  body("children_img1").optional(),
  body("children_img2").optional(),
  body("father_id")
    .exists()
    .notEmpty()
    .withMessage("father_id no valido")
    .isNumeric()
    .withMessage("el father_id no es un numero"),
  body("father_name")
    .trim()
    .exists()
    .notEmpty()
    .withMessage("el father es incorrecto children"),
  body("father_lastname")
    .exists()
    .notEmpty()
    .withMessage("el father es incorrecto"),
  body("father_mLastname")
    .exists()
    .notEmpty()
    .withMessage("el father es incorrecto"),
  body("father_type_doc")
    .isIn(["DNI", "CE"])
    .withMessage("el father de documento debe ser DNI o CE"),
  body("father_doc_number")
    .isNumeric()
    .withMessage("el father de documento debe ser numerico")
    .isLength({ min: 8, max: 8 })
    .withMessage("el father de documento debe ser de 8 caracteres"),
  body("mother_id")
    .exists()
    .notEmpty()
    .withMessage("father_id no valido")
    .isNumeric()
    .withMessage("el father_id no es un numero"),
  body("mother_name")
    .trim()
    .exists()
    .notEmpty()
    .withMessage("el mother es incorrecto children"),
  body("mother_lastname")
    .exists()
    .notEmpty()
    .withMessage("el mother es incorrecto"),
  body("mother_mLastname")
    .exists()
    .notEmpty()
    .withMessage("el mother es incorrecto"),
  body("mother_type_doc")
    .isIn(["DNI", "CE"])
    .withMessage("el mother.type_doc de documento debe ser DNI o CE"),
  body("mother_doc_number")
    .isNumeric()
    .withMessage("el mother de documento debe ser numerico")
    .isLength({ min: 8, max: 8 })
    .withMessage("el mother de documento debe ser de 8 caracteres"),
  // body("ubigeo").optional(),
  // body("issuance_doc").optional().isISO8601(),
  // body("civil_status").optional(),
  // body("validate").optional().isNumeric(),

  (req, res, next) => {
    return validateResults(req, res, next);
  },
];
