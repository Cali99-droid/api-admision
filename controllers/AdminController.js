import { handleHttpError } from "../utils/handleHttpError.js";

import SecretaryRepository from "../repositories/SecretaryRepository.js";
import PsychologyRepository from "../repositories/PsychologyRepository.js";
import UserRepository from "../repositories/UserRepository.js";
const getSecretaryAssignments = async (req, res) => {
  try {
    const asignaments = await SecretaryRepository.getAssignments();
    const data = asignaments.map((a) => {
      return {
        id: a.family.id,
        name: a.family.name,
        status: a.status,
        agent: a.user.person.name,
        date: a.family.create_time,
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
        date: a.family.create_time,
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

const getSecretaries = async (req, res) => {
  try {
    const secretaries = await UserRepository.getUsersByRole(2);
    const data = secretaries.map(({ user }) => {
      return {
        id: user.id,
        name: user.person.name,
        lastname: user.person.lastname,
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
const getPsychologists = async (req, res) => {
  try {
    const secretaries = await UserRepository.getUsersByRole(3);
    const data = secretaries.map(({ user }) => {
      return {
        id: user.id,
        name: user.person.name,
        lastname: user.person.lastname,
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

export {
  getSecretaryAssignments,
  getPsychologyAssignments,
  getSecretaries,
  getPsychologists,
};
