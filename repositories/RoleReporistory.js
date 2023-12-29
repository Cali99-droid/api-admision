import prisma from "../utils/prisma.js";

class RoleRepository {
  async getAllRoles() {
    return prisma.roles.findMany();
  }
  async getRolesById(rolId) {
    return prisma.roles.findMany({
      where: {
        id: rolId,
      },
    });
  }
}


export default new RoleRepository();