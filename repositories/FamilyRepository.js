import prisma from "../utils/prisma.js";

class FamilyRepository {
  async getFamilyById(id) {
    return prisma.family.findFirst({
      where: {
        id,
      },
    });
  }
  async update(id, data) {
    return prisma.family.update({
      where: {
        id,
      },
      data,
    });
  }
  async destroy(id) {
    return prisma.family.delete({
      where: {
        id,
      },
    });
  }
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

  async getFamiliesStatus() {
    return prisma.familiy_secretary.findMany({
      include: {
        family: {
          include: {
            psy_evaluation: true,
            economic_evaluation: true,
            background_assessment: true,
          },
        },
      },
    });
  }

  // Otros métodos relacionados con el repositorio de usuario
}

export default new FamilyRepository();
