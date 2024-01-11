import EconomicRepository from "../repositories/EconomicRepository.js";
import { handleHttpError } from "../utils/handleHttpError.js";
import { matchedData } from "express-validator";

const getEconomic = async (req, res) => {
  try {
    const { familyId } = req.params;

    const economic = await EconomicRepository.getEconomicByFamily(
      parseInt(familyId)
    );

    res.status(201).json({
      success: true,
      data: economic,
    });
  } catch (e) {
    console.log(e);
    handleHttpError(res, "ERROR_GET_ECONOMIC");
  }
};

const createEconomic = async (req, res) => {
  try {
    req = matchedData(req);
    const data = req;

    const createEconomic = await EconomicRepository.createEconomic(data);

    res.status(201).json({
      success: true,
      data: createEconomic,
    });
  } catch (e) {
    console.log(e);
    handleHttpError(res, "ERROR_CREATE_ECONOMIC");
  }
};
const updateEconomic = async (req, res) => {
  try {
    const { id } = req.params;
    req = matchedData(req);
    const data = req;

    console.log(data);
    const economic = await EconomicRepository.get(+id);
    if (!economic) {
      handleHttpError(res, "NOT_EXIST_ID", 404);
    }
    const updateEconomic = await EconomicRepository.updateEconomic(+id, data);

    res.status(201).json({
      success: true,
      data: updateEconomic,
    });
  } catch (e) {
    console.log(e);
    handleHttpError(res, "ERROR_UPDATE_ECONOMIC");
  }
};

export { getEconomic, createEconomic, updateEconomic };
