import prisma from "../utils/prisma.js";

class RolePermissionsRepository {
  async getAllRolesPermissions() {
    return prisma.roles_permissions.findMany();
  }
  async getRolesPermissionsById(rolId) {
    return prisma.roles_permissions.findMany({
      where: {
        id: rolId,
      },
    });
  }
  async createRolePermissions(data) {
    return prisma.roles_permissions.create({
      data
    });
  }
  async updateRolePermissions(idRole,data) {
    return prisma.roles_permissions.update({
      where:{
        id:parseInt(idRole),
      },
      data,
    });
  }
}


export default new RolePermissionsRepository();