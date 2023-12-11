import prisma from "../utils/prisma.js";

class FamilyPsychologyRepository {
  // async getAllUsers() {
  //   return prisma.user.findMany();
  // }

  async getFamiliesByUser(userId) {
    const data = prisma.psy_evaluation.findMany({
      where: {
        user_id: userId,
      },
      select: {
        family: true,
        applied: true,
        approved: true,

        // doc_interview_psy: true,
      },
    });

    return data;
  }

  async getFamilyById(familyId) {
    const data = await prisma.family.findUnique({
      where: {
        id: familyId,
      },
      select: {
        id: true,
        name: true,
        mainConyugue: {
          select: {
            phone: true,
          },
        },
        children: {
          select: {
            person: true,
            vacant: true,
            report_psy: {
              select: {
                doc: true,
              },
            },
          },
        },
        psy_evaluation: {
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

    console.log(data);
    return data;
  }

  async assignFamily(data) {
    return prisma.psy_evaluation.create({
      data,
    });
  }
}

export default new FamilyPsychologyRepository();
