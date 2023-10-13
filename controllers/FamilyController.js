import { handleHttpError } from "../utils/handleHttpError.js";
import { matchedData } from "express-validator";
import s3Client from "../utils/aws.js";
import { DeleteObjectCommand, PutObjectCommand } from "@aws-sdk/client-s3";
import prisma from "../utils/prisma.js";

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
    if (img) {
      const ext = img[0].originalname.split(".").pop();
      const imgName = `${Date.now()}.${ext}`;

      const result = await s3Client.send(
        new PutObjectCommand({
          Bucket: process.env.BUCKET_NAME,
          Key: "admision/" + imgName,
          Body: img[0].buffer,
        })
      );

      if (result.$metadata.httpStatusCode !== 200) {
        handleHttpError(res, "ERROR_UPLOAD_IMG");
        return;
      }
      body = { doc: imgName, ...body };
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
    handleHttpError("ERROR_CREATE_HOME");
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
      //si son diferentes eliminar imagen y actualizar
      const params = {
        Bucket: "caebucket",
        Key: "admision/" + homeExist.doc,
      };
      const command = new DeleteObjectCommand(params);
      try {
        const response = await s3Client.send(command);
        console.log("Objeto eliminado exitosamente:");
      } catch (error) {
        handleHttpError(res, "ERROR_UPDATE_IMAGE");
        console.error("Error al eliminar el objeto:", error);
      }

      //subimos la nueva imagen
      const ext = img[0].originalname.split(".").pop();
      const imgName = `${Date.now()}.${ext}`;
      const result = await s3Client.send(
        new PutObjectCommand({
          Bucket: process.env.BUCKET_NAME,
          Key: "admision/" + imgName,
          Body: img[0].buffer,
        })
      );
      //agregamos el nombre a la db
      body = { doc: imgName, ...body };

      if (result.$metadata.httpStatusCode !== 200) {
        handleHttpError(res, "ERROR_UPLOAD_IMG");
        return;
      }
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

    res.status(200).json({
      success: true,
      data,
    });
  } catch (error) {
    console.log(error);
    handleHttpError("ERROR_CREATE_HOME");
  }
};

export { store, show, get, createHome, updateHome };
