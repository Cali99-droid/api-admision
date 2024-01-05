import { handleHttpError } from "../utils/handleHttpError.js";

import SecretaryRepository from "../repositories/SecretaryRepository.js";
import PsychologyRepository from "../repositories/PsychologyRepository.js";
import UserRepository from "../repositories/UserRepository.js";
import FamilyRepository from "../repositories/FamilyRepository.js";
import VacantRepository from "../repositories/VacantRepository.js";
import { getVacantSIGE } from "../utils/handleGetVacantSige.js";
import {
  createFamilySIGE,
  createFamiliarsSIGE,
  createStudentSIGE,
} from "../utils/handleCreateFamilySige.js";
import { loginSIGE } from "../utils/handleLoginSige.js";
import { verifyFamilySIGE } from "../utils/handleVerifyFamilySige.js";
import prisma from "../utils/prisma.js";
import sendEmail from "../mautic/sendEmail.js";

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
            : f.family.psy_evaluation[0]?.approved === 0
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
    const [dataSIGE, families] = await Promise.all([
      getVacantSIGE(),
      FamilyRepository.getVacant(),
    ]);

    const dat = families.filter(
      (f) => f.family.familiy_secretary[0].status === 1
    );
    const format = dat.map((f) => {
      const campus = parseInt(f.vacant[0]?.campus);
      const nivel = parseInt(f.vacant[0]?.level);
      const id_gra = parseInt(f.vacant[0]?.grade);

      const getdataSIGE = dataSIGE.filter(
        (x) => x.sucursal === campus && x.nivel === nivel && x.id_gra === id_gra
      );
      return {
        id: f.id,
        name: f.person.name,
        lastname: f.person.lastname,
        mLastname: f.person.mLastname,
        gender: f.person.gender,
        dni: f.person.doc_number,
        // ubigeo: f.person.ubigeo,
        birthdate: f.person.birthdate,
        family: f.family.name,
        inscription: f.family.create_time,
        phone: f.family.mainConyugue.phone,
        email: f.family.mainConyugue.email,
        campus,
        level: nivel,
        grade: id_gra,

        vacants:
          f.vacant[0]?.campus === undefined ? 0 : getdataSIGE[0].vacantes,
        secretary: f.family.familiy_secretary[0].status === 1 ? 1 : 2,
        economic:
          f.family.economic_evaluation[0]?.conclusion === "apto"
            ? 1
            : f.family.economic_evaluation.length > 0
            ? 2
            : 3,
        antecendent:
          f.family.background_assessment[0]?.conclusion === "apto"
            ? 1
            : f.family.background_assessment > 0
            ? 2
            : 3,
        psychology:
          f.family.psy_evaluation[0]?.applied === 0
            ? 3
            : f.family.psy_evaluation[0]?.approved,
        status: f.vacant[0]?.status,
        //approved: a.applied === 0 ? 3 : a.approved,
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

const assignVacant = async (req, res) => {
  const sucursalMapping = {
    1: "Local 1 - Jr. Huaylas 220",
    2: "Local 2 - Einstinitos 2", //Local 2 - Jr. Augusto B. Leguia Nro 264
    3: "Local 3 - Jr. Huaylas 245",
  };

  const nivelMapping = {
    1: "Inicial",
    2: "Primaria",
    3: "Secundaria",
  };
  const inicialName = {
    1: "3 años",
    2: "4 años",
    3: "5 años",
  };
  const NODE_ENV = process.env.NODE_ENV;

  try {
    const emailId = process.env.MAUTIC_ID_EMAIL_VACANT;
    const { idChildren } = req.params;
    const data = await FamilyRepository.getFamilyMembers(+idChildren);
    /**Migracion a SIGE */
    const token = await loginSIGE();

    /**Validar Si existe Familia en SIGE */
    const respVerifyFamilySIGE = await verifyFamilySIGE(
      data.person.lastname,
      data.person.mLastname,
      token
    );
    if (respVerifyFamilySIGE.result === 1) {
      const updateVacantStatus = await VacantRepository.updateVacant(
        data.vacant[0].id,
        { status: "2" }
      );
      /**Enviar email */
      const campus = sucursalMapping[updateVacantStatus.campus];
      const nivel = nivelMapping[updateVacantStatus.level];
      console.log(campus);
      const nomenclatura =
        updateVacantStatus.level == 1
          ? inicialName[updateVacantStatus.grade]
          : `${updateVacantStatus.grade}° grado`;

      const body = `Detalle Vacante: ${campus},  ${nomenclatura} - ${nivel}`;
      const contactId =
        NODE_ENV === "production" ? data.family.mainConyugue.mauticId : 5919;
      const respMAutic = await sendEmail(contactId, emailId, body);
      if (!respMAutic) {
        console.log(error);
        handleHttpError(res, "ERROR_MAUTIC_DONT_SEND_EMAIL");
        return;
      }
      handleHttpError(res, "Ya existe la familia en SIGE", 409);
      return;
    }

    /**Si no existe familia crea en sige */
    const nameFamily = data.person.lastname + " " + data.person.mLastname;
    /**Crear Familia SIGE */
    const respFamily = await createFamilySIGE(nameFamily, token);
    /**Crear Conyugue Principal SIGE */
    const respCreateMainConyugue = await createFamiliarsSIGE(
      respFamily.result.id_gpf,
      data.family.mainConyugue,
      token
    );
    /**Crear Conyugue SIGE */
    if (data.family.conyugue) {
      const respCreateConyugue = await createFamiliarsSIGE(
        respFamily.result.id_gpf,
        data.family.conyugue,
        token
      );
    }
    /**Crear Estudiante SIGE */
    const respCreateStudent = await createStudentSIGE(
      respFamily.result.id_gpf,
      data.person,
      token
    );
    /**Actualizar Vacante */
    const updateVacantStatus = await VacantRepository.updateVacant(
      data.vacant[0].id,
      { status: "1" }
    );
    /**Enviar email */
    const campus = sucursalMapping[updateVacantStatus.campus];
    const nivel = nivelMapping[updateVacantStatus.level];
    console.log(campus);
    console.log(emailId);
    const nomenclatura =
      updateVacantStatus.level == 1
        ? inicialName[updateVacantStatus.grade]
        : `${updateVacantStatus.grade}° grado`;

    const body = `Detalle Vacante: ${campus},  ${nomenclatura} - ${nivel}`;
    const contactId =
      NODE_ENV === "production" ? data.family.mainConyugue.mauticId : 5919;
    const respMAutic = await sendEmail(contactId, emailId, body);
    if (!respMAutic) {
      console.log(error);
      handleHttpError(res, "ERROR_MAUTIC_DONT_SEND_EMAIL");
      return;
    }

    res.status(201).json({
      success: true,
      data: {
        family: respFamily,
        mainConyugue: respCreateMainConyugue,
        // conyugue: respCreateConyugue,
        student: respCreateStudent,
        updateVacantStatus,
      },
    });
  } catch (error) {
    console.log(error);
    // handleHttpError(res, "ERROR_ASSIGN_FAMILY");
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
  assignVacant,
};
