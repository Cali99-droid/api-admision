import { PrismaClient } from "@prisma/client";
import { handleHttpError } from "../utils/handleHttpError.js";
import { body, matchedData } from "express-validator";
import { deleteImage, uploadImage } from "../utils/handleImg.js";

const prisma = new PrismaClient();

const deleteImg = async (req, res) => {
  try {
    const { name } = req.body;

    const doc = await prisma.docsIncome.findFirst({
      where: {
        name,
      },
    });
    if (!doc) {
      handleHttpError(res, "ERROR_DELETE_IMG");
      return;
    }
    const docs = await prisma.docsIncome.delete({
      where: {
        id: doc.id,
      },
    });
    deleteImage(name);

    const documents = await prisma.docsIncome.findMany({
      where: {
        income_id: doc.income_id,
      },
      select: {
        name: true,
      },
    });
    const data = documents.map((d) => {
      return d.name;
    });

    res.status(201).json({
      success: true,
      data,
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
    const documents = await prisma.docsIncome.findMany({
      where: {
        income_id: parseInt(id),
      },
      select: {
        name: true,
      },
    });
    const data = documents.map((d) => {
      return d.name;
    });

    res.status(201).json({
      success: true,
      data,
    });
  } catch (error) {
    console.log(error);
    handleHttpError(res, "ERROR_UPDATE_IMG");
  }
};

export { deleteImg, addImg };
