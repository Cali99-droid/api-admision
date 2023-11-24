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

    if (!img1 || !img2) {
      handleHttpError(res, "INSUFFICIENT_IMAGES");
      return;
    }
    const pers = await prisma.person.findFirst({
      where: {
        doc_number: children.doc_number.toString(),
      },
    });
    if (pers) {
      handleHttpError(res, "NUMBER_DOC_EXIST");
      return;
    }
    // const family = await prisma.family.findUnique({
    //   where: {
    //     id: parseInt(id),
    //     AND: {
    //       mainParent: user.id,
    //     },
    //   },
    // });
    // if (!family) {
    //   handleHttpError(res, "FAMILY_NOT_AVAILABLE");
    //   return;
    // }

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
    const data = { id: personCreate.id };
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
    if (children.img1 && img2) {
      console.log("se reemplaza imagen 2");
      const person = await prisma.doc.findFirst({
        where: {
          name: children.img1,
        },
        select: {
          person_id: true,
        },
      });
      const imageReplace = await prisma.doc.findFirst({
        where: {
          person_id: person.person_id,
          NOT: [
            {
              name: children.img1,
            },
          ],
        },
      });
      console.log(imageReplace);
      const image2 = await uploadImage(img2[0]);
      const replaceImg = await prisma.doc.update({
        data: {
          name: image2.imageName,
        },
        where: {
          id: imageReplace.id,
        },
      });
      deleteImage(imageReplace.name);
      // console.log(imageReplace);
      // console.log("llego imagen ", req.img2);
    }
    if (children.img2 && img1) {
      console.log("se reemplaza imagen 1");
      const person = await prisma.doc.findFirst({
        where: {
          name: children.img2,
        },
        select: {
          person_id: true,
        },
      });
      const imageReplace = await prisma.doc.findFirst({
        where: {
          person_id: person.person_id,
          NOT: [
            {
              name: children.img2,
            },
          ],
        },
      });
      console.log(imageReplace);
      const image1 = await uploadImage(img1[0]);
      const replaceImg = await prisma.doc.update({
        data: {
          name: image1.imageName,
        },
        where: {
          id: imageReplace.id,
        },
      });
      deleteImage(imageReplace.name);
      // console.log(imageReplace);
      // console.log("llego imagen ", req.img2);
    }
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
    if (persDoc) {
      if (persDoc.doc_number == children.doc_number && persDoc.id != id) {
        handleHttpError(res, "DOC_NUMBER_EXIST");
        return;
      }
    }

    if (img1 || img2) {
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
      const image1 = await uploadImage(img1[0]);
      const image2 = await uploadImage(img2[0]);
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
      // handleHttpError(res, "INSUFFICIENT_IMAGES");
      // return;
    }

    children.birthdate = new Date(children.birthdate).toISOString();
    if (children.issuance_doc) {
      children.issuance_doc = new Date(children.issuance_doc).toISOString();
    }
    if (children.validate) {
      children.validate = parseInt(children.validate);
    }
    children.doc_number = children.doc_number.toString();

    const dateUpdate = new Date();
    children.update_time = dateUpdate;
    delete children.id;
    const childrenUpdate = await prisma.person.update({
      data: children,
      where: {
        id: parseInt(id),
      },
    });
    const actChild = await prisma.children.updateMany({
      data: {
        validate: children.validate ? children.validate : 0,
      },
      where: {
        person_id: childrenUpdate.id,
      },
    });

    // const data = {
    //   childrenUpdate,
    //   img1: image1.imageName,
    //   img2: image2.imageName,
    // };
    const data = { id: childrenUpdate.id };
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
    const childrenExist = await prisma.person.findUnique({
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
      },
    });

    const img1 = childrenExist.doc[0]?.name ?? null;
    const img2 = childrenExist.doc[1]?.name ?? null;

    delete childrenExist.doc;
    const data = {
      ...childrenExist,
      img1,
      img2,
    };
    res.status(200).json({
      success: true,
      data: data,
    });
  } catch (error) {
    console.log(error);
    handleHttpError(res, "ERROR_GET_CHILDREN");
  }
};

/**retorna segun la familia */
const show = async (req, res) => {
  try {
    const { user } = req;
    const params = matchedData(req);
    const { id } = params;
    const isMyFamily = await prisma.family.findFirst({
      where: {
        id: parseInt(id),
        AND: {
          mainParent: user.id,
        },
      },
    });
    if (!isMyFamily) {
      handleHttpError(res, "NOT_EXIST_FAMILY", 404);
      return;
    }
    const childrens = await prisma.children.findMany({
      where: {
        family_id: parseInt(id),
      },
      select: {
        person: {
          select: {
            id: true,
            name: true,
            lastname: true,
            mLastname: true,
            gender: true,
            create_time: true,
          },
        },
      },
    });

    const data = childrens.map((e) => {
      const { person } = e;
      return person;
    });
    res.status(200).json({
      success: true,
      data,
    });
  } catch (error) {
    console.log(error);
    handleHttpError(res, "ERROR_GET_CHILDRENS");
  }
};

export { store, update, get, show };
