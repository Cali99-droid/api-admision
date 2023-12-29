import prisma from "../utils/prisma.js";

class UserRoleRepository {
  async getAllUsers() {
    return prisma.user.findMany();
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
        id:idUserRole,
      },
      data,
    });
  }
  // Otros métodos relacionados con el repositorio de usuario
}

export default new UserRoleRepository();
