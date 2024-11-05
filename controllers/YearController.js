import { handleHttpError } from "../utils/handleHttpError.js";
import { matchedData } from "express-validator";
import YearReporistory from "../repositories/YearRepository.js";
import prisma from "../utils/prisma.js";
const getAllYears = async (req, res) => {
    try {
      const data = await YearReporistory.getAllYears();
      res.status(201).json({
        success: true,
        data,
      });
    } catch (error) {
      console.log(error);
      handleHttpError(res, "ERROR_GET_ROLES");
    }
};
const getYearById = async (req, res) => {
    try {
      const idYear = parseInt(req.params.id);
      const data = await YearReporistory.getYearById(idYear);
      res.status(201).json({
        success: true,
        data,
      });
    } catch (error) {
      console.log(error);
      handleHttpError(res, "ERROR_GET_ROL");
    }
};
const createYear = async (req, res) => {
    try {
      req = matchedData(req);
      const existingYearWithConflict = await prisma.year.findFirst({
        where: {
          OR: [
            {
              dateStart: {
                lte: req.dateEnd,
              },
              dateEnd: {
                gte: req.dateStart,
              },
            },
          ],
        },
      });
      if (existingYearWithConflict) {
        return res.status(400).json({
          success: false,
          message: `Las fechas proporcionadas chocan con el año ${existingYearWithConflict.name}`,
        });
      }
      const yearCreate = await YearReporistory.createYear(req);
      res.status(201).json({
        success: true,
        data: yearCreate,
      });
    } catch (error) {
      console.log(error);
      handleHttpError(res, "ERROR_CREATE_YEAR");
    }
};
const updateYear = async (req, res) => {
    try {
      const idYear = parseInt(req.params.id);
      req = matchedData(req);
      const existingYearWithConflict = await prisma.year.findFirst({
        where: {
          AND: [
            { id: { not: idYear } },
            {
              OR: [
                {
                  dateStart: {
                    lte: req.dateEnd,
                  },
                  dateEnd: {
                    gte: req.dateStart,
                  },
                },
              ],
            },
          ],
        },
      });
      if (existingYearWithConflict) {
        return res.status(400).json({
          success: false,
          message: `Las fechas proporcionadas chocan con el año ${existingYearWithConflict.name}`,
        });
      }
      const yearUpdate = await YearReporistory.updateYear(
        idYear,
        data
      );
      res.status(201).json({
        success: true,
        data: yearUpdate,
      });
    } catch (error) {
      console.log(error);
      handleHttpError(res, "ERROR_UPDATE_YEAR");
    }
};
const deleteYear = async (req, res) => {
  const { id } = req.params;

  await prisma.year.delete({
    where: { id: Number(id) },
  });

  res.status(200).json({
    success: true,
    message: `El año con ID ${id} ha sido eliminado correctamente`,
  });
};
export {
    getAllYears,
    getYearById,
    createYear,
    updateYear,
    deleteYear,
};