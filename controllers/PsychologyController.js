import { PrismaClient } from "@prisma/client";
import { handleHttpError } from "../utils/handleHttpError.js";
import { body, matchedData } from "express-validator";
import PsychologyRepository from "../repositories/PsychologyRepository.js";
import PsychologyReportRepository from "../repositories/PsychologyReportRepository.js";
import { deleteImage, uploadImage } from "../utils/handleImg.js";
import PersonRepository from "../repositories/PersonRepository.js";
import prisma from "../utils/prisma.js";

const getFamilies = async (req, res) => {
  const { user } = req;
  try {
    const s = await PsychologyRepository.getFamiliesByUser(user.id);
    const data = s.map((f) => {
      return {
        id: f.family.id,
        name: f.family.name,
        applied: f.applied,
        approved: f.approved,
        phone: f.family.mainConyugue.phone,
      };
    });
    res.status(201).json({
      success: true,
      data,
    });
  } catch (error) {
    console.log(error);
    handleHttpError(res, "ERROR_GET_FAMILIES");
  }
};
const getFamily = async (req, res) => {
  const { user } = req;
  req = matchedData(req);
  const id = parseInt(req.id);

  try {
    const family = await PsychologyRepository.getFamilyById(id);
    //formatear
    const phone = family.mainConyugue.phone;
    let status = true;
    const children = family.children.map((c) => {
      return {
        id: c.person.id,
        name: c.person.name,
        lastname: c.person.lastname,
        mLastname: c.person.mLastname,
        campus: c.vacant[0]?.campus || null,
        level: c.vacant[0]?.level || null,
        grade: c.vacant[0]?.grade || null,
        report: c.report_psy,
      };
    });
    if (children.length <= 0) {
      status = false;
    } else {
      status = true;
      children.forEach((c) => {
        if (c.report.length < 2) {
          status = false;
        }
      });
    }
    console.log(children);
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
  return res.status(201).json({
    success: true,
    data: updateEv,
  });

  // const interview = await prisma.doc_interview_psy.findMany({
  //   where:
  // })
};
const createReportToChildren = async (req, res) => {
  const { img1, img2 } = req.files;
  req = matchedData(req);

  const { personId } = req;

  if (!img1 || !img2) {
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
    const image2 = await uploadImage(img2[0]);
    const update1 = await PsychologyReportRepository.updateReport(
      {
        doc: image1.imageName,
      },
      report[0].id
    );
    const update2 = await PsychologyReportRepository.updateReport(
      {
        doc: image2.imageName,
      },
      report[1].id
    );
    res.status(201).json({
      success: true,
      data: 2,
    });
    return;
  }
  const image1 = await uploadImage(img1[0]);
  const image2 = await uploadImage(img2[0]);
  const data1 = { doc: image1.imageName, children_id: parseInt(childrenId) };
  const data2 = { doc: image2.imageName, children_id: parseInt(childrenId) };
  const createReport1 = await PsychologyReportRepository.createReport(data1);
  const createReport2 = await PsychologyReportRepository.createReport(data2);
  const data = { count: 2 };
  res.status(201).json({
    success: true,
    data,
  });
  return;
};

const miSonsera = async (req, res) => {
  const families = await prisma.familiy_secretary.findMany({
    where: {
      status: 1,
    },
  });

  const data = await prisma.user_roles.findMany({
    where: {
      roles_id: 3,
    },
    select: {
      user: true,
    },
  });
  const secretaries = data.map((dat) => dat.user);

  // Obtener la cantidad actual de familias asignadas a cada secretaria
  const familySecretaryRelations = await prisma.psy_evaluation.findMany();
  const asignaments = {};
  secretaries.forEach((secretary) => {
    const assignedFamilies = familySecretaryRelations.filter(
      (rel) => rel.user_id === secretary.id
    );
    asignaments[secretary.id] = assignedFamilies.map((rel) => rel.family_id);
  });

  // Asignar las familias no asignadas
  families.forEach((family) => {
    const secretariaIds = Object.keys(asignaments);
    const secretariaMenosOcupada = secretariaIds.reduce((a, b) =>
      asignaments[a].length < asignaments[b].length ? a : b
    );
    asignaments[secretariaMenosOcupada].push(family.family_id);
  });
  // Actualizar la base de datos con las asignaciones
  const updatePromises = Object.entries(asignaments).map(
    ([user_id, familiaIds]) => {
      const data = familiaIds.map((id) => {
        return { user_id: parseInt(user_id), family_id: id };
      });

      return prisma.psy_evaluation.createMany({
        data,
      });
    }
  );

  await Promise.all(updatePromises);

  res.json({ message: "Familias asignadas con éxito." });
};
//  const getFamilies = (req, res) => {};
export {
  getFamilies,
  getFamily,
  createReportToChildren,
  createInterview,
  miSonsera,
};
