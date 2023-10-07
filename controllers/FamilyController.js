import { PrismaClient } from "@prisma/client";
import { handleHttpError } from "../utils/handleHttpError.js";

import { matchedData } from "express-validator";

const prisma = new PrismaClient();

const store = async (req, res) => {
  try {
    //  req = matchedData(req);
    const { user } = req;
    const { name } = req.body;
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
    res.status(201);
    res.send(family);
  } catch (error) {
    console.log(error);
    handleHttpError(res, "ERROR_CREATE_FAMILY");
  }
};

export { store };
