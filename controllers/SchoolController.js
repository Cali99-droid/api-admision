import { handleHttpError } from "../utils/handleHttpError.js";
import { matchedData } from "express-validator";
import { deleteImage, uploadImage } from "../utils/handleImg.js";
import prisma from "../utils/prisma.js";

const store = async (req, res) => {
  try {
    const { user } = req;
    const { img } = req.files;
    const id = parseInt(req.params.id);

    let school = matchedData(req);

    const children = await prisma.children.findUnique({
      where: {
        id,
      },
    });
    if (!children) {
      handleHttpError(res, "NOT_EXIST_CHILDREN", 404);
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

    const childrenUpdate = await prisma.children.update({
      data: {
        school_id: schoolCreate.id,
      },
      where: {
        id,
      },
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

export { store, update, get };
