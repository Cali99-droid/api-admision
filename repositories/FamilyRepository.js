import prisma from "../utils/prisma.js";

class FamilyRepository {
  async getFamiliesWithEvaluationsApproved() {
    return prisma.family.findMany({
      where: {
        psy_evaluation: {
          some: {
            approved: 1,
          },
        },
        economic_evaluation: {
          some: {
            conclusion: "apto",
          },
        },
        background_assessment: {
          some: {
            conclusion: "apto",
          },
        },
      },
      include: {
        psy_evaluation: true,
        economic_evaluation: true,
        background_assessment: true,
      },
    });
  }

  async getFamiliesWithEvaluationsStatus() {
    return prisma.family.findMany({
      where: {
        psy_evaluation: {
          some: {
            applied: 1,
          },
        },
        economic_evaluation: {
          some: {
            conclusion: {
              not: null,
            },
          },
        },
        background_assessment: {
          some: {
            conclusion: {
              not: null,
            },
          },
        },
      },
      include: {
        psy_evaluation: true,
        economic_evaluation: true,
        background_assessment: true,
      },
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

export default new FamilyRepository();
