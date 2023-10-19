import { handleHttpError } from "../utils/handleHttpError.js";
import { matchedData } from "express-validator";
import { deleteImage, uploadImage } from "../utils/handleImg.js";
import prisma from "../utils/prisma.js";

const store = async (req, res) => {
  try {
    const { user } = req;
    const { img1, img2 } = req.files;

    const children = matchedData(req);
    const { id } = children;
    const pers = await prisma.person.findFirst({
      where: {
        doc_number: children.doc_number.toString(),
      },
    });
    if (pers) {
      handleHttpError(res, "NUMBER_DOC_EXIST");
      return;
    }
    const family = await prisma.family.findUnique({
      where: {
        id: parseInt(id),
        AND: {
          padreId: user.id,
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
    children.birthdate = new Date(children.birthdate).toISOString();
    children.doc_number = children.doc_number.toString();
    const image1 = await uploadImage(img1[0]);
    const image2 = await uploadImage(img2[0]);
    delete children.id;
    const personCreate = await prisma.person.create({
      data: children,
    });

    const childrenCreate = await prisma.children.create({
      data: {
        family_id: parseInt(id),
        person_id: personCreate.id,
      },
      select: {
        person: true,
      },
    });
    const imgs = await prisma.doc.createMany({
      data: [
        {
          name: image1.imageName,
          person_id: childrenCreate.person.id,
        },
        {
          name: image2.imageName,
          person_id: childrenCreate.person.id,
        },
      ],
    });
    const data = { personCreate };
    res.status(200).json({
      success: true,
      data,
    });
  } catch (error) {
    console.log(error);
  }
};

const update = async (req, res) => {
  try {
    const { user } = req;
    const { img1, img2 } = req.files;

    const children = matchedData(req);
    const { id } = children;
    const pers = await prisma.person.findFirst({
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
        doc_number: children.doc_number,
      },
    });
    if (persDoc.doc_number == children.doc_number && persDoc.id != id) {
      handleHttpError(res, "DOC_NUMBER_EXIST");
      return;
    }

    if (!img1 || !img2) {
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
        deleteImage(i.name);
      });
    }

    children.birthdate = new Date(children.birthdate).toISOString();
    children.doc_number = children.doc_number.toString();
    const image1 = await uploadImage(img1[0]);
    const image2 = await uploadImage(img2[0]);
    const dateUpdate = new Date();
    children.update_time = dateUpdate;
    delete children.id;
    const childrenUpdate = await prisma.person.update({
      data: children,
      where: {
        id: parseInt(id),
      },
    });

    const imgs = await prisma.doc.createMany({
      data: [
        {
          name: image1.imageName,
          person_id: parseInt(id),
        },
        {
          name: image2.imageName,
          person_id: parseInt(id),
        },
      ],
    });
    const data = {
      childrenUpdate,
      img1: image1.imageName,
      img2: image2.imageName,
    };
    res.status(200).json({
      success: true,
      data,
    });
  } catch (error) {
    console.log(error);
    handleHttpError(res, "ERROR_UPDATE_CHILDREN");
  }
};

const get = async (req, res) => {
  try {
    req = matchedData(req);
    const id = parseInt(req.id);
    const children = await prisma.children.findFirst({
      where: {
        person_id: id,
      },
    });
    if (!children) {
      handleHttpError(res, "NOT_EXIST_CHILDREN", 404);
      return;
    }
    const data = await prisma.person.findUnique({
      where: {
        id,
      },
      select: {
        id: true,
        type_doc: true,
        doc_number: true,
        lastname: true,
        mLastname: true,
        name: true,
        gender: true,
        birthdate: true,
        doc: {
          select: {
            name: true,
          },
        },
        children: {
          select: {
            id: true,
          },
        },
      },
    });

    res.status(200).json({
      success: true,
      data: data,
    });
  } catch (error) {
    console.log(error);
    handleHttpError(res, "ERROR_GET_CHILDREN");
  }
};

export { store, update, get };
