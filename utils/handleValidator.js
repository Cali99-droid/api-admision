import { validationResult } from "express-validator";

const validateResults = (req, res, next) => {
  try {
    validationResult(req).throw();
    return next(); //TODO Continua hacia el controlador!
  } catch (err) {
    res.status(403);
    res.send({ errors: err.array() });
  }
};

export default validateResults;
