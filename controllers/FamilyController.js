import { PrismaClient } from "@prisma/client";
import { handleHttpError } from "../utils/handleHttpError.js";

import { matchedData } from "express-validator";

const prisma = new PrismaClient();

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
};

export { store, show };
