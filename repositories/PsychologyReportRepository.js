import prisma from "../utils/prisma.js";

class PsychologyReportRepository {
  async findReportById(reportId) {
    return prisma.report_psy.findUnique({
      where: {
        id: reportId,
      },
    });
  }
  async findReportByChildren(childrenId) {
    return prisma.report_psy.findMany({
      where: {
        children_id: childrenId,
      },
    });
  }
  async createReport(data) {
    return prisma.report_psy.create({ data });
  }
  async updateReport(data, id) {
    return prisma.report_psy.update({
      data,
      where: {
        id,
      },
    });
  }

  // Otros métodos relacionados con el repositorio de usuario
}

export default new PsychologyReportRepository();
