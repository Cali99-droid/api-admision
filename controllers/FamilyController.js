import { handleHttpError } from "../utils/handleHttpError.js";
import { matchedData } from "express-validator";
import s3Client from "../utils/aws.js";
import { DeleteObjectCommand, PutObjectCommand } from "@aws-sdk/client-s3";
import prisma from "../utils/prisma.js";
import sharp from "sharp";
import { deleteImage, uploadImage } from "../utils/handleImg.js";

const store = async (req, res) => {
  try {
    const { user } = req;
    const { name } = matchedData(req);
    // const userExists = await prisma.user.findFirst({
    //   where: {
    //     id,
    //   },
    // });
    // if (!userExists) {
    //   handleHttpError(res, "USER_NOT_EXIST", 404);
    //   return;
    // }
    const family = await prisma.family.create({
      data: {
        padreId: user.id,
        name,
      },
    });
    const data = {
      id: family.id,
      name: family.name,
    };
    res.status(201).json({
      success: true,
      data: data,
    });
  } catch (error) {
    console.log(error);
    handleHttpError(res, "ERROR_CREATE_FAMILY");
  }
};

const show = async (req, res) => {
  try {
    const { user } = req;
    if (!user) {
      handleHttpError(res, "NOT_EXIST_USER");
    }
    const data = await prisma.family.findMany({
      where: {
        padreId: user.id,
      },
      select: {
        id: true,
        name: true,
        home: true,
        children: true,
      },
    });
    res.status(200).json({
      success: true,
      data: data,
    });
  } catch (error) {
    console.log(error);
    handleHttpError(res, "ERROR_GET_FAMILIES");
  }
};

const get = async (req, res) => {
  try {
    req = matchedData(req);
    const id = parseInt(req.id);

    const data = await prisma.family.findUnique({
      where: {
        id,
      },
      select: {
        id: true,
        name: true,
        conyugue: true,
        children: true,
      },
    });
    res.status(200).json({
      success: true,
      data: data,
    });
  } catch (error) {
    console.log(error);
    handleHttpError(res, "ERROR_GET_FAMILY");
  }
};

const createHome = async (req, res) => {
  try {
    let { body } = req;
    const { user } = req;
    const id = parseInt(req.params.id);
    const { img } = req.files;

    const family = await prisma.family.findUnique({
      where: {
        id: id,
        AND: {
          padreId: user.id,
        },
      },
    });

    if (!family) {
      handleHttpError(res, "FAMILY_NOT_AVAILABLE");
      return;
    }

    const homeExist = await prisma.home.findFirst({
      where: {
        family_id: id,
      },
    });
    if (homeExist) {
      handleHttpError(res, "HOME_ALREADY_EXIST");
      return;
    }

    //subir imagen
    if (img) {
      const { imageName } = await uploadImage(img[0]);
      body = { doc: imageName, ...body };
    }

    body = { family_id: id, ...body };

    const home = await prisma.home.create({
      data: body,
    });
    const data = { id: home.id };

    res.status(200).json({
      success: true,
      data,
    });
  } catch (error) {
    console.log(error);
    handleHttpError(res, "ERROR_CREATE_HOME");
  }
};
const updateHome = async (req, res) => {
  try {
    let { body } = req;
    const { user } = req;
    const id = parseInt(req.params.id);
    const { img } = req.files;

    const family = await prisma.family.findUnique({
      where: {
        id: id,
        AND: {
          padreId: user.id,
        },
      },
    });

    if (!family) {
      handleHttpError(res, "FAMILY_NOT_AVAILABLE");
      return;
    }

    const homeExist = await prisma.home.findFirst({
      where: {
        family_id: id,
      },
    });
    if (!homeExist) {
      handleHttpError(res, "HOME_NOT_EXIST");
      return;
    }

    if (homeExist.doc !== img[0].originalname) {
      console.log("son diferentees");
      deleteImage(homeExist.doc);
      const { imageName } = await uploadImage(img[0]);
      body = { doc: imageName, ...body };
    }
    const dateUpdate = new Date();
    body = { family_id: id, ...body };
    body = { update_time: dateUpdate, ...body };

    const home = await prisma.home.update({
      data: body,
      where: {
        id: homeExist.id,
      },
    });
    const data = { id: home.id };

    res.status(201).json({
      success: true,
      data,
    });
  } catch (error) {
    console.log(error);
    handleHttpError("ERROR_CREATE_HOME");
  }
};

const getHome = async (req, res) => {
  const id = parseInt(req.params.id);
  const { user } = req;
  const family = await prisma.family.findUnique({
    where: {
      id: id,
      AND: {
        padreId: user.id,
      },
    },
  });

  if (!family) {
    handleHttpError(res, "FAMILY_NOT_AVAILABLE");
    return;
  }

  const home = await prisma.home.findFirst({
    where: {
      family_id: id,
    },
    select: {
      id: true,
      address: true,
      reference: true,
      district: true,
      doc: true,
    },
  });

  const data = { home };

  res.status(200).json({
    success: true,
    data,
  });
};

const createIncome = async (req, res) => {
  let { body } = req;
  const { user } = req;
  const id = parseInt(req.params.id);
  const { img } = req.files;
};

export { store, show, get, createHome, updateHome, getHome, createIncome };
