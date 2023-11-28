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

  // Otros métodos relacionados con el repositorio de usuario
}

export default new UserRoleRepository();
