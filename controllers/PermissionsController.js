import PermissionsRepository from "../repositories/PermissionsRepositoty.js";
const getAllPermissions = async (req, res) => {
    try {
      const data = await PermissionsRepository.getAllPermissions();
      res.status(201).json({
        success: true,
        data,
      });
    } catch (error) {
      console.log(error);
      handleHttpError(res, "ERROR_GET_ROLES");
    }
};
export {
    getAllPermissions,
};