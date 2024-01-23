import prisma from "../utils/prisma.js";

class PermissionsRepository {
  async getAllPermissions() {
    return prisma.permissions.findMany();
  }
}


export default new PermissionsRepository();