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
  const { psy_evaluation_id, date } = req.body;

  // Verificar que la fecha no sea pasada
  const fechaActual = new Date();
  const fechaEntrevista = new Date(date);

  if (fechaEntrevista < fechaActual) {
    return res
      .status(400)
      .json({ error: "La fecha de la entrevista no puede ser en el pasado." });
  }

  // Verificar que no haya otra entrevista en la primera media hora
  const fechaMediaHoraDespues = new Date(fechaEntrevista);
  fechaMediaHoraDespues.setMinutes(fechaMediaHoraDespues.getMinutes() + 30);
  const fechaMediaHoraAntes = new Date(fechaEntrevista);
  fechaMediaHoraAntes.setMinutes(fechaMediaHoraAntes.getMinutes() - 29);
  // console.log(fechaMediaHoraAntes);
  // console.log(fechaMediaHoraDespues);
  const entrevistasEnEseRango = await prisma.quotes.findMany({
    where: {
      psy_evaluation_id,
      date: {
        gte: fechaMediaHoraAntes,
        lt: fechaMediaHoraDespues,
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
