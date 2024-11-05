import prisma from "../utils/prisma.js";

class  YearRepository {
  async getAllYears() {
    return prisma.year.findMany();
  }
  async getYearById(yearId) {
    return prisma.year.findMany({
      where: {
        id: parseInt(yearId),
      },
    });
  }
  async createYear(data) {
    return prisma.year.create({
      data
    });
  }
  async updateYear(idYear,data) {
    return prisma.year.update({
      where:{
        id:parseInt(idYear),
      },
      data,
    });
  }
}


export default new  YearRepository();