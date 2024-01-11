import { handleHttpError } from "../utils/handleHttpError.js";
import { matchedData } from "express-validator";
import SecretaryRepository from "../repositories/SecretaryRepository.js";
import PsychologyRepository from "../repositories/PsychologyRepository.js";
import UserRepository from "../repositories/UserRepository.js";
import UserRoleRepository from "../repositories/UserRoleRepository.js";
import FamilyRepository from "../repositories/FamilyRepository.js";
const getAllUsers = async (req, res) => {
  try {
    const users = await UserRepository.getAllUsers();
    const data = users.map((u) => {
      return {
        id: u.id,
        doc_number:u.person.doc_number,
        name: u.person.name,
        lastname: u.person.lastname,
        mLastname: u.person.mLastname,
        date: u.email,
        phone:u.phone,
        create_time: u.create_time,
        mautic:u.mauticId,
        user_roles:u.user_roles
      };
    });
    res.status(201).json({
      success: true,
      data,
    });
  } catch (error) {
    console.log(error);
    handleHttpError(res, "ERROR_GET_USERS");
  }
};
const createUserRole = async( req,res ) =>{
  try {
    req = matchedData(req);
    const userRoleCreate = await UserRoleRepository.createUserRole(req);
    res.status(201).json({
      success: true,
      data:userRoleCreate,
    });
  } catch (error) {
    console.log(error);
    handleHttpError(res, "ERROR_CREATE_USER_ROLE");
  }
}
const updateUserRole = async( req,res ) =>{
  try {
    const idUserRole = parseInt(req.params.id);
    req = matchedData(req);
    const dateUpdate = new Date();
    req = { update_time: dateUpdate, ...req };
    const {id, ... data} = req;
    const userRoleUpdate = await UserRoleRepository.updateUserRole(idUserRole,data);
    res.status(201).json({
       success: true,
       data:userRoleUpdate,
     });
  } catch (error) {
    console.log(error);
    handleHttpError(res, "ERROR_UPDATE_USER_ROLE");
  }
}
const deleteUserRole = async( req,res ) =>{
  try {
    const idUserRole = parseInt(req.params.id);
    const userRoleDelete = await UserRoleRepository.deleteUserRole(idUserRole);
    res.status(201).json({
       success: true,
       data:userRoleDelete,
     });
  } catch (error) {
    console.log(error);
    handleHttpError(res, "ERROR_DELETE_USER_ROLE");
  }
}
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

export {
  getAllUsers,
  createUserRole,
  updateUserRole,
  deleteUserRole,
  getSecretaryAssignments,
  getPsychologyAssignments,
  getSecretaries,
  getPsychologists,
  getSuccessFamilies,
  getFamiliesEvaluationStatus,
};
