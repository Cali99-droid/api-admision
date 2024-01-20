import { handleHttpError } from "../utils/handleHttpError.js";
import { matchedData } from "express-validator";
import RoleReporistory from "../repositories/RoleReporistory.js";
import prisma from "../utils/prisma.js";
const getAllRoles = async (req, res) => {
    try {
      const data = await RoleReporistory.getAllRoles();
      res.status(201).json({
        success: true,
        data,
      });
    } catch (error) {
      console.log(error);
      handleHttpError(res, "ERROR_GET_ROLES");
    }
};
const getRoleById = async (req, res) => {
    try {
      const idRole = parseInt(req.params.id);
      const data = await RoleReporistory.getRolesById(idRole);
      res.status(201).json({
        success: true,
        data,
      });
    } catch (error) {
      console.log(error);
      handleHttpError(res, "ERROR_GET_ROL");
    }
};
const createUserRole = async (req, res) => {
    try {
      req = matchedData(req);
      const existRol = await prisma.roles.findMany({
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
      const roleCreate = await RoleReporistory.createRole(req);
      res.status(201).json({
        success: true,
        data: roleCreate,
      });
    } catch (error) {
      console.log(error);
      handleHttpError(res, "ERROR_CREATE_ROLE");
    }
};
const updateUserRole = async (req, res) => {
    try {
      const idRole = parseInt(req.params.id);
      req = matchedData(req);
      const { id, ...data } = req;
      const roleUpdate = await RoleReporistory.updateRole(
        idRole,
        data
      );
      res.status(201).json({
        success: true,
        data: roleUpdate,
      });
    } catch (error) {
      console.log(error);
      handleHttpError(res, "ERROR_UPDATE_ROLE");
    }
};
export {
    getAllRoles,
    getRoleById,
    createUserRole,
    updateUserRole,
};