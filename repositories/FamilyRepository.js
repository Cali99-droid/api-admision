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
  async getVacant(page = 1, pageSize = 20, dataFilter = {}) {
    const skip = (page - 1) * pageSize;
    const {
      conclusionPsi,
      conclusionEcomomic,
      conclusionBackground,
      nameFamily,
      level,
      grade,
      campus,
      yearId,
    } = dataFilter;

    // Construir filtros dinámicamente basados en los parámetros disponibles
    const buildFamilyFilters = () => {
      const filters = {
        familiy_secretary: {
          some: {
            status: 1,
            ...(yearId && { year_id: yearId }),
          },
        },
      };

      if (conclusionPsi !== undefined) {
        if (conclusionPsi == 3) {
          filters.psy_evaluation = {
            some: {
              ...(conclusionPsi !== undefined && { applied: 0 }),
            },
          };
        } else {
          filters.psy_evaluation = {
            some: {
              ...(conclusionPsi !== undefined && {
                approved: parseInt(conclusionPsi),
              }),
            },
          };
        }
      }
      console.log(nameFamily);
      if (nameFamily !== undefined) {
        // Filtrar por nombre de familia (búsqueda insensible a mayúsculas)
        filters.name = {
          contains: nameFamily,
          // mode: "insensitive",
        };
      }

      if (conclusionEcomomic !== undefined) {
        if (conclusionEcomomic === "pendiente") {
          // Filtrar familias que NO tengan economic_evaluation para este año
          filters.economic_evaluation = {
            none: {
              year_id: yearId,
            },
          };
        } else {
          filters.economic_evaluation = {
            some: {
              // Usar los valores correctos del enum: apto, no_apto
              conclusion: conclusionEcomomic,
            },
          };
        }
      }

      if (conclusionBackground !== undefined) {
        if (conclusionBackground === "pendiente") {
          // Filtrar familias que NO tengan economic_evaluation para este año
          filters.background_assessment = {
            none: {
              year_id: yearId,
            },
          };
        } else {
          filters.background_assessment = {
            some: {
              // Usar los valores correctos del enum: apto, no_apto
              conclusion: conclusionBackground,
            },
          };
        }
      }

      return filters;
    };

    const baseWhere = {
      ...(yearId && {
        vacant: {
          some: {
            year_id: yearId,
            ...(campus !== undefined && { campus }),
            ...(grade !== undefined && { grade }),
            ...(level !== undefined && { level }),
          },
        },
      }),
      family: buildFamilyFilters(),
    };

    // Contar el total de registros CON FILTRO
    const total = await prisma.children.count({
      where: baseWhere,
    });

    // Obtener datos paginados CON FILTRO aplicado en la query
    const data = await prisma.children.findMany({
      where: baseWhere,
      include: {
        family: {
          include: {
            psy_evaluation: {
              ...(yearId && {
                where: {
                  year_id: yearId,
                },
              }),
              select: {
                applied: true,
                approved: true,
              },
            },
            economic_evaluation: {
              ...(yearId && {
                where: {
                  year_id: yearId,
                },
              }),
              select: {
                conclusion: true,
              },
            },
            background_assessment: {
              ...(yearId && {
                where: {
                  year_id: yearId,
                },
              }),
              select: {
                conclusion: true,
              },
            },
            familiy_secretary: {
              ...(yearId && {
                where: {
                  year_id: yearId,
                },
              }),
              select: {
                status: true,
              },
            },
            person_family_parent_oneToperson: true,
            person_family_parent_twoToperson: true,
          },
        },
        vacant: {
          ...(yearId && {
            where: {
              year_id: yearId,
            },
          }),
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
      totalPages: Math.ceil(total / pageSize)
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

