import { PrismaClient } from "@prisma/client";
import { handleHttpError } from "../utils/handleHttpError.js";
import { body, matchedData } from "express-validator";
import { deleteImage, uploadImage } from "../utils/handleImg.js";

const prisma = new PrismaClient();

const deleteImg = async (req, res) => {
  try {
    const { name } = req.body;
    console.log(name);
    const doc = await prisma.docsIncome.findFirst({
      where: {
        name,
      },
    });
    if (!doc) {
      handleHttpError(res, "ERROR_DELETE_IMG");
    }
    const docs = await prisma.docsIncome.delete({
      where: {
        id: doc.id,
      },
    });
    deleteImage(name);

    res.status(201).json({
      success: true,
      data: {
        id: name,
      },
    });
  } catch (error) {
    console.log(error);
    handleHttpError(res, "ERROR_UPDATE_AGREE");
  }
};

const addImg = async (req, res) => {
  try {
    const { id } = req.params;
    const images = [];
    for (const file of req.files) {
      const { imageName } = await uploadImage(file);

      images.push(imageName);
    }
    let docsIncome;
    if (images.length > 0) {
      docsIncome = await prisma.docsIncome.createMany({
        data: images.map((name) => ({
          name,
          income_id: parseInt(id),
        })),
      });
    }

    res.status(201).json({
      success: true,
      data: {
        count: docsIncome.length,
      },
    });
  } catch (error) {
    console.log(error);
    handleHttpError(res, "ERROR_UPDATE_AGREE");
  }
};

export { deleteImg, addImg };
