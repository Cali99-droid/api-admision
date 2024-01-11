import UserNotFoundError from "../errors/UserNotFoundError.js";
import prisma from "../utils/prisma.js";

class VacantRepository {
  async getAllVacants() {
    return prisma.vacant.findMany({
      include: {
        children: {
          include: {
            person: true,
            family: true,
          },
        },
      },
    });
  }

  async getUserByGradeAndNivel(level, grade) {
    return prisma.vacant.findMany({
      where: {
        level,
        AND: {
          grade,
        },
      },
      include: {
        children: {
          include: {
            person: true,
            family: true,
          },
        },
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

  async createUser(data) {
    return prisma.user.create({
      data,
    });
  }
  async updateVacant(vacantId, data) {
    return prisma.vacant.update({
      where: {
        id: vacantId,
      },
      data,
    });
  }

  // Otros métodos relacionados con el repositorio de usuario
}

export default new VacantRepository();
