import { handleHttpError } from "../utils/handleHttpError.js";

import SecretaryRepository from "../repositories/SecretaryRepository.js";
import PsychologyRepository from "../repositories/PsychologyRepository.js";
import UserRepository from "../repositories/UserRepository.js";
import FamilyRepository from "../repositories/FamilyRepository.js";
import VacantRepository from "../repositories/VacantRepository.js";
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
        approved: a.applied === 0 ? 3 : a.approved,
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
const getSuccessFamilies = async (req, res) => {
  try {
    const families =
      await FamilyRepository.getFamiliesWithEvaluationsApproved();

    const format = families.map((family) => {
      return {
        name: family.name,
        inscription: family.create_time,
        economic: family.economic_evaluation[0],
        antecendent: family.background_assessment[0],
        psychology: family.psy_evaluation[0],
      };
    });

    res.status(201).json({
      success: true,
      data: format,
    });
  } catch (error) {
    console.log(error);
    handleHttpError(res, "ERROR_UPDATE_AGREE");
  }
};

/**no usado */
const getFamiliesEvaluationStatus = async (req, res) => {
  try {
    const families = await FamilyRepository.getFamiliesWithEvaluationsStatus();

    const format = families.map((family) => {
      return {
        name: family.name,
        inscription: family.create_time,
        economic:
          family.economic_evaluation[0]?.conclusion === "apto" ? true : false,
        antecendent:
          family.background_assessment[0]?.conclusion === "apto" ? true : false,
        psychology: family.psy_evaluation[0]?.approved === 1 ? true : false,
      };
    });

    res.status(201).json({
      success: true,
      data: format,
    });
  } catch (error) {
    console.log(error);
    handleHttpError(res, "ERROR_GET_FAMILIES_STATUS");
  }
};

const getStatusFamilies = async (req, res) => {
  try {
    const families = await FamilyRepository.getFamiliesStatus();
    const format = families.map((f) => {
      return {
        id: f.family.id,
        name: f.family.name,
        inscription: f.family.create_time,
        secretary: f.status === 1 ? true : false,
        economic:
          f.family.economic_evaluation[0]?.conclusion === "apto"
            ? true
            : f.family.economic_evaluation.length > 0
            ? false
            : "pending",
        antecendent:
          f.family.background_assessment[0]?.conclusion === "apto"
            ? true
            : f.family.background_assessment > 0
            ? false
            : "pending",
        psychology:
          f.family.psy_evaluation[0]?.approved === 1
            ? true
            : f.family.psy_evaluation.length > 0
            ? false
            : "pending",
      };
    });

    res.status(201).json({
      success: true,
      data: format,
    });
  } catch (error) {
    console.log(error);
    handleHttpError(res, "ERROR_GET_STATUS");
  }
};

const getFilterByLevelGrade = async (req, res) => {
  try {
    const { level, grade } = req.params;
    const vacants = await VacantRepository.getUserByGradeAndNivel(level, grade);
    const data = vacants.map((v) => {
      return {
        id: v.id,
        grade: v.grade,
        campus: v.campus,
        children:
          v.children.person.name +
          " " +
          v.children.person.lastname +
          " " +
          v.children.person.mLastname,
        family: v.children.family.name,
      };
    });
    res.status(201).json({
      success: true,
      data,
    });
  } catch (error) {
    console.log(error);
    handleHttpError(res, "ERROR_GET_STATISTICS");
  }
};
const getAllVacants = async (req, res) => {
  try {
    const vacants = await VacantRepository.getAllVacants();
    const data = vacants.map((v) => {
      return {
        id: v.id,
        grade: v.grade,
        level: v.level,
        campus: v.campus,
        children:
          v.children.person.name +
          " " +
          v.children.person.lastname +
          " " +
          v.children.person.mLastname,
        family: v.children.family.name,
      };
    });
    res.status(201).json({
      success: true,
      data,
    });
  } catch (error) {
    console.log(error);
    handleHttpError(res, "ERROR_GET_STATISTICS");
  }
};
const getStatistics = async (req, res) => {
  try {
    const vacants = await VacantRepository.getAllVacants();
    const data = vacants.map((v) => {
      return {
        id: v.id,
        grade: v.grade,
        level: v.level,
        campus: v.campus,
        children:
          v.children.person.name +
          " " +
          v.children.person.lastname +
          " " +
          v.children.person.mLastname,
        family: v.children.family.name,
      };
    });
    res.status(201).json({
      success: true,
      data,
    });
  } catch (error) {
    console.log(error);
    handleHttpError(res, "ERROR_GET_STATISTICS");
  }
};

const getStatusFamilyAndChildren = async (req, res) => {
  try {
    const families = await FamilyRepository.getVacant();
    const dat = families.filter(
      (f) => f.family.familiy_secretary[0].status === 1
    );
    const format = dat.map((f) => {
      return {
        id: f.family.id,
        children:
          f.person.lastname + " " + f.person.mLastname + " " + f.person.name,
        family: f.family.name,
        inscription: f.family.create_time,
        phone: f.family.mainConyugue.phone,
        email: f.family.mainConyugue.email,
        campus: f.vacant[0]?.campus,
        level: f.vacant[0]?.level,
        grade: f.vacant[0]?.grade,
        secretary: f.family.familiy_secretary[0].status === 1 ? true : false,
        economic:
          f.family.economic_evaluation[0]?.conclusion === "apto"
            ? true
            : f.family.economic_evaluation.length > 0
            ? false
            : "pending",
        antecendent:
          f.family.background_assessment[0]?.conclusion === "apto"
            ? true
            : f.family.background_assessment > 0
            ? false
            : "pending",
        psychology:
          f.family.psy_evaluation[0]?.approved === 1
            ? true
            : f.family.psy_evaluation.length > 0
            ? false
            : "pending",
      };
    });

    res.status(201).json({
      success: true,
      data: format,
    });
  } catch (error) {
    console.log(error);
    handleHttpError(res, "ERROR_GET_STATUS");
  }
};

export {
  getSecretaryAssignments,
  getPsychologyAssignments,
  getSecretaries,
  getPsychologists,
  getSuccessFamilies,
  getFamiliesEvaluationStatus,
  getStatusFamilies,
  getAllVacants,
  getFilterByLevelGrade,
  getStatistics,
  getStatusFamilyAndChildren,
};
