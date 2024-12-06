import prisma from "../utils/prisma.js";

class PsychologyRepository {
  async getAssignments() {
    const data = prisma.psy_evaluation.findMany({
      select: {
        applied: true,
        approved: true,
        family: {
          include: {
            children: {
              select: {
                vacant: true,
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
    });

    return data;
  }

  async getFamiliesByUser(userId) {
    const data = prisma.psy_evaluation.findMany({
      where: {
        user_id: userId,
        //  AND:{
        //   applied:{
        //     not:2
        //   }
        //  }
      },
      select: {
        id: true,
        family: {
          include: {
            person_family_parent_oneToperson: true,
            children: true,
          },
        },
        applied: true,
        approved: true,
        quotes: true,
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
            id: true,
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
            quotes: true,
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

export default new PsychologyRepository();
