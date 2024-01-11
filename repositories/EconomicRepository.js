import UserNotFoundError from "../errors/UserNotFoundError.js";
import prisma from "../utils/prisma.js";

class EconomicRepository {
  async get(id) {
    return prisma.economic_evaluation.findUnique({
      where: {
        id,
      },
    });
  }
  async getAllEconomic() {
    return prisma.economic_evaluation.findMany();
  }

  async getEconomicByFamily(familyId) {
    return prisma.economic_evaluation.findFirst({
      where: {
        family_id: familyId,
      },
    });
  }

  async createEconomic(data) {
    return prisma.economic_evaluation.create({
      data,
    });
  }
  async updateEconomic(economicId, data) {
    const update_time = new Date();

    data = { ...data, update_time };
    return prisma.economic_evaluation.update({
      where: {
        id: economicId,
      },
      data,
    });
  }

  // Otros métodos relacionados con el repositorio de usuario
}

export default new EconomicRepository();
