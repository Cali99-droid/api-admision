import { handleHttpError } from "../utils/handleHttpError.js";
import { matchedData } from "express-validator";
import SecretaryRepository from "../repositories/SecretaryRepository.js";
import PsychologyRepository from "../repositories/PsychologyRepository.js";
import UserRepository from "../repositories/UserRepository.js";
import UserRoleRepository from "../repositories/UserRoleRepository.js";
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
import client from "../utils/client.js";

const getAllUsers = async (req, res) => {
  try {
    const users = await UserRepository.getAllUsers();
    const data = users.map((u) => {
      return {
        id: u.id,
        doc_number: u.person.doc_number,
        name: u.person.name,
        lastname: u.person.lastname,
        mLastname: u.person.mLastname,
        date: u.email,
        phone: u.phone,
        create_time: u.create_time,
        mautic: u.mauticId,
        user_roles: u.user_roles,
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
const createUserRole = async (req, res) => {
  try {
    req = matchedData(req);
    const userRoleCreate = await UserRoleRepository.createUserRole(req);
    res.status(201).json({
      success: true,
      data: userRoleCreate,
    });
  } catch (error) {
    console.log(error);
    handleHttpError(res, "ERROR_CREATE_USER_ROLE");
  }
};
const updateUserRole = async (req, res) => {
  try {
    const idUserRole = parseInt(req.params.id);
    req = matchedData(req);
    const dateUpdate = new Date();
    req = { update_time: dateUpdate, ...req };
    const { id, ...data } = req;
    const userRoleUpdate = await UserRoleRepository.updateUserRole(
      idUserRole,
      data
    );
    res.status(201).json({
      success: true,
      data: userRoleUpdate,
    });
  } catch (error) {
    console.log(error);
    handleHttpError(res, "ERROR_UPDATE_USER_ROLE");
  }
};
const deleteUserRole = async (req, res) => {
  try {
    const idUserRole = parseInt(req.params.id);
    const userRoleDelete = await UserRoleRepository.deleteUserRole(idUserRole);
    res.status(201).json({
      success: true,
      data: userRoleDelete,
    });
  } catch (error) {
    console.log(error);
    handleHttpError(res, "ERROR_DELETE_USER_ROLE");
  }
};

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
    const format = await Promise.all(
      dat.map(async (f) => {
        // Destructure with default values
        const {
          vacant: [{ campus, level, grade } = {}] = [],
          schoolId,
          family,
          person,
        } = f;

        // Use filter directly in the function argument
        const getdataSIGE = dataSIGE.filter(
          (x) =>
            x.sucursal === parseInt(campus) &&
            x.nivel === parseInt(level) &&
            x.id_gra === parseInt(grade)
        );

        // Use conditional operator for schools assignment
        const school = schoolId
          ? await client.schools.findFirst({
              where: { id: schoolId },
              select: { cod_modular: true, name: true },
            })
          : null;

        return {
          id: f.id,
          idFamily: family.id,
          name: person.name,
          lastname: person.lastname,
          mLastname: person.mLastname,
          gender: person.gender,
          dni: person.doc_number,

          birthdate: person.birthdate,
          family: family.name,
          inscription: family.create_time,
          phone: family.mainConyugue.phone,
          email: family.mainConyugue.email,
          campus: parseInt(campus),
          level: parseInt(level),
          grade: parseInt(grade),
          vacants: campus === undefined ? 0 : getdataSIGE[0]?.vacantes || 0,
          secretary: family.familiy_secretary[0]?.status === 1 ? 1 : 2,
          economic:
            family.economic_evaluation[0]?.conclusion === "apto"
              ? 1
              : family.economic_evaluation.length > 0
              ? 2
              : 3,
          antecedent:
            family.background_assessment[0]?.conclusion === "apto"
              ? 1
              : family.background_assessment.length > 0
              ? 2
              : 3,
          psychology:
            family.psy_evaluation[0]?.applied === 0
              ? 3
              : family.psy_evaluation[0]?.approved || 0,
          status: f.vacant[0]?.status,

          dataParent: family.mainConyugue.person,
          school,
        };
      })
    );

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
    console.log("Respuesta al crear Familia SIGE");
    console.log(respFamily);
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
      console.log("Respuesta al crear Conyugue SIGE");
      console.log(respCreateConyugue);
    }
    /**Crear Estudiante SIGE */
    const respCreateStudent = await createStudentSIGE(
      respFamily.result.id_gpf,
      data.person,
      token
    );
    console.log("Respuesta al crear Estudiante SIGE");
    console.log(respCreateStudent);
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
      NODE_ENV === "production" ? data.family.mainConyugue.mauticId : 21;
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

const denyVacant = async (req, res) => {
  const NODE_ENV = process.env.NODE_ENV;
  const emailId = process.env.MAUTIC_ID_EMAIL_DENY_VACANT;
  try {
    const { idChildren } = req.params;
    const data = await FamilyRepository.getFamilyMembers(+idChildren);

    const updateVacant = await VacantRepository.updateVacant(
      data.vacant[0].id,
      { status: "3" }
    );
    const updatePsi = await prisma.psy_evaluation.updateMany({
      where: {
        family_id: data.family_id,
      },
      data: {
        applied: 3,
      },
    });
    /**Enviar email */
    const body =
      data.person.name +
      " " +
      data.person.lastname +
      " " +
      data.person.mLastname;
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
      updateVacant,
      updatePsi,
    });
  } catch (error) {
    handleHttpError(res, "ERROR_DENY_FAMILY");
    console.log(error);
  }
};

/**Script cambiar nombre de la familia */
const changeNameFamily = async (req, res) => {
  try {
    const familias = await prisma.family.findMany({
      include: {
        children: {
          include: {
            person: true,
          },
        },
      },
    });

    // Actualizar el nombre de la familia con los apellidos del hijo
    const actualizaciones = familias.map(async (familia) => {
      // .map((hijo) => hijo.person.lastname + " " + hijo.person.mLastname)
      // .join(" ");
      if (familia.children.length > 0) {
        const apellidosHijo =
          familia.children[0].person.lastname +
          " " +
          familia.children[0].person.mLastname;
        await prisma.family.update({
          where: { id: familia.id },
          data: { name: apellidosHijo.toLocaleUpperCase() },
        });
      }
    });

    await Promise.all(actualizaciones);

    res
      .status(200)
      .json({ message: "Nombres de familia actualizados correctamente" });
  } catch (error) {
    console.log(error);
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
  getStatusFamilies,
  getAllVacants,
  getFilterByLevelGrade,
  getStatistics,
  getStatusFamilyAndChildren,
  assignVacant,
  denyVacant,
  //sctipots
  changeNameFamily,
};
