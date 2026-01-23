import prisma from "../utils/prisma.js";

class FamilyRepository {
  async getFamilyById(id) {
    return prisma.family.findFirst({
      where: {
        id,
      },
      include: {
        children: true,
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
  async getFamiliesWithEvaluationsApproved(yearId) {
    return prisma.family.findMany({
      where: {
        psy_evaluation: {
          some: {
            approved: 1,
            year_id: yearId,
          },
        },
        economic_evaluation: {
          some: {
            conclusion: "apto",
            year_id: yearId,
          },
        },
        background_assessment: {
          some: {
            conclusion: "apto",
            year_id: yearId,
          },
        },
        children: {
          some: {
            vacant: {
              some: {
                year_id: yearId,
              },
            },
          },
        },
      },
      include: {
        psy_evaluation: {
          where: {
            year_id: yearId,
          },
        },
        economic_evaluation: {
          where: {
            year_id: yearId,
          },
        },
        background_assessment: {
          where: {
            year_id: yearId,
          },
        },
        children: {
          include: {
            vacant: {
              where: {
                year_id: yearId,
              },
            },
            person: true,
          },
        },
      },
    });
  }

  async getFamiliesWithEvaluationsStatus(yearId) {
    return prisma.family.findMany({
      where: {
        psy_evaluation: {
          some: {
            applied: 1,
            year_id: yearId,
          },
        },
        economic_evaluation: {
          some: {
            conclusion: {
              not: null,
            },
            year_id: yearId,
          },
        },
        background_assessment: {
          some: {
            conclusion: {
              not: null,
            },
            year_id: yearId,
          },
        },
      },
      include: {
        psy_evaluation: {
          where: {
            year_id: yearId,
          },
        },
        economic_evaluation: {
          where: {
            year_id: yearId,
          },
        },
        background_assessment: {
          where: {
            year_id: yearId,
          },
        },
      },
    });
  }

  async getFamiliesStatus(yearId) {
    return prisma.familiy_secretary.findMany({
      where: {
        status: 1,
        year_id: yearId,
      },
      include: {
        family: {
          include: {
            psy_evaluation: {
              where: {
                year_id: yearId,
              },
            },
            economic_evaluation: {
              where: {
                year_id: yearId,
              },
            },
            background_assessment: {
              where: {
                year_id: yearId,
              },
            },
            children: {
              include: {
                vacant: {
                  where: {
                    year_id: yearId,
                  },
                },
              },
            },
          },
        },
      },
    });
  }
  async getVacant(yearId, page = 1, pageSize = 20) {
    const skip = (page - 1) * pageSize;

    // Contar el total de registros CON FILTRO de secretario
    const total = await prisma.children.count({
      where: {
        vacant: {
          some: {
            year_id: yearId,
          },
        },
        family: {
          familiy_secretary: {
            some: {
              status: 1,
              year_id: yearId,
            },
          },
        },
      },
    });

    // Obtener datos paginados CON FILTRO aplicado en la query
    const data = await prisma.children.findMany({
      where: {
        vacant: {
          some: {
            year_id: yearId,
          },
        },
        family: {
          familiy_secretary: {
            some: {
              status: 1,
              year_id: yearId,
            },
          },
        },
      },
      include: {
        family: {
          include: {
            psy_evaluation: {
              where: {
                year_id: yearId,
              },
              select: {
                applied: true,
                approved: true,
              },
            },
            economic_evaluation: {
              where: {
                year_id: yearId,
              },
              select: {
                conclusion: true,
              },
            },
            background_assessment: {
              where: {
                year_id: yearId,
              },
              select: {
                conclusion: true,
              },
            },
            familiy_secretary: {
              where: {
                year_id: yearId,
              },
              select: {
                status: true,
              },
            },
            person_family_parent_oneToperson: {
              select: {
                phone: true,
                email: true,
              },
            },
          },
        },
        vacant: {
          where: {
            year_id: yearId,
          },
          select: {
            id: true,
            campus: true,
            grade: true,
            level: true,
            status: true,
          },
        },
        person: {
          select: {
            name: true,
            lastname: true,
            mLastname: true,
            gender: true,
            doc_number: true,
            birthdate: true,
          },
        },
      },
      orderBy: {
        id: "desc",
      },
      skip,
      take: pageSize,
    });

    return {
      data,
      total,
      page,
      pageSize,
      totalPages: Math.ceil(total / pageSize),
    };
  }

  // Otros métodos relacionados con el repositorio de usuario
  async getFamilyMembers(idChildren) {
    const yearActive = await prisma.year.findFirst({
      where: {
        status: true,
      },
    });

    let yearId = yearActive.id;
    return prisma.children.findUnique({
      where: {
        id: idChildren,
      },
      include: {
        person: true,
        vacant: {
          where: {},
        },
        family: {
          include: {
            person_family_parent_oneToperson: true,
            person_family_parent_twoToperson: true,
          },
        },
      },
    });
  }

  async setFamilyToSecretary(idFamily, idSecretary) {
    return prisma.familiy_secretary.updateMany({
      where: { family_id: idFamily },
      data: {
        user_id: idSecretary,
      },
    });
  }

  async assignFamilyToSecretary(idFamily, idSecretary) {
    /**obtener año activo */
    const year = await prisma.year.findFirst({
      where: {
        status: true,
      },
      select: {
        id: true,
      },
    });
    return await prisma.familiy_secretary.create({
      data: {
        user_id: idSecretary,
        family_id: idFamily,
        year_id: year.id,
      },
    });
  }
  async setFamilyToPsychology(idFamily, idPsychology) {
    return prisma.psy_evaluation.updateMany({
      where: { family_id: idFamily },
      data: {
        user_id: idPsychology,
      },
    });
  }
}

export default new FamilyRepository();
