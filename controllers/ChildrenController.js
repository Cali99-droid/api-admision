import { handleHttpError } from "../utils/handleHttpError.js";
import { matchedData } from "express-validator";
import { deleteImage, uploadImage } from "../utils/handleImg.js";
import prisma from "../utils/prisma.js";
import FamilyRepository from "../repositories/FamilyRepository.js";

const store = async (req, res) => {
  try {
    const { user } = req;
    const userSession = await prisma.user.findUnique({
      where: {
        sub: user.sub,
      },
    });
    const { children_img1, children_img2 } = req.files;
    // Luego aplicamos matchedData para obtener solo los datos validados
    const data = matchedData(req);
    const { id } = req.params;
    if (!children_img1 || !children_img2) {
      handleHttpError(res, "INSUFFICIENT_IMAGES");
      return;
    }
    const children = {
      name: data.children_name,
      lastname: data.children_lastname,
      mLastname: data.children_mLastname,
      type_doc: data.children_type_doc,
      doc_number: data.children_doc_number.toString(),
      gender: data.children_gender,
      birthdate: new Date(data.children_birthdate).toISOString(),
    };
    const father = {
      name: data.father_name,
      lastname: data.father_lastname,
      mLastname: data.father_mLastname,
      type_doc: data.father_type_doc,
      doc_number: data.father_doc_number.toString(),
    };

    const mother = {
      name: data.mother_name,
      lastname: data.mother_lastname,
      mLastname: data.mother_mLastname,
      type_doc: data.mother_type_doc,
      doc_number: data.mother_doc_number.toString(),
    };
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
          parent_one: userSession.person_id,
        },
      },
    });
    if (!family) {
      handleHttpError(res, "FAMILY_NOT_AVAILABLE");
      return;
    }
    if (
      userSession.parentesco === "Padre" &&
      userSession.dni !== father.doc_number
    ) {
      handleHttpError(res, "NUMBER_DOC_DOES_NOT_MATCH1", 404);
      return;
    }

    if (
      userSession.parentesco === "Madre" &&
      userSession.dni !== mother.doc_number
    ) {
      handleHttpError(res, "NUMBER_DOC_DOES_NOT_MATCH2", 404);
      return;
    }
    if (!family.parent) {
      console.log("entra pariente");
      if (userSession.parentesco === "Padre") {
        let userParent;
        const exist = await prisma.person.findFirst({
          where: {
            doc_number: mother.doc_number,
          },
        });

        if (!exist) {
          mother.role = "M";
          const parent = await prisma.person.create({
            data: mother,
          });
          console.log(parent);
          const user = await prisma.user.create({
            data: {
              email: `${parent.doc_number}@gmail.com`,
              person_id: parent.id,
              phone: parent.doc_number,
            },
          });
          userParent = user;
        } else {
          console.log("entra2");
          const findUser = await prisma.user.findFirst({
            where: {
              person_id: exist.id,
            },
          });
          console.log(exist.id);
          console.log(findUser);
          userParent = findUser;
        }

        await FamilyRepository.update(+family.id, { parent: userParent.id });
      }
      if (userSession.parentesco === "Madre") {
        let userParent;
        const exist = await prisma.user.findFirst({
          where: {
            person: {
              doc_number: father.doc_number,
            },
          },
        });
        if (!exist) {
          father.role = "P";
          const parent = await prisma.person.create({
            data: father,
          });
          const findUser = await prisma.user.create({
            email: `${parent.doc_number}@gmail.com`,
            person_id: parent.id,
          });
          userParent = findUser;
        } else {
          userParent = exist;
        }

        await FamilyRepository.update(+family.id, { parent: userParent.id });
      }
      // if(user.person.role === 'M'){
      //   father.role='P';
      //   const parent = await prisma.person.create({
      //     data: father,
      //   });
      //   const user = await prisma.user.create({
      //     email:`${parent.doc_number}@gmail.com`,
      //   })
      //   await FamilyRepository.update(+family.id, { parent:user.id });
      // }
    }

    children.doc_number = children.doc_number.toString();
    const image1 = await uploadImage(children_img1[0]);
    const image2 = await uploadImage(children_img2[0]);
    // delete children.id;
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
    res.status(200).json({
      success: true,
      data: {
        id: personCreate.id,
      },
    });
  } catch (error) {
    console.log(error);
  }
};

