import { handleHttpError } from "../utils/handleHttpError.js";
import { body, matchedData } from "express-validator";
import SecretaryRepository from "../repositories/SecretaryRepository.js";
import PsychologyRepository from "../repositories/PsychologyRepository.js";
const getSecretaryAssignments = async (req, res) => {
  try {
    const asignaments = await SecretaryRepository.getAssignments();
    const data = asignaments.map((a) => {
      return {
        id: a.family.id,
        name: a.family.name,
        status: a.family.status === null ? 0 : a.family.status,
        agent: a.user.person.name,
      };
    });
    res.status(201).json({
      success: true,
      data,
    });
  } catch (error) {
    console.log(error);
    handleHttpError(res, "ERROR_UPDATE_AGREE");
  }
};

const getPsychologyAssignments = async (req, res) => {
  try {
    const asignaments = await PsychologyRepository.getAssignments();
    const data = asignaments.map((a) => {
      return {
        id: a.family.id,
        name: a.family.name,
        applied: a.applied,
        approved: a.approved,
        agent: a.user.person.name,
      };
    });
    res.status(201).json({
      success: true,
      data,
    });
  } catch (error) {
    console.log(error);
    handleHttpError(res, "ERROR_UPDATE_AGREE");
  }
};

export { getSecretaryAssignments, getPsychologyAssignments };
