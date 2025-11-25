import express from "express";
import {
  assignRole,
  deleteRole,
  getAllRoles,
  getDetailUser,
  getUsersByRoleName,
  getUsersKy,
} from "../controllers/UserController.js";

const router = express.Router();

router.get("/", getUsersKy);
router.get("/:userId/list-roles", getDetailUser);
router.get("/role/:roleName", getUsersByRoleName);
router.get("/roles", getAllRoles);
router.post("/:userId/add-role", assignRole);
router.delete("/:userId/delete-role", deleteRole);

export default router;
