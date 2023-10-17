import { PrismaClient } from "@prisma/client";
import { handleHttpError } from "../utils/handleHttpError.js";
import { v4 as uuidv4 } from "uuid";
import { matchedData } from "express-validator";
import s3Client from "../utils/aws.js";
import { PutObjectCommand } from "@aws-sdk/client-s3";
import { deleteImage, uploadImage } from "../utils/handleImg.js";

const prisma = new PrismaClient();

const store = async (req, res) => {
  try {
    const { user } = req;
    const { img1, img2 } = req.files;

    req = matchedData(req);

    const { person, userData, id } = req;

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

    if (!img1 || !img2) {
      handleHttpError(res, "INSUFFICIENT_IMAGES");
      return;
    }
    person.birthdate = new Date(person.birthdate).toISOString();
    person.doc_number = person.doc_number.toString();

    const image1 = await uploadImage(img1[0]);
    const image2 = await uploadImage(img2[0]);
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
    const imgs = await prisma.doc.createMany({
      data: [
        {
          NAME: image1.imageName,
          person_id: personCreate.id,
        },
        {
          NAME: image2.imageName,
          person_id: personCreate.id,
        },
      ],
    });

    const data = { id: personCreate.id };
    res.status(201).json({
      success: true,
      data: data,
    });
  } catch (error) {
    console.log(error);
    handleHttpError(res, "ERROR_CREATE_SPOUSE");
  }
};

const update = async (req, res) => {
  try {
    const { user } = req;

    const { img1, img2 } = req.files;
    req = matchedData(req);

    const { person, userData, id } = req;

    const pers = await prisma.person.findUnique({
      where: {
        id: parseInt(id),
      },
    });

    if (!pers) {
      handleHttpError(res, "PERSON_DOES_NOT_EXIST");
      return;
    }
    const persDoc = await prisma.person.findFirst({
      where: {
        doc_number: person.doc_number,
      },
    });
    if (persDoc.doc_number == person.doc_number && persDoc.id != id) {
      handleHttpError(res, "DOC_NUMBER_EXIST");
      return;
    }

    const us = await prisma.user.findFirst({
      where: {
        email: userData.email,
      },
    });
    if (us) {
      if (us.person_id != id) {
        handleHttpError(res, "EMAIL_EXIST");
        return;
      }
    }

    if (!img1 && !img2) {
      handleHttpError(res, "INSUFFICIENT_IMAGES");
      return;
    }
    const docs = await prisma.doc.findMany({
      where: {
        person_id: parseInt(id),
      },
    });
    if (docs.length > 0) {
      docs.forEach(async (i, index) => {
        await prisma.doc.delete({
          where: {
            id: i.id,
          },
        });
        deleteImage(i.NAME);
      });
    }
    const image1 = await uploadImage(img1[0]);
    const image2 = await uploadImage(img2[0]);

    person.birthdate = new Date(person.birthdate).toISOString();
    person.doc_number = person.doc_number.toString();
    const dateUpdate = new Date();
    person.update_time = dateUpdate;

    const personUpdate = await prisma.person.update({
      data: person,
      where: {
        id: parseInt(id),
      },
      include: {
        user: {
          select: {
            email: true,
            phone: true,
          },
        },
      },
    });

    const userUpdate = await prisma.user.updateMany({
      data: {
        email: userData.email,
        phone: userData.phone.toString(),
        person_id: personUpdate.id,
        update_time: dateUpdate,
      },
      where: {
        person_id: parseInt(id),
      },
    });

    const imgs = await prisma.doc.createMany({
      data: [
        {
          NAME: image1.imageName,
          person_id: personUpdate.id,
          update_time: dateUpdate,
        },
        {
          NAME: image2.imageName,
          person_id: personUpdate.id,
          update_time: dateUpdate,
        },
      ],
    });

    const data = {
      person,
      img1: image1.imageName,
      img2: image2.imageName,
    };
    res.status(201).json({
      success: true,
      data: data,
    });
  } catch (error) {
    console.log(error);
    handleHttpError(res, "ERROR_UPDATE_SPOUSE");
  }
};

export { store, update };
