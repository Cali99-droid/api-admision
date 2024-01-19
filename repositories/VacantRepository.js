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

  async updateVacant(vacantId, data) {
    return prisma.vacant.update({
      where: {
        id: vacantId,
      },
      data,
    });
  }

  // async getVacantWithAntecedents() {
  //   // return prisma.background_assessment.groupBy({
  //   //   by: ["conclusion"],
  //   //   _count: {
  //   //     id: true,
  //   //   },

  //   // });
  //   const dataSummary = [];

  //   const result = await prisma.vacant.findMany({
  //     include: {
  //       children: {
  //         select: {
  //           family: {
  //             select: {
  //               background_assessment: true,
  //             },
  //           },
  //         },
  //       },
  //     },
  //   });
  //   let countAptos = -1;
  //   let countNoAptos = -1;
  //   let countNoEvaluados = -1;

  //   const data = result.forEach((v) => {
  //     if (
  //       v.children.family.background_assessment[0] &&
  //       v.campus === "3" &&
  //       v.level === "1"
  //     ) {
  //       if (v.children.family.background_assessment[0].conclusion === "apto") {
  //         countAptos = countAptos += 1;
  //       } else {
  //         countNoAptos += 1;
  //       }
  //     } else {
  //       countNoEvaluados += 1;
  //     }
  //   });

  //   return { countAptos, countNoAptos, countNoEvaluados };
  // }
}

export default new VacantRepository();
