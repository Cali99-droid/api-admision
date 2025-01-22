import { PrismaClient } from "@prisma/client";
import { handleHttpError } from "../utils/handleHttpError.js";
import { matchedData } from "express-validator";
import { deleteImage, uploadImage } from "../utils/handleImg.js";
import { updateUserCRM } from "../helpers/updateUserCRM.js";

const prisma = new PrismaClient();

const store = async (req, res) => {
  try {
    const { user } = req;
    const { img1, img2 } = req.files;

    req = matchedData(req);

    const { person, userData, id } = req;

    const pers = await prisma.person.findFirst({
      where: {
        OR: [
          {
            email: {
              equals: userData.email,
            },
          },
        ],
      },
    });

    if (pers) {
      handleHttpError(res, "SOME_DATA_EXIST");
      return;
    }

    // si la familia no tiene un conyugue
    const family = await prisma.family.findUnique({
      where: {
        id: parseInt(id),
        AND: {
          parent_one: user.personId,
          parent_two: {
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

    const pe = await prisma.person.findFirst({
      where: {
        id: user.personId,
      },
    });
    // console.log(pe);
    // console.log(person);
    if (pe.role === person.role) {
      handleHttpError(res, "REPEAT_ROLE");
      return;
    }

    person.birthdate = new Date(person.birthdate).toISOString();
    person.doc_number = person.doc_number.toString();

    const image1 = await uploadImage(img1[0]);
    const image2 = await uploadImage(img2[0]);
    const personCreate = await prisma.person.create({
      data: person,
    });

    // const userCreate = await prisma.user.create({
    //   data: {
    //     email: userData.email,
    //     phone: userData.phone.toString(),
    //     person_id: personCreate.id,
    //   },
    // });

    const familyUpdateMarried = await prisma.family.update({
      data: {
        parent_two: personCreate.id,
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

    //si la imagen 1 no se actualiza
    if (req.img1 && img2) {
      console.log("se reemplaza imagen 2");
      const person = await prisma.doc.findFirst({
        where: {
          name: req.img1,
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
              name: req.img1,
            },
          ],
        },
      });

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
    if (req.img2 && img1) {
      console.log("se reemplaza imagen 1");
      const person = await prisma.doc.findFirst({
        where: {
          name: req.img2,
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
              name: req.img2,
            },
          ],
        },
      });

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
    const { person, userData, id } = req;
    // console.log(person);
    // console.log(userData);
    // console.log(id);

    if (user.personId != id) {
      console.log("entro diferente id");
      const pe = await prisma.person.findFirst({
        where: {
          id: user.personId,
        },
      });

      if (pe.role === person.role) {
        handleHttpError(res, "REPEAT_ROLE");
        return;
      }
    } else {
      const spouse = await prisma.family.findFirst({
        where: {
          parent_one: user.personId,
        },
      });
      if (spouse?.parent_two) {
        const us = await prisma.person.findFirst({
          where: {
            id: spouse.parent_two,
          },
        });
        // console.log(spouse)
        // console.log(us)

        if (us.role === person.role) {
          handleHttpError(res, "REPEAT_ROLE");
          return;
        }
      }
    }

    // console.log(pe);
    // console.log(person);

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

    // const persDoc = await prisma.person.findFirst({
    //   where: {
    //     doc_number: person.doc_number,
    //   },
    // });

    // if (persDoc?.doc_number == person.doc_number && persDoc?.id != id) {
    //   handleHttpError(res, "DOC_NUMBER_EXIST");
    //   return;
    // }

    if (userData) {
      const us = await prisma.person.findFirst({
        where: {
          OR: [
            {
              email: userData.email ? userData.email : undefined,
            },
            // {
            //   phone: userData.phone ? userData.phone : undefined,
            // },
            // {
            //   doc_number: person.doc_number.toString(),
            // },
          ],
        },
      });
      if (us) {
        if (us.id != id) {
          handleHttpError(res, "EMAIL_EXIST");
          return;
        }
      }
      if (userData.phone) {
        person.phone = userData.phone;
      }
      if (userData.email) {
        person.email = userData.email;
      }
    }

    // if (persDoc?.doc_number == person.doc_number && persDoc?.id != id) {
    //   handleHttpError(res, "DOC_NUMBER_EXIST");
    //   return;
    // }

    person.birthdate = new Date(person.birthdate).toISOString();
    if (person.issuance_doc) {
      person.issuance_doc = new Date(person.issuance_doc).toISOString();
    }
    if (person.validate) {
      person.validate = parseInt(person.validate);
    }
    person.doc_number = person.doc_number.toString();
    const dateUpdate = new Date();
    person.update_time = dateUpdate;
    person.matchCRM = 1;
    // console.log(person);
    const personUpdate = await prisma.person.update({
      data: person,
      where: {
        id: parseInt(id),
      },
    });
    if (personUpdate.id === user.personId) {
      let personCRM = {
        crmGHLId: personUpdate.crmGHLId,
        phone: personUpdate.phone,
        name: personUpdate.name,
        lastName: personUpdate.lastname + " " + personUpdate.mLastname,
      };
      const resp = await updateUserCRM(personCRM);

      if (!resp) {
        const updateMatch = await prisma.person.update({
          data: {
            matchCRM: 0,
          },
          where: {
            id: parseInt(id),
          },
        });
      }
    }

    // const userUpdate = await prisma.user.updateMany({
    //   data: {
    //     email: userData.email,
    //     phone: userData.phone.toString(),
    //     person_id: personUpdate.id,
    //     update_time: dateUpdate,
    //   },
    //   where: {
    //     person_id: parseInt(id),
    //   },
    // });

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
    /** */
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
    const { user } = req;
    req = matchedData(req);

    const id = parseInt(req.id);
    const spouse = await prisma.person.findUnique({
      where: {
        id: id,
      },
      include: {
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
    // const email = spouse.user[0]?.email ?? null;
    // const phone = spouse.user[0]?.phone ?? null;
    // const confirmedPhone = spouse.user[0]?.confirmed_phone ?? null;
    const img1 = spouse.doc[0]?.name ?? null;
    const img2 = spouse.doc[1]?.name ?? null;
    delete spouse.user;
    delete spouse.doc;
    const data = {
      ...spouse,
      // email,
      // phone,
      // confirmedPhone,
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

const addGHLIdInPerson = async (req, res) => {
  try {
    req = matchedData(req);
    const { ...data } = req;
    console.log(data);
    const person = await prisma.person.update({
      where: { id: parseInt(data.personId) },
      data: { crmGHLId: data.crmGHLId },
    });
    res.status(201).json({
      success: true,
      data: {
        email: person.email,
        crmGHLId: person.crmGHLId,
      },
    });
  } catch (error) {
    console.log(error);
    handleHttpError(res, "ERROR_ADD_CRMID_PERSON");
  }
};
export { store, update, get, addGHLIdInPerson };
