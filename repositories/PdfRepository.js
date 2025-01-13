import prisma from "../utils/prisma.js";
import * as PDFDocument from 'pdfkit';
class PdfRepository {
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
    const { status } = data;
    if (status === true) {
      // Desactivar todos los años
      await prisma.year.updateMany({
        where: { status: true },
        data: { status: false },
      });
    }

    return prisma.year.create({
      data,
    });
  }
  async updateYear(idYear, data) {
    const { status } = data;
    if (status === true) {
      // Desactivar todos los años
      await prisma.year.updateMany({
        where: { status: true },
        data: { status: false },
      });
    }
    return prisma.year.update({
      where: {
        id: parseInt(idYear),
      },
      data,
    });
  }
}

export default new PdfRepository();
