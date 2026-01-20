import AntecedentRepository from "../repositories/AntecedentRepository.js";
import { handleHttpError } from "../utils/handleHttpError.js";
import { matchedData } from "express-validator";
import prisma from "../utils/prisma.js";

const getAntecedent = async (req, res) => {
  try {
    const { familyId } = req.params;

    const yearActive = await prisma.year.findFirst({
      where: {
        status: true,
      },
    });

    const antecedent = await AntecedentRepository.getAntecedentByFamily(
      parseInt(familyId),
      yearActive.id
    );

    res.status(201).json({
      success: true,
      data: antecedent,
    });
  } catch (e) {
    console.log(e);
    handleHttpError(res, "ERROR_GET_ECONOMIC");
  }
};

const createAntecedent = async (req, res) => {
  try {
    req = matchedData(req);
    const data = req;

    const yearActive = await prisma.year.findFirst({
      where: {
        status: true,
      },
    });

    data.year_id = yearActive.id;
    const existAnt = await prisma.background_assessment.findFirst({
      where: {
        family_id: data.familyId,
        year_id: yearActive.id,
      },
    });
    if (existAnt) {
      res.status(400).json({
        success: false,
        message: "Ya existe una evaluación creada",
      });
    }

    const createAntecedent = await AntecedentRepository.createAntecedent(data);

    res.status(201).json({
      success: true,
      data: createAntecedent,
    });
  } catch (e) {
    console.log(e);
    handleHttpError(res, "ERROR_CREATE_ECONOMIC");
  }
};
const updateAntecedent = async (req, res) => {
  try {
    const { id } = req.params;
    req = matchedData(req);
    const data = req;

    const createAntecedent = await AntecedentRepository.updateAntecedent(
      +id,
      data
    );

    const vacants = await prisma.vacant.findMany({
      where: {
        children: {
          family_id: data.family_id,
        },
        status: "denied",
      },
    });
    if (vacants.length > 0) {
      await prisma.vacant.updateMany({
        where: {
          id: {
            in: vacants.map((v) => v.id),
          },
        },
        data: {
          status: "on_process",
        },
      });
    }

    res.status(201).json({
      success: true,
      data: createAntecedent,
    });
  } catch (e) {
    console.log(e);
    handleHttpError(res, "ERROR_UPDATE_ECONOMIC");
  }
};

export { getAntecedent, createAntecedent, updateAntecedent };
