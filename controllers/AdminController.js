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
import { getUsersByRole } from "../helpers/getUsersKeycloakByRealmRole.js";
import axios from "axios";
import { deliverEmail } from "../helpers/sendEmailSES.js";
import loggerStream from "../utils/handleLogger.js";
import { getUser } from "./UserController.js";

const getAllUsers = async (req, res) => {
  try {
    // const data = users.map((u) => {
    //   return {
    //     id: u.id,
    //     doc_number: u.person.doc_number,
    //     name:
    //       u.person.lastname + " " + u.person.mLastname + " " + u.person.name,
    //     date: u.email,
    //     phone: u.phone,
    //     create_time: u.create_time,
    //     mautic: u.mauticId,
    //     userRolId: u.user_roles[0]?.id || null,
    //     rolId: u.user_roles[0]?.roles.id || null,
    //     rol: u.user_roles[0]?.roles.rol || null,
    //     status: u.user_roles[0]?.status || null,
    //     permissions: u.auth,
    //   };
    // });
    res.status(201).json({
      success: true,
      data: {
        status: "ok",
      },
    });
  } catch (error) {
    console.log(error);
    handleHttpError(res, "ERROR_GET_USERS");
  }
};
const createUserRole = async (req, res) => {
  try {
    req = matchedData(req);
    const { permissions = [], ...rest } = req;
    const userRoleCreate = await UserRoleRepository.createUserRole(rest);
    /**actualizar permisisos */

    if (rest.roles_id === 2) {
      const deletedPermissions = await prisma.auth.deleteMany({
        where: {
          user_id: userRoleCreate.user_id,
        },
      });
      console.log(deletedPermissions);
      const user_id = userRoleCreate.user_id;

      const data = permissions.map((perm) => ({
        name: perm,
        user_id,
      }));
      console.log(data);
      const insert = await prisma.auth.createMany({
        data,
      });
      console.log(insert);
    }
    res.status(201).json({
      success: true,
      data: { userRoleCreate },
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
    const { permissions = [], ...rest } = req;
    console.log(permissions);
    // console.log(req);
    const dateUpdate = new Date();
    req = { update_time: dateUpdate, ...rest };
    const { id, ...data } = rest;
    const userRoleUpdate = await UserRoleRepository.updateUserRole(
      idUserRole,
      data
    );
    /**actualizar permisisos */
    if (req.roles_id === 2) {
      const deletedPermissions = await prisma.auth.deleteMany({
        where: {
          user_id: userRoleUpdate.user_id,
        },
      });
      const user_id = userRoleUpdate.user_id;

      const data = permissions.map((perm) => ({
        name: perm,
        user_id,
      }));

      const insert = await prisma.auth.createMany({
        data,
      });
    }
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
  let yearId;
  const yearIdQuery = req.query.yearId;
  const yearActive = await prisma.year.findFirst({
    where: {
      status: true,
    },
  });

  yearId = yearIdQuery ? parseInt(yearIdQuery) : yearActive.id;
  try {
    const asignaments = await SecretaryRepository.getAssignments(yearId);

    const data = asignaments.map((a) => {
      return {
        id: a.family.id,
        name: a.family.name,
        email: a.family.person_family_parent_oneToperson.email,
        phone: a.family.person_family_parent_oneToperson.phone,
        nameParent:
          a.family.person_family_parent_oneToperson.lastname +
          " " +
          a.family.person_family_parent_oneToperson.mLastname +
          " " +
          a.family.person_family_parent_oneToperson.name,
        count_children: a.family.children.length,
        vacants: a.family.children.map((v) => {
          return v.vacant[0];
        }),
        status: a.status,
        agent: a.user.person.name,
        register_date: a.family.create_time,
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
  let yearId;
  const yearIdQuery = req.query.yearId;

  const yearActive = await prisma.year.findFirst({
    where: {
      status: true,
    },
  });

  yearId = yearIdQuery ? parseInt(yearIdQuery) : yearActive.id;
  try {
    const asignaments = await PsychologyRepository.getAssignments(yearId);
    const data = asignaments.map((a) => {
      return {
        id: a.family.id,
        name: a.family.name,
        email: a.family.person_family_parent_oneToperson.email,
        phone: a.family.person_family_parent_oneToperson.phone,
        nameParent:
          a.family.person_family_parent_oneToperson.lastname +
          " " +
          a.family.person_family_parent_oneToperson.mLastname +
          " " +
          a.family.person_family_parent_oneToperson.name,
        count_children: a.family.children.length,
        vacants: a.family.children.map((vacant) => vacant.vacant[0]),
        applied: a.applied,
        approved: a.applied === 0 ? 3 : a.approved,
        agent: a.user.person.name,
        register_date: a.family.create_time,
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
    const secretariesKey = await getUsersByRole("secretaria");
    const ids = secretariesKey.map((s) => s.id);
    const secretaries = await prisma.user.findMany({
      where: {
        sub: {
          in: ids,
        },
      },
      select: {
        id: true,
        person: true,
      },
    });

    const data = secretaries.map((user) => {
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
    handleHttpError(res, "ERR_GET_SECRETARY");
  }
};
const getPsychologists = async (req, res) => {
  try {
    const psyKey = await getUsersByRole("psicologia");
    const ids = psyKey.map((s) => s.id);
    const psy = await prisma.user.findMany({
      where: {
        sub: {
          in: ids,
        },
      },
      select: {
        id: true,
        person: true,
      },
    });

    const data = psy.map((user) => {
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
    let yearId;
    const yearIdQuery = req.query.yearId;
    const yearActive = await prisma.year.findFirst({
      where: {
        status: true,
      },
    });

    yearId = yearIdQuery ? parseInt(yearIdQuery) : yearActive.id;
    const families = await FamilyRepository.getFamiliesWithEvaluationsApproved(
      yearId
    );

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

const getStatusFamilyByUser = async (req, res) => {
  const { email } = req.params;

  try {
    const userKy = await getUser(email);
    if (!userKy) {
      return res.status(200).json({
        status: "Registro ",
        description: "Email no registrado en el sistema",
        agent: "",
      });
    }

    // 1. Verificar si el usuario existe
    const user = await prisma.user.findUnique({
      where: { sub: userKy.id },
      include: {
        person: true,
      },
    });

    if (!user) {
      return res.status(200).json({
        status: "Registro (Email Pendiente)",
        description:
          "La familia se registró, pero aún no validó el correo electrónico.",
        agent: "",
      });
    }

    // 2. Buscar familia asociada al usuario
    const family = await prisma.family.findFirst({
      where: {
        OR: [{ parent_one: user.person.id }, { parent_two: user.person.id }],
      },
      include: {
        children: {
          include: {
            vacant: {
              orderBy: { create_time: "desc" },
            },
          },
        },
        familiy_secretary: {
          include: {
            user: {
              include: {
                person: true,
              },
            },
          },
        },
        psy_evaluation: {
          orderBy: { create_time: "desc" },
        },
        economic_evaluation: {
          orderBy: { create_time: "desc" },
        },
        background_assessment: {
          orderBy: { create_time: "desc" },
        },
      },
    });

    if (!family) {
      return res.status(200).json({
        status: "Cuenta Activa (Sin Familia)",
        description: "Inició sesión, pero no creó la unidad familiar.",
        agent: family.familiy_secretary[0].user.person.name,
      });
    }

    // 3. Verificar si tiene hijos
    if (!family.children || family.children.length === 0) {
      return res.status(200).json({
        status: "Familia Creada (Sin Postulantes)",
        description:
          "La familia está creada, pero no han registrado ningún hijo postulante.",
        agent: family.familiy_secretary[0].user.person.name,
      });
    }

    // 4. Verificar si los hijos tienen vacantes solicitadas
    const hasVacants = family.children.some(
      (child) => child.vacant && child.vacant.length > 0
    );
    if (!hasVacants) {
      return res.status(200).json({
        status: "Postulante Registrado (Sin Nivel/Grado)",
        description:
          "Crearon al hijo, pero no indicaron nivel ni grado al que postula.",
        agent: family.familiy_secretary[0].user.person.name,
      });
    }

    // 5. Verificar el estado de las vacantes
    const latestVacant = family.children
      .flatMap((child) => child.vacant)
      .sort((a, b) => new Date(b.create_time) - new Date(a.create_time))[0];

    // Verificar si fue aceptado o rechazado
    if (latestVacant.status === "accepted") {
      //TODO **comunicar con COLEGIO */
      return res.status(200).json({
        status: "Vacante Otorgada",
        description: "La familia obtuvo la vacante y pasa a reserva.",
        agent: family.familiy_secretary[0].user.person.name,
      });
    }

    if (latestVacant.status === "rejected") {
      return res.status(200).json({
        status: "Sin Vacante",
        description: "La familia no obtiene vacante",
        agent: family.familiy_secretary[0].user.person.name,
      });
    }

    // 6. Verificar evaluaciones
    const latestPsyEvaluation = family.psy_evaluation[0];
    const latestEconomicEvaluation = family.economic_evaluation[0];
    const latestBackgroundAssessment = family.background_assessment[0];
    const latestSecretaryValidation = family.familiy_secretary[0];

    // Evaluación psicológica
    if (latestPsyEvaluation) {
      if (latestPsyEvaluation.approved === 1) {
        // Verificar evaluación económica
        if (
          latestEconomicEvaluation &&
          latestEconomicEvaluation.conclusion === "apto"
        ) {
          // Verificar evaluación de antecedentes
          if (
            latestBackgroundAssessment &&
            latestBackgroundAssessment.conclusion === "apto"
          ) {
            return res.status(200).json({
              status: "Evaluaciones completas",
              description: "en espera de asignación vacante",
              agent: family.familiy_secretary[0].user.person.name,
            });
          }
          return res.status(200).json({
            status: " Evaluaciones en Proceso",
            description: "evaluado por psicología y economía ",
            agent: family.familiy_secretary[0].user.person.name,
          });
        }
        return res.status(200).json({
          status: "Evaluaciones en Proceso",
          description: "evaluado por psicología, en evaluación económica ",
          agent: family.familiy_secretary[0].user.person.name,
        });
      } else if (latestPsyEvaluation.approved === 2) {
        return res.status(200).json({
          status: "Evaluación Psicologica Aplicada",
          description:
            "no paso evaluacion Psicologica, en evaluación economica",
          family: family.familiy_secretary[0].user.person.name,
        });
      } else if (latestPsyEvaluation.applied === 1) {
        return res.status(200).json({
          status: "Evaluación Psicologica Aplicada",
          description: "en espera de resultado",
          agent: family.familiy_secretary[0].user.person.name,
        });
      } else if (latestPsyEvaluation.applied === 0) {
        return res.status(200).json({
          status: "Evaluación Psicologica Pendiente",
          description: "en espera de envaluacion psicologica",
          agent: family.familiy_secretary[0].user.person.name,
        });
      }
    } else {
      return res.status(200).json({
        status: "Evaluación Psicologica Pendiente",
        description: "en espera de envaluacion psicologica",
        agent: family.familiy_secretary[0].user.person.name,
      });
    }

    // Validación de secretaría
    if (latestSecretaryValidation && latestSecretaryValidation.status === 1) {
      return res.status(200).json({
        status: "Postulación Validada",
        description:
          "Secretaría aprobó la documentación y el expediente está listo para evaluaciones.",
        agent: family.familiy_secretary[0].user.person.name,
      });
    }

    // 7. Si llegó aquí, tiene vacante solicitada pero no ha sido validada
    return res.status(200).json({
      status: "Postulación Enviada (Revisión Secretaría)",
      description:
        "Formularios completos; pendiente de revisión por Secretaría.",
      agent: family.familiy_secretary[0].user.person.name,
    });
  } catch (error) {
    console.error("Error in getStatusFamilyByUser:", error);
    return res.status(400).json({ status: "error al procesar la solicitud" });
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
  let yearId;
  const yearIdQuery = req.query.yearId;
  const yearActive = await prisma.year.findFirst({
    where: {
      status: true,
    },
  });

  if (yearIdQuery) {
    yearId = parseInt(yearIdQuery);
  } else {
    yearId = yearActive.id;
  }
  try {
    const vacants = await VacantRepository.getAllVacants(yearId);
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
  let yearId;
  const yearIdQuery = req.query.yearId;
  const yearActive = await prisma.year.findFirst({
    where: {
      status: true,
    },
  });
  console.log(yearActive);
  yearId = yearIdQuery ? parseInt(yearIdQuery) : yearActive.id;
  console.log("EL yYEAR ID", yearId);
  try {
    const families = await FamilyRepository.getVacant(yearId);

    const dat = families.filter(
      (f) => f.family.familiy_secretary[0]?.status === 1
    );

    // Optimización 1: Extraer combinaciones únicas de grade/campus para consultas batch
    const uniqueGradeCampus = new Set();
    const schoolIds = new Set();

    dat.forEach((f) => {
      const { vacant: [{ campus, grade } = {}] = [], schoolId } = f;
      if (grade && campus) {
        uniqueGradeCampus.add(`${grade}-${campus}`);
      }
      if (schoolId) {
        schoolIds.add(schoolId);
      }
    });

    // Optimización 2: Hacer consultas batch en paralelo
    const [vacantsAcceptedByGradeCampus, vacantsBySIGE, schoolsData] =
      await Promise.all([
        // Consulta única para vacantes aceptadas
        prisma.vacant.findMany({
          where: {
            status: "accepted",
            year_id: yearId,
          },
          select: {
            grade: true,
            campus: true,
          },
        }),
        // Consultas SIGE en paralelo
        Promise.all(
          Array.from(uniqueGradeCampus).map(async (key) => {
            const [gradeId, campus] = key.split("-");
            try {
              const vacantMat = await hasVacant(gradeId, campus);
              return { key, vacants: vacantMat.vacants };
            } catch (error) {
              console.error(`Error fetching SIGE data for ${key}:`, error);
              return { key, vacants: 0 };
            }
          })
        ),
        // Consulta única para todas las escuelas
        schoolIds.size > 0
          ? client.schools_new.findMany({
              where: { id: { in: Array.from(schoolIds) } },
              select: { id: true, cod_modular: true, name: true },
            })
          : Promise.resolve([]),
      ]);

    // Optimización 3: Crear mapas para búsqueda O(1)
    const vacantsAcceptedMap = {};
    vacantsAcceptedByGradeCampus.forEach((v) => {
      const key = `${v.grade}-${v.campus}`;
      vacantsAcceptedMap[key] = (vacantsAcceptedMap[key] || 0) + 1;
    });

    const vacantsSIGEMap = {};
    vacantsBySIGE.forEach(({ key, vacants }) => {
      vacantsSIGEMap[key] = vacants;
    });

    const schoolsMap = {};
    schoolsData.forEach((school) => {
      schoolsMap[school.id] = school;
    });

    // Optimización 4: Mapeo sin consultas adicionales
    const format = dat.map((f) => {
      // Destructure with default values
      const {
        vacant: [{ id, campus, level, grade } = {}] = [],
        schoolId,
        family,
        person,
      } = f;

      const gradeCampusKey = `${grade}-${campus}`;
      const vacants = grade ? vacantsSIGEMap[gradeCampusKey] || 0 : 0;
      const awarded = vacantsAcceptedMap[gradeCampusKey] || 0;
      const school = schoolId ? schoolsMap[schoolId] || null : null;

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
        phone: family.person_family_parent_oneToperson.phone,
        email: family.person_family_parent_oneToperson.email,
        vacantId: id,
        campus: parseInt(campus),
        level: parseInt(level),
        grade: parseInt(grade),
        vacants: vacants,
        awarded: awarded,
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

        dataParent: family.person_family_parent_oneToperson,
        school,
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

const hasVacant = async (gradeId, campus) => {
  const matriculaUrl = `${process.env.APP_AE_URL}/enrollment/vacants/17/grade/${gradeId}/campus/${campus}`;
  const matriculaResponse = await axios.get(matriculaUrl);
  return matriculaResponse.data;
};

const assignVacant = async (req, res) => {
  const { idChildren } = req.params;
  const data = await FamilyRepository.getFamilyMembers(+idChildren);
  const updateVacantStatus = await VacantRepository.updateVacant(
    data.vacant[0].id,
    { status: "accepted", update_time: new Date() }
  );

  let parent = null;
  if (data.family.person_family_parent_oneToperson.email) {
    parent = data.family.person_family_parent_oneToperson;
  } else {
    if (data.family.person_family_parent_twoToperson) {
      parent = data.family.person_family_parent_twoToperson;
    } else {
      console.log("no hay email de contacto");
    }
  }

  if (parent) {
    const name = parent.name + " " + parent.lastname + " " + parent.mLastname;
    const childName =
      data.person.name +
      " " +
      data.person.lastname +
      " " +
      data.person.mLastname;
    const body = {
      docNumber: data.person.doc_number,
    };
    const response = await axios.post(
      `${process.env.APP_AE_URL}/enrollment/new`,
      body
    );
    console.log("succesfully migrate, child", data.person.doc_number);
    if (process.env.NODE_ENV !== "development") {
      console.log("enviando email prod");
      const ress = await deliverEmail(parent.email, name, childName, true);
    } else {
      console.log("enviando email desarrollo");
      const ress = await deliverEmail(
        "carlosjhardel4@gmail.com",
        name,
        childName,
        true
      );
    }
  }

  return res.status(201).json({
    success: true,
    data: updateVacantStatus,
    msg: `succesfully migrate, child: ${data.person.doc_number}`,
  });
};

const denyVacant = async (req, res) => {
  const { idChildren } = req.params;
  const data = await FamilyRepository.getFamilyMembers(+idChildren);
  const updateVacantStatus = await VacantRepository.updateVacant(
    data.vacant[0].id,
    { status: "denied", update_time: new Date() }
  );

  let parent = null;
  if (data.family.person_family_parent_oneToperson.email) {
    parent = data.family.person_family_parent_oneToperson;
  } else {
    if (data.family.person_family_parent_twoToperson) {
      parent = data.family.person_family_parent_twoToperson;
    } else {
      console.log("no hay email de contacto");
    }
  }

  if (parent) {
    const name = parent.name + " " + parent.lastname + " " + parent.mLastname;
    const childName =
      data.person.name +
      " " +
      data.person.lastname +
      " " +
      data.person.mLastname;
    if (process.env.NODE_ENV === "production") {
      console.log("enviando email prod deny");
      const ress = deliverEmail(parent.email, name, childName, false);
    } else {
      console.log("enviando email desarrollo deny");
      const ress = deliverEmail(
        "carlosjhardel4@gmail.com",
        name,
        childName,
        false
      );
    }
  }

  return res.status(201).json({
    success: true,
    data: updateVacantStatus,
  });
};

const getStudentByDocNumber = async (req, res) => {
  try {
    req = matchedData(req);
    const { docNumber } = req;

    /**TODO Agregar condicional año */
    const person = await prisma.person.findFirst({
      where: {
        doc_number: docNumber,
      },
    });

    if (!person) {
      return handleHttpError(res, "No existe esta persona", 404);
    }

    /**TODO agregar consulta por año */
    const children = await prisma.children.findFirst({
      where: {
        person_id: person.id,
      },
      include: {
        vacant: {
          where: {
            status: "accepted",
          },
        },
      },
    });
    console.log(children);
    if (!children) {
      return handleHttpError(res, "No existe postulante", 404);
    }

    if (children.vacant.length === 0) {
      return handleHttpError(
        res,
        "Postulante no apto a vacante",
        403,
        children.id
      );
    }

    const family = await FamilyRepository.getFamilyMembers(+children.id);

    let school = {
      name: "no information",
      cod_modular: "no information",
    };

    if (children.schoolId) {
      school = await client.schools_new.findUnique({
        select: {
          id: true,
          ubigean: true,
          name: true,
          level: true,
          cod_modular: true,
        },
        where: {
          id: children.schoolId,
        },
      });
    }

    family.school = school;

    return res.status(201).json({
      success: true,
      data: formatFamilyData(family),
    });
  } catch (error) {
    console.log(error);
    return handleHttpError(res, "Error en la consulta", 500);
  }
};

const formatFamilyData = (data) => {
  if (!data) return null;
  /**TODO cambiar */
  // Extraer la información principal del niño (child)
  const child = {
    id: data.id,
    name: data.person.name,
    lastname: data.person.lastname,
    mLastname: data.person.mLastname,
    doc_number: data.person.doc_number,
    birthdate: data.person.birthdate,
    gender: data.person.gender,
    type_doc: data.person.type_doc,
    grade: data.vacant[0].grade,
    campus: data.vacant[0].campus,
    level: data.level,
    schoolId: data.schoolId,
    district_id: data.district_id,
    doc: data.doc,
    validate: data.validate,
    validateSchool: data.validateSchool,
    vacant: data.vacant[0],
    school: data.school.name,
    modularCode: data.school.cod_modular,
  };

  // Extraer la información de los padres (parents)
  const parents = [];
  if (data.family.person_family_parent_oneToperson) {
    parents.push({
      id: data.family.person_family_parent_oneToperson.id,
      name: data.family.person_family_parent_oneToperson.name,
      lastname: data.family.person_family_parent_oneToperson.lastname,
      mLastname: data.family.person_family_parent_oneToperson.mLastname,
      doc_number: data.family.person_family_parent_oneToperson.doc_number,
      birthdate: data.family.person_family_parent_oneToperson.birthdate,
      civil_status: data.family.person_family_parent_oneToperson.civil_status,
      profession: data.family.person_family_parent_oneToperson.profession,
      phone: data.family.person_family_parent_oneToperson.phone,
      type_doc: data.family.person_family_parent_oneToperson.type_doc,
      role: data.family.person_family_parent_oneToperson.role,
      email: data.family.person_family_parent_oneToperson.email,
    });
  }

  if (data.family.person_family_parent_twoToperson) {
    parents.push({
      id: data.family.person_family_parent_twoToperson.id,
      name: data.family.person_family_parent_twoToperson.name,
      lastname: data.family.person_family_parent_twoToperson.lastname,
      mLastname: data.family.person_family_parent_twoToperson.mLastname,
      doc_number: data.family.person_family_parent_twoToperson.doc_number,
      birthdate: data.family.person_family_parent_twoToperson.birthdate,
      civil_status: data.family.person_family_parent_twoToperson.civil_status,
      profession: data.family.person_family_parent_twoToperson.profession,
      phone: data.family.person_family_parent_twoToperson.phone,
      type_doc: data.family.person_family_parent_twoToperson.type_doc,
      role: data.family.person_family_parent_twoToperson.role,
      email: data.family.person_family_parent_twoToperson.email,
    });
  }

  return { child, parents };
};

const migrateAptToApp = async (req, res) => {
  const children = await prisma.children.findMany({
    where: {
      vacant: {
        some: {
          status: "accepted",
        },
      },
    },
  });

  try {
    for (const child of children) {
      const family = await FamilyRepository.getFamilyMembers(+child.id);
      console.log("init migrate, child", family.person.doc_number);
      const body = {
        docNumber: family.person.doc_number,
      };
      const response = await axios.post(
        `${process.env.APP_AE_URL}/enrollment/new`,
        body
      );
      console.log("succesfully migrate, child", family.person.doc_number);
    }
    return res.status(201).json({
      success: true,
      data: [],
    });
  } catch (error) {
    console.log(error.response?.data?.errors || error.message);
    console.log(error.response?.data);
    handleHttpError(res, `error al migrar `, 500);
  }
};

const assignDELVacant = async (req, res) => {
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
    handleHttpError(res, "ERROR_ASSIGN_FAMILY");
  }
};

const denyDELVacant = async (req, res) => {
  const NODE_ENV = process.env.NODE_ENV;
  const emailId = process.env.MAUTIC_ID_EMAIL_DENY_VACANT;
  try {
    const { idChildren } = req.params;
    const data = await FamilyRepository.getFamilyMembers(+idChildren);
    let updateVacant = null;
    console.log(data.vacant);
    if (data.vacant[0]?.id) {
      updateVacant = await VacantRepository.updateVacant(data.vacant[0].id, {
        status: "3",
      });
    }

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
  getStudentByDocNumber,
  //sctipots
  changeNameFamily,
  migrateAptToApp,
  getStatusFamilyByUser,
};
