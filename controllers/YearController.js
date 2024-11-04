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
      const existRol = await prisma.year.findMany({
        where: {
            rol: req.rol || '',
          },
      })
      if(existRol){
        res.status(400).json({
            success: false,
            message: `Ya existe el rol: ${req.rol}`,
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
      const { id, ...data } = req;
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
export {
    getAllYears,
    getYearById,
    createYear,
    updateYear,
};