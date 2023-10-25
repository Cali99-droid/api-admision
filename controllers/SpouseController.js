import { PrismaClient } from "@prisma/client";
import { handleHttpError } from "../utils/handleHttpError.js";
import { matchedData } from "express-validator";
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
    // si la familia no tiene un conyugue
    const family = await prisma.family.findUnique({
      where: {
        id: parseInt(id),
        AND: {
          mainParent: user.id,
          parent: {
            equals: null,
          },
        },
      },
    });

    if (!family) {
      //
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
        parent: userCreate.id,
      },
      where: {
        id: family.id,
      },
    });
    const imgs = await prisma.doc.createMany({
      data: [
        {
          name: image1.imageName,
          person_id: personCreate.id,
        },
        {
          name: image2.imageName,
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

    // if (!img1 && !img2) {
    //   handleHttpError(res, "INSUFFICIENT_IMAGES");
    //   return;
    // }
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

    if (persDoc?.doc_number == person.doc_number && persDoc?.id != id) {
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

    //** Si vienen imagenes actualizar */
    if (img1 && img2) {
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
          deleteImage(i.name);
        });
      }
      const dateUpdate = new Date();
      const image1 = await uploadImage(img1[0]);
      const image2 = await uploadImage(img2[0]);
      const imgs = await prisma.doc.createMany({
        data: [
          {
            name: image1.imageName,
            person_id: personUpdate.id,
            update_time: dateUpdate,
          },
          {
            name: image2.imageName,
            person_id: personUpdate.id,
            update_time: dateUpdate,
          },
        ],
      });
    }

    const data = {
      id: personUpdate.id,
      // img1: image1.imageName,
      // img2: image2.imageName,
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

const get = async (req, res) => {
  try {
    req = matchedData(req);

    const id = parseInt(req.id);
    const spouse = await prisma.person.findUnique({
      where: {
        id,
      },
      include: {
        user: {
          select: {
            email: true,
            phone: true,
          },
        },
        doc: {
          select: {
            name: true,
          },
        },
      },
    });
    if (!spouse) {
      handleHttpError(res, "SPOUSE_DOES_NOT_EXIST", 404);
      return;
    }
    const email = spouse.user[0]?.email ?? null;
    const phone = spouse.user[0]?.phone ?? null;
    const img1 = spouse.doc[0]?.name ?? null;
    const img2 = spouse.doc[1]?.name ?? null;
    delete spouse.user;
    delete spouse.doc;
    const data = {
      ...spouse,
      email,
      phone,
      img1,
      img2,
    };

    res.status(200).json({
      success: true,
      data: data,
    });
  } catch (error) {
    console.log(error);
    handleHttpError(res, "ERR_GET_FAMILY");
  }
};
export { store, update, get };
