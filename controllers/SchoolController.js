import { handleHttpError } from "../utils/handleHttpError.js";
import { matchedData } from "express-validator";
import { deleteImage, uploadImage } from "../utils/handleImg.js";
import prisma from "../utils/prisma.js";
import client from "../utils/client.js";

const store = async (req, res) => {
  try {
    const { user } = req;
    const { img } = req.files;
    const id = parseInt(req.params.id);
    let school = matchedData(req);
    const children = await prisma.person.findUnique({
      where: {
        id,
      },
      include: {
        children: {
          select: {
            id: true,
          },
        },
      },
    });
    if (!children) {
      handleHttpError(res, "NOT_EXIST_CHILDREN", 404);
      return;
    }
    const idChildren = children.children[0]?.id;

    school = { children_id: idChildren, ...school };

    const schoolExists = await prisma.school.findFirst({
      where: {
        children_id: id,
      },
    });

    if (schoolExists) {
      if (img) {
        if (schoolExists.lib_doc !== img[0].originalname) {
          deleteImage(schoolExists.lib_doc);
          const { imageName } = await uploadImage(img[0]);
          school = { lib_doc: imageName, ...school };
        }
      }

      const dateUpdate = new Date();
      school = { update_time: dateUpdate, ...school };
      const schoolUpdate = await prisma.school.update({
        data: school,
        where: {
          id: schoolExists.id,
        },
      });

      res.status(201).json({
        success: true,
        data: { schoolUpdate },
      });
      return;
    }

    //subir imagen
    if (img) {
      const { imageName } = await uploadImage(img[0]);
      school = { lib_doc: imageName, ...school };
    } else {
      handleHttpError(res, "INSUFFICIENT_IMAGES");
      return;
    }

    const schoolCreate = await prisma.school.create({
      data: school,
    });

    const data = { schoolCreate };
    res.status(201).json({
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
    const { img } = req.files;
    const id = parseInt(req.params.id);

    let school = matchedData(req);

    const schoolExist = await prisma.school.findUnique({
      where: {
        id,
      },
    });
    if (!schoolExist) {
      handleHttpError(res, "NOT_EXIST_SCHOOL", 404);
      return;
    }
    if (schoolExist.lib_doc !== img[0].originalname) {
      console.log("son diferentees");
      deleteImage(schoolExist.lib_doc);
      const { imageName } = await uploadImage(img[0]);
      school = { lib_doc: imageName, ...school };
    }
    const dateUpdate = new Date();
    school = { update_time: dateUpdate, ...school };

    const schoolUpdate = await prisma.school.update({
      data: school,
      where: {
        id,
      },
    });

    const data = { schoolUpdate };
    res.status(201).json({
      success: true,
      data,
    });
  } catch (error) {
    console.log(error);
  }
};

const get = async (req, res) => {
  try {
    req = matchedData(req);
    const id = parseInt(req.id);
    const school = await prisma.school.findUnique({
      where: {
        id,
      },
    });
    if (!school) {
      handleHttpError(res, "NOT_EXIST", 404);
      return;
    }

    res.status(200).json({
      success: true,
      data: school,
    });
  } catch (error) {
    console.log(error);
    handleHttpError(res, "ERROR_GET_CHILDREN");
  }
};

const show = async (req, res) => {
  try {
    const schools = await client.schools.findMany({
      select: {
        ubigean: true,
        name: true,
      },
    });
    res.status(200).json({
      success: true,
      data: schools,
    });
  } catch (error) {
    console.log(error);
    handleHttpError(res, "ERROR_GET_SCHOLS");
  }
};

export { store, update, get, show };
