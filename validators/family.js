import { body, check } from "express-validator";
import validateResults from "../utils/handleValidator.js";
import prisma from "../utils/prisma.js";
import { handleHttpError } from "../utils/handleHttpError.js";

export const validatorFamily = [
  body("name")
    .trim()
    .exists()
    .notEmpty()
    .withMessage("El campo name no puede estar vacío"),

  (req, res, next) => {
    return validateResults(req, res, next);
  },
];

export const validatorGetFamily = [
  check("id")
    .exists()
    .notEmpty()
    .withMessage("parameto id no valido")
    .isNumeric()
    .withMessage("el parametro no es un numero"),
  (req, res, next) => {
    return validateResults(req, res, next);
  },
];
export const validatorParamId = [
  check("id")
    .exists()
    .notEmpty()
    .withMessage("parameto id no válido")
    .isNumeric()
    .withMessage("el parametro id no es un numero"),
  (req, res, next) => {
    return validateResults(req, res, next);
  },
];
export const validatorIdFamily = [
  check("familyId")
    .exists()
    .notEmpty()
    .withMessage("parameto id no valido")
    .isNumeric()
    .withMessage("el parametro no es un numero"),
  (req, res, next) => {
    return validateResults(req, res, next);
  },
];

export const validatorHome = [
  body("address")
    .trim()
    .exists()
    .notEmpty()
    .withMessage("El campo address no puede estar vacío"),
  body("reference")
    .trim()
    .exists()
    .notEmpty()
    .withMessage("El campo reference no puede estar vacío"),
  body("district_id")
    .trim()
    .exists()
    .notEmpty()
    .withMessage("El campo district no puede estar vacío")
    .isNumeric()
    .withMessage("El campo district debe ser un numero "),
  body("validate").optional().isNumeric(),

  (req, res, next) => {
    return validateResults(req, res, next);
  },
];

export const validatorIncome = [
  body("range_id")
    .trim()
    .exists()
    .notEmpty()
    .isNumeric()
    .withMessage("El campo range_id no puede estar vacío"),
  body("validate").optional().isNumeric(),

  (req, res, next) => {
    return validateResults(req, res, next);
  },
];

export const validatorQuote = [
  body("address")
    .trim()
    .exists()
    .notEmpty()
    .withMessage("El campo address no puede estar vacío"),
  body("reference")
    .trim()
    .exists()
    .notEmpty()
    .withMessage("El campo reference no puede estar vacío"),
  body("district_id")
    .trim()
    .exists()
    .notEmpty()
    .withMessage("El campo district no puede estar vacío")
    .isNumeric()
    .withMessage("El campo district debe ser un numero "),
  body("validate").optional().isNumeric(),

  (req, res, next) => {
    return validateResults(req, res, next);
  },
];

export const validateDate = async (req, res, next) => {
  const { user } = req;
  const { psy_evaluation_id, date } = req.body;

  // Verificar que la fecha no sea pasada
  const fechaActual = new Date();
  //añadir hora de diferencia
  // fechaActual.setHours(fechaActual.getHours() + 5);
  // console.log(fechaEntrevista);
  const fechaEntrevista = new Date(date);
  // fechaEntrevista.setHours(fechaEntrevista.getHours() + 5);
  // console.log(fechaEntrevista);
  // console.log(fechaActual);
  if (fechaEntrevista < fechaActual) {
    handleHttpError(
      res,
      "La fecha de la entrevista no puede ser en el pasado.",
      400
    );
    return;
  }

  // Verificar que no haya otra entrevista en la primera media hora
  const fechaMediaHoraDespues = new Date(fechaEntrevista);
  fechaMediaHoraDespues.setMinutes(fechaMediaHoraDespues.getMinutes() + 30);
  const fechaMediaHoraAntes = new Date(fechaEntrevista);
  fechaMediaHoraAntes.setMinutes(fechaMediaHoraAntes.getMinutes() - 29);
  console.log(fechaEntrevista);
  console.log(fechaMediaHoraAntes);
  console.log(fechaMediaHoraDespues);
  const entrevistasEnEseRango = await prisma.quotes.findMany({
    where: {
      date: {
        gte: fechaMediaHoraAntes,
        lt: fechaMediaHoraDespues,
      },
      AND: {
        psy_evaluation: {
          user_id: user.userId,
        },
      },
    },
  });
  console.log(entrevistasEnEseRango);
  if (entrevistasEnEseRango.length > 0) {
    handleHttpError(
      res,
      "Ya hay otra entrevista programada en ese rango de tiempo.",
      400
    );
    return;
  }

  next();
};

//validaciones de ev economica ('excelente', 'regular', 'malo', 'sn'
export const validatorEconomic = [
  body("result")
    .trim()
    .exists()
    .notEmpty()
    .isIn(["excelente", "regular", "malo", "sn"])
    .withMessage("El campo result debe ser: excelente, regular, malo o sn"),
  body("comment")
    .trim()
    .exists()
    .notEmpty()
    .withMessage("El campo comment no puede estar vacío"),
  body("conclusion")
    .trim()
    .exists()
    .notEmpty()
    .withMessage("El campo conclusion no puede estar vacío")
    .isIn(["apto", "no_apto"])
    .withMessage("El campo conclusion debe ser apto o no_apto"),
  body("family_id")
    .isNumeric()
    .withMessage("El campo family_id debe ser un numero "),

  (req, res, next) => {
    return validateResults(req, res, next);
  },
];

//validaciones de ev economica ('excelente', 'regular', 'malo', 'sn'
export const validatorAntecedent = [
  body("comment")
    .trim()
    .exists()
    .notEmpty()
    .withMessage("El campo comment no puede estar vacío"),
  body("conclusion")
    .trim()
    .exists()
    .notEmpty()
    .withMessage("El campo conclusion no puede estar vacío")
    .isIn(["apto", "no_apto"])
    .withMessage("El campo conclusion debe ser apto o no_apto"),
  body("family_id")
    .isNumeric()
    .withMessage("El campo family_id debe ser un numero "),

  (req, res, next) => {
    return validateResults(req, res, next);
  },
];

export const validatorAssignament = [
  check("idFamily")
    .exists()
    .notEmpty()
    .withMessage("parameto idFamily no valido")
    .isNumeric()
    .withMessage("el parametro no es un numero"),
  check("idPsychology")
    .exists()
    .notEmpty()
    .withMessage("parameto idPsychology no valido")
    .isNumeric()
    .withMessage("el parametro no es un numero"),
  (req, res, next) => {
    return validateResults(req, res, next);
  },
];
