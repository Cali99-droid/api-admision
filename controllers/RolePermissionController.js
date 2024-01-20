import { handleHttpError } from "../utils/handleHttpError.js";
import { matchedData } from "express-validator";
import RolesPermissionRepository from "../repositories/RolesPermissionRepository.js";
import prisma from "../utils/prisma.js";
const getAllRolesPermissions = async (req, res) => {
    try {
      const data = await RolesPermissionRepository.getAllRolesPermissions();
      res.status(201).json({
        success: true,
        data,
      });
    } catch (error) {
      console.log(error);
      handleHttpError(res, "ERROR_GET_ROLES_PERMISSIONS");
    }
};
const getRolesPermissionsById = async (req, res) => {
    try {
      const idRole = parseInt(req.params.id);
      const data = await RolesPermissionRepository.getRolesPermissionsById(idRole);
      res.status(201).json({
        success: true,
        data,
      });
    } catch (error) {
      console.log(error);
      handleHttpError(res, "ERROR_GET_ROL_PERMISSIONS");
    }
};
const createRolePermissions = async (req, res) => {
    try {
      req = matchedData(req);
      const roleCreate = await RolesPermissionRepository.createRolePermissions(req);
      res.status(201).json({
        success: true,
        data: roleCreate,
      });
    } catch (error) {
      console.log(error);
      handleHttpError(res, "ERROR_CREATE_ROLE_PERMISSIONS");
    }
};
const updateRolePermissions = async (req, res) => {
    try {
      const idRole = parseInt(req.params.id);
      req = matchedData(req);
      const dateUpdate = new Date();
      req = { update_time: dateUpdate, ...req };
      const { id, ...data } = req;
      const rolePermissionUpdate = await RolesPermissionRepository.updateRolePermissions(
        idRole,
        data
      );
      res.status(201).json({
        success: true,
        data: rolePermissionUpdate,
      });
    } catch (error) {
      console.log(error);
      handleHttpError(res, "ERROR_UPDATE_ROLE_PERMISSIONS");
    }
};
export {
    getAllRolesPermissions,
    getRolesPermissionsById,
    createRolePermissions,
    updateRolePermissions,
};