const update = async (req, res) => {
  try {
    const { user } = req;
    const { children_img1, children_img2 } = req.files;
    const data = matchedData(req);
    const { id } = req.params;
    const children = {
      name: data.children_name,
      lastname: data.children_lastname,
      mLastname: data.children_mLastname,
      type_doc: data.children_type_doc,
      doc_number: data.children_doc_number.toString(),
      gender: data.children_gender,
      birthdate: new Date(data.children_birthdate).toISOString(),
    };
    const father = {
      name: data.father_name,
      lastname: data.father_lastname,
      mLastname: data.father_mLastname,
      type_doc: data.father_type_doc,
      doc_number: data.father_doc_number.toString(),
    };

    const mother = {
      name: data.mother_name,
      lastname: data.mother_lastname,
      mLastname: data.mother_mLastname,
      type_doc: data.mother_type_doc,
      doc_number: data.mother_doc_number.toString(),
    };
    if (data.children_img1 && children_img2) {
      console.log("se reemplaza imagen 2");
      const person = await prisma.doc.findFirst({
        where: {
          name: data.children_img1,
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
              name: data.children_img1,
            },
          ],
        },
      });
      console.log(imageReplace);
      const image2 = await uploadImage(children_img2[0]);
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
    if (data.children_img2 && children_img1) {
      console.log("se reemplaza imagen 1");
      const person = await prisma.doc.findFirst({
        where: {
          name: data.children_img2,
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
              name: data.children_img2,
            },
          ],
        },
      });
      console.log(imageReplace);
      const image1 = await uploadImage(children_img1[0]);
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
    const existChildren = await prisma.person.findFirst({
      where: {
        id: parseInt(id),
      },
    });
    if (!existChildren) {
      handleHttpError(res, "CHILDREN_DOES_NOT_EXIST");
      return;
    }
    const persDoc = await prisma.person.findFirst({
      where: {
        doc_number: data.doc_number,
      },
    });
    if (persDoc) {
      if (persDoc.doc_number == children.doc_number && persDoc.id != id) {
        handleHttpError(res, "DOC_NUMBER_EXIST");
        return;
      }
    }

    if (children_img1 && children_img2) {
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

    // data.birthdate = new Date(data.birthdate).toISOString();
    // if (data.issuance_doc) {
    //   data.issuance_doc = new Date(children.data).toISOString();
    // }
    // if (data.validate) {
    //   data.validate = parseInt(data.validate);
    // }
    // data.doc_number = data.doc_number.toString();

    // const dateUpdate = new Date();
    // data.update_time = dateUpdate;
    // // delete children.id;
    // if (data.children_img1) delete data.children_img1;
    // if (data.children_img2) delete data.children_img2;

    const childrenUpdate = await prisma.person.update({
      data: children,
      where: {
        id: parseInt(id),
      },
    });
    console.log(father);
    console.log(mother);
    if (data.father_id || data.father_id !== null) {
      console.log(data.father_id);
      await prisma.person.update({
        data: father,
        where: {
          id: parseInt(data.father_id),
        },
      });
    }
    if (data.mother_id || data.mother_id !== null) {
      await prisma.person.update({
        data: mother,
        where: {
          id: parseInt(data.mother_id),
        },
      });
    }
    const actChild = await prisma.children.updateMany({
      data: {
        validate: children.validate ? parseInt(children.validate) : 0,
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
    // const data = { id: childrenUpdate.id };
    res.status(200).json({
      success: true,
      data: {
        id: childrenUpdate.id,
      },
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
    console.log("llego");
    if (!children) {
      handleHttpError(res, "NOT_EXIST_CHILDREN", 404);
      return;
    }
    const dnisParents = await prisma.family.findUnique({
      where: {
        id: children.family_id,
      },
      select: {
        conyugue: {
          select: {
            person: true,
          },
        },
        mainConyugue: {
          select: {
            person: true,
          },
        },
      },
    });

    const mainParent = dnisParents.mainConyugue.person;
    const parent = dnisParents.conyugue?.person;
    console.log(dnisParents);
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
        children: {
          select: {
            validate: true,
          },
        },
        doc: {
          select: {
            name: true,
          },
        },
      },
    });

    const img1 = childrenExist.doc[0]?.name ?? null;
    const img2 = childrenExist.doc[1]?.name ?? null;
    const validate = childrenExist.children[0].validate;

    delete childrenExist.doc;
    delete childrenExist.children;
    let docFather = mainParent?.role === "P" ? mainParent?.doc_number : null;
    let docMother = mainParent?.role === "P" ? mainParent?.doc_number : null;
    let father;
    let mother;
    if (mainParent?.role === "P") {
      father = {
        father_id: mainParent.id,
        father_name: mainParent.name,
        father_lastname: mainParent.lastname,
        father_mLastname: mainParent.mLastname,
        father_type_doc: mainParent.type_doc ? mainParent?.type_doc : null,
        father_doc_number: mainParent.doc_number,
      };
      mother = {
        mother_id: parent.id,
        mother_name: parent.name,
        mother_lastname: parent.lastname,
        mother_mLastname: parent.mLastname,
        mother_type_doc: parent.type_doc ? parent?.type_doc : null,
        mother_doc_number: parent.doc_number,
      };
    }
    if (mainParent?.role === "M") {
      mother = {
        mother_id: mainParent.id,
        mother_lastname: mainParent.lastname,
        mother_mLastname: mainParent.mLastname,
        mother_type_doc: mainParent.type_doc ? mainParent?.type_doc : null,
        mother_doc_number: mainParent.doc_number,
      };
      father = {
        father_id: parent.id,
        father_name: parent.name,
        father_lastname: parent.lastname,
        father_mLastname: parent.mLastname,
        father_type_doc: parent.type_doc ? parent?.type_doc : null,
        father_doc_number: parent.doc_number,
      };
    }
    const data = {
      ...childrenExist,
      img1,
      img2,
      ...father,
      ...mother,
      validate,
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
