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
      data: {
        ...data,
        status: 1,
      },
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
  async deleteUserRole(idUserRole) {
    return prisma.user_roles.update({
      where:{
        id:parseInt(idUserRole),
      },
      data:{status:0},
    });
  }
  // Otros métodos relacionados con el repositorio de usuario
}

export default new UserRoleRepository();
