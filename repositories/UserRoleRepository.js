import prisma from "../utils/prisma.js";

class UserRoleRepository {
  async getAllUsersRoles() {
    return prisma.user_roles.findMany();
  }
  //commmit
  async getUserRolesByUser(userId) {
    return prisma.user_roles.findMany({
      where: {
        user_id: userId,
      },
    });
  }
  async createUserRole(data) {
    return prisma.user_roles.create({
      data,
    });
  }
  async updateUserRole(idUserRole,data) {
    return prisma.user_roles.update({
      where:{
        id:parseInt(idUserRole),
      },
      data,
    });
  }
  // Otros métodos relacionados con el repositorio de usuario
}

export default new UserRoleRepository();
