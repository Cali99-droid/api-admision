import { PrismaClient } from "@prisma/client";
import { handleHttpError } from "../utils/handleHttpError.js";

import { matchedData } from "express-validator";

const prisma = new PrismaClient();

const store = async (req, res) => {
  try {
    const { user } = req;
    req = matchedData(req);

    const { person, userData, id } = req;

    const family = await prisma.family.findUnique({
      where: {
        id: parseInt(id),
        AND: {
          padreId: user.id,
          madreId: {
            equals: null,
          },
        },
      },
    });

    if (!family) {
      handleHttpError(res, "FAMILY_NOT_AVAILABLE");
      return;
    }
    const pers = await prisma.person.findFirst({
      where: {
        doc_number: person.doc_number.toString(),
      },
    });

    if (pers) {
      handleHttpError(res, "NUMBER_DOC_EXIST");
      return;
    }

    const us = await prisma.user.findFirst({
      where: {
        email: userData.email,
      },
    });
    if (us) {
      handleHttpError(res, "EMAIL_EXIST");
      return;
    }
    person.birthdate = new Date(person.birthdate).toISOString();
    person.doc_number = person.doc_number.toString();

    const personCreate = await prisma.person.create({
      data: person,
    });

    const userCreate = await prisma.user.create({
      data: {
        email: userData.email,
        phone: userData.phone.toString(),
        person_id: personCreate.id,
      },
    });

    const familyUpdateMarried = await prisma.family.update({
      data: {
        madreId: userCreate.id,
      },
      where: {
        id: family.id,
      },
    });

    const data = { id: personCreate.id };
    res.status(201).json({
      success: true,
      data: data,
    });
  } catch (error) {
    console.log(error);
    handleHttpError(res, "ERROR_CREATE_FAMILY");
  }
};

export { store };
