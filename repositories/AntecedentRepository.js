import UserNotFoundError from "../errors/UserNotFoundError.js";
import prisma from "../utils/prisma.js";

class AntecedentRepository {
  async getAllAntecedent() {
    return prisma.background_assessment.findMany();
  }

  async getAntecedentByFamily(familyId) {
    return prisma.background_assessment.findFirst({
      where: {
        family_id: familyId,
      },
    });
  }

  async createAntecedent(data) {
    return prisma.background_assessment.create({
      data,
    });
  }
  async updateAntecedent(antecedentId, data) {
    return prisma.background_assessment.update({
      where: {
        id: antecedentId,
      },
      data,
    });
  }

  // Otros métodos relacionados con el repositorio de usuario
}

export default new AntecedentRepository();
