import prisma from "../utils/prisma.js";
import PDFDocument from 'pdfkit';
import path from 'path';
import { fileURLToPath } from 'url';
class PdfRepository {
  // async generateVacancyCertificate() : Promise<Buffer>{
  //   const doc = new PDFDocument({
  //     size: 'A4',
  //     margins: {
  //       top: 47,
  //       bottom: 47,
  //       left: 47,
  //       right: 66,
  //     },
  //   });
  //   const buffers: Buffer[] = [];
  //     doc.on('data', buffers.push.bind(buffers));
  //     doc.on('end', () => resolve(Buffer.concat(buffers)));
  //   return prisma.year.findMany();
  // }
  async generateVacancyCertificate(data) {
    console.log(data);
    return new Promise((resolve, reject) => {
      const doc = new PDFDocument({
        size: 'A4',
        margins: {
          top: 47,
          bottom: 47,
          left: 47,
          right: 66,
        },
      });
      const buffers = [];
  
      // Capture the PDF data in memory
      doc.on('data', (chunk) => buffers.push(chunk));
      doc.on('end', () => resolve(Buffer.concat(buffers)));
      doc.on('error', reject);
  
      // const imagePath = '../img/constancia-header.png'; 
      // doc.image(imagePath, { fit: [100, 100], align: 'center' });v
      const __filename = fileURLToPath(import.meta.url);
      const __dirname = path.dirname(__filename);
      const imageHeader = path.join(__dirname, '..', 'img', 'constancia-header.png');
      const imageFirma = path.join(__dirname, '..', 'img', 'constancia-firma.png');
      // doc.image(imagePath, { fit: [100, 100], align: 'center' });
      doc.image(imageHeader, 0, 0, { width: doc.page.width, align: 'center' });
      // Title
      doc.moveDown(6);
      doc.fillColor('#2e559d').fontSize(16).font('Times-Bold').text(`CONSTANCIA DE VACANTE ${data.year}`, {
        align: 'center',
      });
      doc.fillColor('black');
      doc.moveDown(2);
  
      // Body content
      doc.fontSize(12).font('Times-Roman');
      doc.text(
        'EL QUE AL FINAL SUSCRIBE, DIRECTOR DE LA INSTITUCIÓN EDUCATIVA PRIVADA “ALBERT EINSTEIN” - Huaraz,',
        { align: 'justify' }
      );
  
      doc.moveDown(1);
      doc.font('Times-Bold').text('HACE CONSTAR:');
      doc.fontSize(12).font('Times-Roman');
      doc.moveDown(1);
      doc.text(
        `Que, el Sr(a) ${data.parent} responsable de la matrícula del alumno(a): ${data.children}, ha reservado una VACANTE, para el referido menor en el Nivel: ${data.level} Grado: ${data.grade}, para el Año Académico ${data.year}.`,
        { align: 'justify' }
      );
  
      doc.moveDown(1);
      doc.text(
        `Mi representada: I.E.P. “ALBERT EINSTEIN”, reservará la VACANTE hasta la fecha ${data.endVacant}, quién al momento de matricular deberá presentar la documentación completa, que consta de:`,
        { align: 'justify' }
      );
  
      // List of required documents
      doc.moveDown(1);
      
      // doc.list([
      //   'Ficha Única de Matrícula actualizada a la fecha (Impreso del SIAGIE).',
      //   'Resolución Directoral de Traslado.',
      //   'Fotografía de la Tarjeta de Vacunación (hasta el 3° Primaria).',
      //   'Constancia de no adeudo.',
      //   'Libreta de notas final con todas las notas aprobatorias.',
      // ],{ ordered: false, underline: false });
      const listItems = [
        'Ficha Única de Matrícula actualizada a la fecha (Impreso del SIAGIE).',
        'Resolución Directoral de Traslado.',
        'Fotografía de la Tarjeta de Vacunación (hasta el 3° Primaria).',
        'Constancia de no adeudo.',
        'Libreta de notas final con todas las notas aprobatorias.'
      ];
      
      // Coordenadas donde empezar a escribir la lista
      let yPosition = 350; // Puedes ajustar la posición Y según lo necesites
      
      // Establece el estilo de texto
      doc.font('Times-Roman').fontSize(12);
      
      // Escribe cada ítem con numeración, enumerando manualmente sin puntos
      listItems.forEach((item, index) => {
        // Escribe la numeración manualmente sin el punto
        doc.text(`${index + 1}. ${item}`, 50, yPosition);
        
        // Incrementa la posición Y para el siguiente ítem
        yPosition += 15; // Ajusta el espaciado entre los ítems
      });
      // Important note
      doc.moveDown(1);
      doc.text(
        'Importante: Al no realizar la matrícula hasta la fecha indicada, ocasionará la PÉRDIDA DE VACANTE, disponiendo mi despacho que dicha VACANTE se le otorgue a otro Padre de Familia que cumpla con los requisitos.',
        { align: 'justify', underline: false }
      );
  
      // Footer with date and place
      doc.moveDown(2);
      doc.text(`Huaraz, ${data.day} de ${data.month} del ${data.year}.`, { align: 'right' });
      // doc.image(imageFirma, { width: 250, height: 100, align: 'center' });
      const imageWidth = 250;
      const imageHeight = 100;
      
      // Obtener las dimensiones de la página
      const pageWidth = doc.page.width;
      
      // Calcular la posición X para mover la imagen hacia la derecha
      const xPosition = (pageWidth - imageWidth) / 2; // Aumentar 50 para moverla hacia la derecha
      
      // Colocar la imagen con la posición X ajustada
      doc.image(imageFirma, xPosition, 550, { width: imageWidth, height: imageHeight });
      
      // Finalize the PDF
      doc.end();
    });
  }  
}

export default new PdfRepository();
