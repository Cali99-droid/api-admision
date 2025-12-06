import { PrismaClient } from "@prisma/client";
import { handleHttpError } from "../utils/handleHttpError.js";
import { body, matchedData } from "express-validator";
import PsychologyRepository from "../repositories/PsychologyRepository.js";
import PsychologyReportRepository from "../repositories/PsychologyReportRepository.js";
import { deleteImage, uploadImage } from "../utils/handleImg.js";

import prisma from "../utils/prisma.js";
const SummaryPsyEvaluation = async (req, res) => {
  try {
    const { user } = req;
    const data = await prisma.$queryRaw`
    SELECT
      v.campus,
      v.level,
      v.grade,
      SUM(CASE WHEN p.applied = 0 THEN 1 ELSE 0 END) AS notAssigned,
      SUM(CASE WHEN p.applied = 3 THEN 1 ELSE 0 END) AS notNecessary,
      SUM(CASE WHEN p.approved = 1 AND p.applied = 1 THEN 1 ELSE 0 END) AS apto,
      SUM(CASE WHEN p.approved = 0 AND p.applied = 1 THEN 1 ELSE 0 END) AS noApto
    FROM
      vacant v
      JOIN children c ON v.children_id = c.id
      JOIN family f ON c.family_id = f.id
      JOIN psy_evaluation p ON f.id = p.family_id
    WHERE
      p.applied IN (0,1,3) and 
      p.approved IN (0,1) and
      p.user_id = ${user.userId}    
    GROUP BY
      v.campus,v.level,v.grade
    ORDER BY
      v.campus, v.level, v.grade`;
    const formatData = data.forEach(convertirAEntero);

    res.status(200).json({
      success: true,
      data: data,
    });
  } catch (error) {
    console.log(error);
    handleHttpError(res, "ERROR_GET_BACKGROUND_SUMMARY");
  }
};
function convertirAEntero(objeto) {
  for (const propiedad in objeto) {
    if (["notAssigned", "notNecessary", "apto", "noApto"].includes(propiedad)) {
      objeto[propiedad] = parseInt(objeto[propiedad], 10);
    }
  }
}
const getFamilies = async (req, res) => {
  const { user } = req;
  let yearId;
  const yearIdQuery = req.query.yearId;

  const yearActive = await prisma.year.findFirst({
    where: {
      status: true,
    },
  });

  yearId = yearIdQuery ? parseInt(yearIdQuery) : yearActive.id;

  try {
    //commit
    const s = await PsychologyRepository.getFamiliesByUser(user.userId, yearId);
    console.log(s);
    const filterFamilies = s.filter((f) => {
      if (f.applied === 3 && f.family.children.length === 1) {
        return false;
      } else {
        return true;
      }
    });

    const data = filterFamilies.map((f) => {
      return {
        id: f.family.id,
        name: f.family.name,
        parent:
          f.family.person_family_parent_oneToperson.name +
          " " +
          f.family.person_family_parent_oneToperson.lastname,
        applied: f.applied,
        approved: f.applied === 0 ? 3 : f.approved,
        phone: f.family.person_family_parent_oneToperson.phone,
        date: f.quotes[0]?.date === undefined ? "" : f.quotes[0]?.date,
        status:
          f.quotes[0]?.status === undefined ? "pending" : f.quotes[0]?.status,
        idCitation: f.quotes[0]?.id === undefined ? null : f.quotes[0]?.id,
        psy_evaluation_id: f.id,
        children: f.family.children.length,
      };
    });
    res.status(201).json({
      success: true,
      data: data,
    });
  } catch (error) {
    console.log(error);
    handleHttpError(res, "ERROR_GET_FAMILIES");
  }
};
const getFamily = async (req, res) => {
  req = matchedData(req);
  const id = parseInt(req.id);

  try {
    const yearActive = await prisma.year.findFirst({
      where: {
        status: true,
      },
    });
    const family = await PsychologyRepository.getFamilyById(id, yearActive.id);
    //formatear
    const phone = family.person_family_parent_oneToperson.phone;
    let status = true;
    const children = family.children.map((c) => {
      return {
        id: c.person.id,
        idChild: c.id,
        name: c.person.name,
        lastname: c.person.lastname,
        mLastname: c.person.mLastname,
        campus: c.vacant[0]?.campus || null,
        level: c.vacant[0]?.level || null,
        grade: c.vacant[0]?.grade || null,
        status: c.vacant[0]?.status || null,
        report: c.report_psy,
      };
    });
    if (children.length <= 0) {
      status = false;
    } else {
      status = true;
      children.forEach((c) => {
        if (c.report.length < 1) {
          status = false;
        }
      });
    }

    const evPsy = family.psy_evaluation[0];

    // const vacant = family.children.map((c) => {
    //   return c.vacant;
    // });

    const data = {
      id: family.id,
      family: family.name,
      phone,
      applied: evPsy?.applied || null,
      approved: evPsy?.approved || null,
      doc1: evPsy?.doc1 || null,
      doc2: evPsy?.doc2 || null,
      children,
      status,
      date:
        evPsy.quotes[0]?.date === undefined ? "pending" : evPsy.quotes[0]?.date,
    };
    res.status(201).json({
      success: true,
      data,
    });
  } catch (error) {
    console.log(error);
    handleHttpError(res, "ERROR_GET_FAMILIES");
  }
};
const createInterview = async (req, res) => {
  const { img1, img2 } = req.files;
  req = matchedData(req);
  const { familyId, approved } = req;
  if (!img1 || !img2) {
    handleHttpError(res, "INSUFFICIENT_IMAGES");
    return;
  }
  const family = await prisma.family.findUnique({
    where: {
      id: parseInt(familyId),
    },
  });
  if (!family) {
    handleHttpError(res, "FAMILY_NOT_EXIST");
    return;
  }

  const evPsy = await prisma.psy_evaluation.findFirst({
    where: {
      family_id: family.id,
    },
  });
  if (!evPsy) {
    handleHttpError(res, "EV_NOT_EXIST");
    return;
  }
  deleteImage(evPsy.doc1);
  deleteImage(evPsy.doc2);

  const image1 = await uploadImage(img1[0]);
  const image2 = await uploadImage(img2[0]);

  const updateEv = await prisma.psy_evaluation.update({
    data: {
      applied: 1,
      approved: parseInt(approved),
      doc1: image1.imageName,
      doc2: image2.imageName,
    },
    where: {
      id: evPsy.id,
    },
  });
  const citation = await prisma.quotes.findMany({
    where: {
      psy_evaluation_id: updateEv.id,
    },
  });
  if (citation.length > 0) {
    const updateAttendaceQuote = await prisma.quotes.update({
      data: {
        status: "completed",
      },
      where: {
        id: citation[0]?.id,
      },
    });
  }

  return res.status(201).json({
    success: true,
    data: updateEv,
  });

  // const interview = await prisma.doc_interview_psy.findMany({
  //   where:
  // })
};
const createReportToChildren = async (req, res) => {
  const { img1 } = req.files;
  req = matchedData(req);

  const { personId } = req;

  if (!img1) {
    handleHttpError(res, "INSUFFICIENT_IMAGES");
    return;
  }

  const children = await prisma.children.findFirst({
    where: {
      person_id: parseInt(personId),
    },
  });
  if (!children) {
    handleHttpError(res, "CHILDREN_NOT_EXIST");
    return;
  }
  const childrenId = children.id;

  //buscar si existe y actualizar

  const report = await PsychologyReportRepository.findReportByChildren(
    parseInt(childrenId)
  );
  if (report.length > 0) {
    report.forEach((rep) => {
      deleteImage(rep.doc);
    });
    const image1 = await uploadImage(img1[0]);
    // const image2 = await uploadImage(img2[0]);
    const update1 = await PsychologyReportRepository.updateReport(
      {
        doc: image1.imageName,
      },
      report[0].id
    );
    // const update2 = await PsychologyReportRepository.updateReport(
    //   {
    //     doc: image2.imageName,
    //   },
    //   report[1].id
    // );
    res.status(201).json({
      success: true,
      data: 1,
    });
    return;
  }
  const image1 = await uploadImage(img1[0]);
  // const image2 = await uploadImage(img2[0]);
  const data1 = { doc: image1.imageName, children_id: parseInt(childrenId) };
  // const data2 = { doc: image2.imageName, children_id: parseInt(childrenId) };
  const createReport1 = await PsychologyReportRepository.createReport(data1);
  // const createReport2 = await PsychologyReportRepository.createReport(data2);
  const data = { count: 2 };
  res.status(201).json({
    success: true,
    data,
  });
  return;
};

