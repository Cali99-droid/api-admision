import prisma from "../utils/prisma.js";

class SecretaryRepository {
  //**Familias asignadas por secretaria */
  async getAssignments(yearId) {
    const data = prisma.familiy_secretary.findMany({
      where: {
        OR: [
          // Familias con vacantes del año especificado
          {
            family: {
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
          },
          // Familias con hijos pero sin vacantes
          {
            family: {
              children: {
                some: {
                  vacant: {
                    none: {},
                  },
                },
              },
            },
          },
          // Familias sin hijos
          {
            family: {
              children: {
                none: {},
              },
            },
          },
          {
            year_id: yearId,
          },
        ],
      },
      select: {
        status: true,
        family: {
          include: {
            children: {
              include: {
                vacant: {
                  where: {
                    year_id: yearId,
                  },
                },
              },
            },
            person_family_parent_oneToperson: true,
          },
        },
        user: {
          select: {
            person: true,
          },
        },
      },
      orderBy: {
        id: "asc",
      },
    });

    return data;
  }
  //** familias por secretaria */
  async getFamiliesByUser(userId) {
    const data = prisma.psy_evaluation.findMany({
      where: {
        user_id: userId,
      },
      select: {
        family: {
          include: {
            person_family_parent_oneToperson: true,
          },
        },
        applied: true,
        approved: true,

        // doc_interview_psy: true,
      },
    });

    return data;
  }

  async getFamilyById(familyId, yearId) {
    const data = await prisma.family.findUnique({
      where: {
        id: familyId,
      },
      select: {
        id: true,
        name: true,
        person_family_parent_oneToperson: {
          select: {
            phone: true,
          },
        },
        children: {
          select: {
            person: true,
            vacant: {
              where: yearId ? { year_id: yearId } : undefined,
            },
            report_psy: {
              select: {
                doc: true,
              },
            },
          },
        },
        psy_evaluation: {
          where: yearId ? { year_id: yearId } : undefined,
          select: {
            applied: true,
            approved: true,
            doc1: true,
            doc2: true,
          },
        },
        // doc_interview_psy: true,
      },
    });

    return data;
  }

  async assignFamily(data) {
    return prisma.psy_evaluation.create({
      data,
    });
  }
}

export default new SecretaryRepository();
