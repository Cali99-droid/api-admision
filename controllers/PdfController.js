import { handleHttpError } from "../utils/handleHttpError.js";
import { matchedData } from "express-validator";
import PdfRepository from "../repositories/PdfRepository.js";
import prisma from "../utils/prisma.js";
const downloadVacancyCertificate = async (req, res) => {
  try {
    const months = [
      "enero", "febrero", "marzo", "abril", "mayo", "junio", 
      "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre"
    ];
    const levels = [
      "INICIAL", "PRIMARIA", "SECUNDARIA"
    ];
    const grades = [
      "TRES AÑOS", "CUARTO AÑOS", "CINCO AÑOS",
      "PRIMERO", "SEGUNDO", "TERCERO","CUARTO","QUINTO","SEXTO",
      "PRIMERO", "SEGUNDO", "TERCERO","CUARTO","QUINTO",
    ];
    const { user } = req;
    const person = await prisma.person.findUnique({
      where: {
        id: user.personId,
      },
    });

    const childrenData = await prisma.children.findUnique({
      where: {
          id: parseInt(req.params.id)
        },
      include: {
          person: true,
        },
    })
    if (!childrenData) {
      handleHttpError(res, "CHILDREN_NOT_EXIST");
      return;
    }
    const today = new Date();
    const day = today.getDate();
    const month = months[today.getMonth()];
    const year = today.getFullYear();
    const parent = `${person.name.toUpperCase()} ${person.lastname.toUpperCase()} ${person.mLastname.toUpperCase()}`;
    const children = `${childrenData.person.name.toUpperCase()} ${childrenData.person.lastname.toUpperCase()} ${childrenData.person.mLastname.toUpperCase()}`;

    const level = levels[childrenData.level];
    const grade = grades[childrenData.grade];

    const endVacant =`31-01-${year}`;
    const data ={
      parent,
      children,
      endVacant,
      day,
      month,
      year,
      level,
      grade
    }
    const pdfBuffer = await PdfRepository.generateVacancyCertificate(data); 

    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader(
      'Content-Disposition',
      'attachment; filename=constancia_vacante_2025.pdf'
    );

    res.status(200).send(pdfBuffer);
  } catch (error) {
    console.error(error);
    handleHttpError(res, 'ERROR_GENERATING_PDF');
  }
};
export {
  downloadVacancyCertificate,
};