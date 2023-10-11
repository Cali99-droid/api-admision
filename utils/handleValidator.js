import { validationResult } from "express-validator";

const validateResults = (req, res, next) => {
  try {
    validationResult(req).throw();

    return next(); //TODO Continua hacia el controlador!
  } catch (err) {
    const errors = err.array();

    const errorMessages = errors.map((error) => error.msg);
    return res.status(403).json({
      success: false,
      errors: errorMessages,
    });
    // res.status(403);
    // res.send({ errors: err.array() });
  }
};

export default validateResults;
