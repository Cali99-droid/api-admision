import UserNotFoundError from "../errors/UserNotFoundError.js";
import prisma from "../utils/prisma.js";

class UserRepository {
  async getAllUsers() {
    return prisma.user.findMany();
  }

  async getUserById(userId) {
    return prisma.user.findUnique({
      where: {
        id: userId,
      },
    });
  }
  async getUserByEmail(email) {
    return prisma.user.findUnique({
      where: {
        email,
      },
    });
  }
  async getUserByEmailErrorTest(email) {
    const user = prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (!user) {
      throw new UserNotFoundError(`Person with ID ${email} not found`);
    }
    return user;
  }
  async getUserByToken(token) {
    return prisma.user.findFirst({
      where: {
        token,
      },
    });
  }
  async getUsersByRole(role) {
    return prisma.user_roles.findMany({
      where: {
        roles_id: role,
      },
      select: {
        user: {
          select: {
            id: true,
            person: true,
          },
        },
      },
    });
  }
  async getUserByPhone(phone) {
    return prisma.user.findFirst({
      where: {
        phone,
      },
    });
  }
  async getUserPermission(id) {
    return prisma.auth.findMany({
      where: {
        user_id: id,
      },
    });
  }
  async createUser(data) {
    return prisma.user.create({
      data,
    });
  }
  async updateUser(userId, data) {
    return prisma.user.update({
      where: {
        id: userId,
      },
      data,
    });
  }

  // Otros métodos relacionados con el repositorio de usuario
}

export default new UserRepository();
