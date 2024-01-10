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
            children: true,
          },
        },
      },
      where: {
        status: 1,
      },
    });
  }
  async getVacant() {
    return prisma.children.findMany({
      include: {
        family: {
          include: {
            psy_evaluation: true,
            economic_evaluation: true,
            background_assessment: true,
            familiy_secretary: true,
            mainConyugue: {
              include: {
                person: true,
              },
            },
          },
        },
        vacant: true,
        person: true,
      },
    });
  }

  // Otros métodos relacionados con el repositorio de usuario
  async getFamilyMembers(idChildren) {
    return prisma.children.findUnique({
      where: {
        id: idChildren,
      },
      include: {
        person: true,
        vacant: true,
        family: {
          include: {
            mainConyugue: {
              include: {
                person: true,
              },
            },
            conyugue: {
              include: {
                person: true,
              },
            },
          },
        },
      },
    });
  }
}

export default new FamilyRepository();
