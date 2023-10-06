import { PrismaClient } from "@prisma/client";
import { handleHttpError } from "../utils/handleHttpError.js";

import { matchedData } from "express-validator";

const prisma = new PrismaClient();

const store = async (req, res) => {
  try {
    //  req = matchedData(req);
    console.log(req.body.person);
    const {
      name,
      lastname,
      surname,
      type_doc,
      doc_number,
      profession,
      birthdate,
      email,
      phone,
    } = req.body;
    const person = await prisma.person.findFirst({
      where: {
        doc_number,
      },
    });
    if (person) {
      handleHttpError(res, "NUMBER_DOC_EXIST");
      return;
    }

    const personCreate = await prisma.person.create({
      data: req.body.person,
    });

    const userCreate = await prisma.user.create({
      data: {
        email: req.body.user.email,
        phone: req.body.user.phone,
        person_id: personCreate.id,
      },
    });
    res.send(userCreate);
  } catch (error) {
    console.log(error);
    handleHttpError(res, "ERROR_CREATE_FAMILY");
  }
};

export { store };