const createCitation = async (req, res) => {
  try {
    const { psy_evaluation_id, date } = req.body;

    const newCitation = await prisma.quotes.create({
      data: {
        psy_evaluation_id,
        date: new Date(date),
        status: "scheduled",
      },
    });
    res.status(201).json({
      success: true,
      data: newCitation,
    });
  } catch (error) {
    console.log(error);
    handleHttpError(res, "ERROR_CREATE_CITATION");
  }
};
const updateCitation = async (req, res) => {
  try {
    const { id } = req.params;
    const { date } = req.body;

    const newCitation = await prisma.quotes.updateMany({
      where: {
        psy_evaluation_id: parseInt(id),
      },
      data: {
        date: new Date(date),
        status: "rescheduled",
      },
    });
    res.status(201).json({
      success: true,
      data: newCitation,
    });
  } catch (error) {
    console.log(error);
    handleHttpError(res, "ERROR_CREATE_CITATION");
  }
};
const cancelCitation = async (req, res) => {
  try {
    const { id } = req.params;
    const updateCitation = await prisma.quotes.updateMany({
      data: {
        status: "not_present",
      },
      where: {
        psy_evaluation_id: parseInt(id),
      },
    });
    res.status(201).json({
      success: true,
      data: updateCitation,
    });
  } catch (error) {
    console.log(error);
    handleHttpError(res, "ERROR_CANCEL_CITATION");
  }
};
const getCitations = async (req, res) => {
  const { user } = req;

  try {
    const s = await PsychologyRepository.getFamiliesByUser(user.userId);

    const da = s.filter((p) => p.quotes[0]?.id);
    const quotes = da.map((p) => {
      if (p.quotes[0]?.id) {
        return {
          id: p.quotes[0]?.id,
          date: p.quotes[0]?.date,
          status: p.quotes[0]?.status,
          family: p.family.name,
        };
      }
    });
    res.status(201).json({
      success: true,
      data: quotes,
    });
  } catch (error) {
    console.log(error);
    handleHttpError(res, "ERROR_GET_CITATION");
  }
};
// const miSonsera = async (req, res) => {
//   const families = await prisma.familiy_secretary.findMany({
//     where: {
//       status: 1,
//     },
//   });

