import { PrismaClient } from "@prisma/client";
import { handleHttpError } from "../utils/handleHttpError.js";
import { body, matchedData } from "express-validator";
import axios from "axios";
import VacantRepository from "../repositories/VacantRepository.js";
import { createUserCRM } from "../helpers/createUserCRM.js";
import { getLevel } from "../helpers/getLevel.js";
import { getGradeEd } from "../helpers/getGrade.js";

const prisma = new PrismaClient();

const store = async (req, res) => {
  try {
    const { user } = req;
    let body = matchedData(req);
    const id = parseInt(body.id);
    const person = await prisma.person.findUnique({
      where: {
        id: user.personId,
      },
    });
    const children = await prisma.person.findUnique({
      where: {
        id,
      },
      include: {
        children: true,
      },
    });
    if (!children) {
      handleHttpError(res, "NOT_EXIST_PERSON", 404);
      return;
    }
    if (!children.children[0]?.id) {
      handleHttpError(res, "NOT_EXIST_CHILDREN", 404);
      return;
    }
    const year = await prisma.year.findFirst({
      where: {
        status: true,
      },
      select: {
        id: true,
        name: true,
      },
    });
    const child = children.children[0];
    const existVacant = await prisma.vacant.findFirst({
      where: {
        children_id: child.id,
        AND: {
          year_id: year.id,
        },
      },
    });

    delete body.id;
    /**ENVIAR AL CRM */
    let personCRM = {
      id: person.id,
      doc_number: person.doc_number,
      email: person.email,
      names: person.name + " " + person.lastname + " " + person.mLastname,
      phone: person.phone,
      // level: person.level,
      // grade: person.grade,
      gender: person.gender,
      opportunity: "POSTULANDO",
      year: year.name,
    };

    if (existVacant) {
      /***Actualizamos */

      const updateVacant = await prisma.vacant.update({
        data: body,
        where: {
          id: existVacant.id,
        },
      });

      personCRM.level = getLevel(parseInt(updateVacant.level));
      personCRM.grade = getGradeEd(updateVacant.grade);

      const resp = await createUserCRM(personCRM);
      res.status(201).json({
        success: true,
        data: {
          id: updateVacant.id,
          resp,
        },
      });
      return;
    }
    body = { children_id: child.id, ...body };
    body.year_id = year.id;
    const createVacant = await prisma.vacant.create({
      data: body,
    });
    personCRM.level = getLevel(parseInt(createVacant.level));
    personCRM.grade = getGradeEd(createVacant.grade);
    const resp = await createUserCRM(personCRM);

    res.status(201).json({
      success: true,
      data: {
        id: createVacant.id,
      },
    });
  } catch (error) {
    console.log(error);
    handleHttpError(res, "ERROR_CREATE_VACANT");
  }
};

const get = async (req, res) => {
  try {
    req = matchedData(req);
    const id = parseInt(req.id);
    const children = await prisma.person.findUnique({
      where: {
        id,
      },
      include: {
        children: true,
      },
    });
    if (!children) {
      handleHttpError(res, "NOT_EXIST_PERSON", 404);
      return;
    }
    if (!children.children[0]?.id) {
      handleHttpError(res, "NOT_EXIST_CHILDREN", 404);
      return;
    }
    const child = children.children[0];
    const yearActive = await prisma.year.findFirst({
      where: {
        status: true,
      },
    });
    const vacant = await prisma.vacant.findFirst({
      where: {
        children_id: child.id,
        year_id: yearActive.id,
      },
      include: {
        year: true,
      },
    });
    const data = {
      id: vacant?.id,
      grade: vacant?.grade,
      level: vacant?.level,
      campus: vacant?.campus,
      year: vacant?.year,
      children_id: vacant?.children_id,
      validate: vacant?.validate,
    };
    res.status(200).json({
      success: true,
      data,
    });
  } catch (error) {
    console.log(error);
    handleHttpError(res, "ERROR_GET_CHILDREN");
  }
};

const getVacantAvailable = async (req, res) => {
  const loginUrl = process.env.SIGE_URL_LOGIN;
  const vacantUrl = process.env.SIGE_URL_VACANT;
  const user = process.env.SIGE_USER;
  const password = process.env.SIGE_PASSWORD;
  const formData = new FormData();

  formData.append("login", user);
  formData.append("password", password);
  try {
    const { id_suc, id_niv, id_gra } = req.body;

    const loginResponse = await axios.post(loginUrl, formData);
    const { data } = loginResponse;
    const token = data.result.token;
    const matriculaUrl = `${vacantUrl}?id_anio=8&id_suc=${
      id_suc || ""
    }&id_niv=${id_niv || ""}&id_gir=1&id_gra=${id_gra || ""}`;
    const matriculaResponse = await axios.get(matriculaUrl, {
      headers: {
        Authorization: `${token}`,
      },
    });
    const resp = matriculaResponse.data.result;
    if (!resp) {
      handleHttpError(res, "NOT_EXIST_VACANT", 404);
      return;
    }
    const resultData = resp.map((v) => {
      return {
        giro: v.giro,
        sucursal: v.sucursal,
        nivel: v.nivel,
        nom: v.nom,
        vacantes: v.vacantes > 0 ? true : false,
      };
    });
    // const token = loginResponse.data.token;
    res.status(200).json({
      success: true,
      data: resultData,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error:
        "Hubo un error al autenticarse o al obtener los datos de matrícula.",
    });
  }
};

const update = async (req, res) => {
  try {
    let body = matchedData(req);
    const id = parseInt(body.id);
    delete body.id;
    const updatedVacant = await VacantRepository.updateVacant(id, body);
    res.status(200).json({
      success: true,
      data: updatedVacant,
    });
  } catch (error) {
    if (error.code) {
      handleHttpError(res, error.meta.cause, 400);

      return;
    }
    handleHttpError(res, "ERROR_UPDATE_VACANT", 401);
    console.log(error);
  }
};
const createVacant = async (req, res) => {
  const { user } = req;
  try {
    req = matchedData(req);
    const dateNow = new Date();
    const year = await prisma.year.findFirst({
      where: {
        // dateStart: {
        //   lte: dateNow,
        // },
        // dateEnd: {
        //   gte: dateNow,
        // },
        status: true,
      },
    });
    if (!year) {
      handleHttpError(res, "No hay un proceso de admision para hoy", 404);
      return;
    }
    const existingVacant = await prisma.vacant.findMany({
      where: {
        children_id: req.children_id,
        year_id: year.id,
      },
    });
    if (existingVacant.length > 0) {
      handleHttpError(
        res,
        `Ya existe una solicitud de vacante vigente para el ${year.name}`,
        404
      );
      return;
    }

    const data = await VacantRepository.createVacant({
      campus: req.campus,
      level: req.level,
      grade: req.grade,
      children_id: req.children_id,
      year_id: year.id,
    });

    res.status(201).json({
      success: true,
      campus: req.campus,
      level: req.level,
      grade: req.grade,
      children_id: req.children_id,
      year_id: year.id,
      secretary: leastAssignedSecretaryId,
    });
  } catch (error) {
    console.log(error);
    handleHttpError(res, "ERROR_CREATE_VACANT");
  }
};
export { store, get, getVacantAvailable, update, createVacant };
