import AntecedentRepository from "../repositories/AntecedentRepository.js";
import { handleHttpError } from "../utils/handleHttpError.js";
import { matchedData } from "express-validator";

const getAntecedent = async (req, res) => {
  try {
    const { familyId } = req.params;

    const antecedent = await AntecedentRepository.getAntecedentByFamily(
      parseInt(familyId)
    );

    res.status(201).json({
      success: true,
      data: antecedent,
    });
  } catch (e) {
    console.log(e);
    handleHttpError(res, "ERROR_GET_ECONOMIC");
  }
};

const createAntecedent = async (req, res) => {
  try {
    req = matchedData(req);
    const data = req;

    const createAntecedent = await AntecedentRepository.createAntecedent(data);

    res.status(201).json({
      success: true,
      data: createAntecedent,
    });
  } catch (e) {
    console.log(e);
    handleHttpError(res, "ERROR_CREATE_ECONOMIC");
  }
};
const updateAntecedent = async (req, res) => {
  try {
    const { id } = req.params;
    req = matchedData(req);
    const data = req;

    const createAntecedent = await AntecedentRepository.updateAntecedent(
      id,
      data
    );

    res.status(201).json({
      success: true,
      data: createAntecedent,
    });
  } catch (e) {
    console.log(e);
    handleHttpError(res, "ERROR_CREATE_ECONOMIC");
  }
};

export { getAntecedent, createAntecedent, updateAntecedent };