//   const data = await prisma.user_roles.findMany({
//     where: {
//       roles_id: 3,
//     },
//     select: {
//       user: true,
//     },
//   });
//   const secretaries = data.map((dat) => dat.user);

//   // Obtener la cantidad actual de familias asignadas a cada secretaria
//   const familySecretaryRelations = await prisma.psy_evaluation.findMany();
//   const asignaments = {};
//   secretaries.forEach((secretary) => {
//     const assignedFamilies = familySecretaryRelations.filter(
//       (rel) => rel.user_id === secretary.id
//     );
//     asignaments[secretary.id] = assignedFamilies.map((rel) => rel.family_id);
//   });

//   // Asignar las familias no asignadas
//   families.forEach((family) => {
//     const secretariaIds = Object.keys(asignaments);
//     const secretariaMenosOcupada = secretariaIds.reduce((a, b) =>
//       asignaments[a].length < asignaments[b].length ? a : b
//     );
//     asignaments[secretariaMenosOcupada].push(family.family_id);
//   });
//   // Actualizar la base de datos con las asignaciones
//   const updatePromises = Object.entries(asignaments).map(
//     ([user_id, familiaIds]) => {
//       const data = familiaIds.map((id) => {
//         return { user_id: parseInt(user_id), family_id: id };
//       });

//       return prisma.psy_evaluation.createMany({
//         data,
//       });
//     }
//   );

//   await Promise.all(updatePromises);

//   res.json({ message: "Familias asignadas con éxito." });
// };
//  const getFamilies = (req, res) => {};

const changeApproed = async (req, res) => {
  try {
    const { user } = req;
    const { id } = req.params;
    const year = await prisma.year.findFirst({
      where: {
        status: true,
      },
      select: {
        id: true,
      },
    });
    const data = await PsychologyRepository.findOneByFamilyIdAndYear(
      id,
      year.id
    );
    if (!data) {
      handleHttpError(res, "EVALUATION_PSYCHOLOGY_NOT_EXIST");
      return;
    }
    if (data.approved == 1) {
      data.approved = 0;
    } else {
      data.approved = 1;
    }
    const update = await PsychologyRepository.update(data.id, data);

    res.status(201).json({
      success: true,
      data: {
        update,
      },
    });
  } catch (error) {
    console.log(error);
    handleHttpError(res, "ERROR_UPDATE_APPROVED_COMPLETED");
  }
};
const getCompleted = async (req, res) => {
  try {
    const { user } = req;
    const familyAplieds = await PsychologyRepository.getFamiliesByUser(user.id);
    const applied = familyAplieds.filter((f) => f.applied === 1);

    res.status(201).json({
      success: true,
      data: {
        applied: applied.length,
      },
    });
  } catch (error) {
    console.log(error);
    handleHttpError(res, "ERROR_GET_COMPLETED");
  }
};
export {
  getFamilies,
  getFamily,
  createReportToChildren,
  createInterview,
  // miSonsera,
  createCitation,
  updateCitation,
  cancelCitation,
  getCitations,
  getCompleted,
  SummaryPsyEvaluation,
  changeApproed,
};
