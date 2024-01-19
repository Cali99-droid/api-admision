import FamilyRepository from "../repositories/FamilyRepository.js";
import VacantRepository from "../repositories/VacantRepository.js";
import { handleHttpError } from "../utils/handleHttpError.js";
import { matchedData } from "express-validator";

const getSummaryAntecedent = async (req, res) => {
  try {
    // const result = await VacantRepository.getVacantWithAntecedents();

    res.status(200).json({
      success: true,
      result,
    });
  } catch (error) {
    console.log(error);
    handleHttpError(res, "ERROR_GET_SUMMARY");
  }
};

export { getSummaryAntecedent };
