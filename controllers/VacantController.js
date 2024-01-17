import { PrismaClient } from "@prisma/client";
import { handleHttpError } from "../utils/handleHttpError.js";
import { body, matchedData } from "express-validator";
import axios from "axios";
import VacantRepository from "../repositories/VacantRepository.js";

const prisma = new PrismaClient();

const store = async (req, res) => {
  try {
    let body = matchedData(req);
    const id = parseInt(body.id);

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
    const existVacant = await prisma.vacant.findFirst({
      where: {
        children_id: child.id,
      },
    });

    delete body.id;
    if (existVacant) {
      /***Actualizamos */

      const updateVacant = await prisma.vacant.update({
        data: body,
        where: {
          id: existVacant.id,
        },
      });
      res.status(201).json({
        success: true,
        data: {
          id: updateVacant.id,
        },
      });
      return;
    }
    body = { children_id: child.id, ...body };
    const createVacant = await prisma.vacant.create({
      data: body,
    });

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

    const vacant = await prisma.vacant.findFirst({
      where: {
        children_id: child.id,
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
export { store, get, getVacantAvailable, update };
