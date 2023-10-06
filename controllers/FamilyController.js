import { PrismaClient } from "@prisma/client";
import { handleHttpError } from "../utils/handleHttpError.js";

import { matchedData } from "express-validator";

const prisma = new PrismaClient();

const store = async (req, res) => {
  try {
    //  req = matchedData(req);
    const { name, id } = req.body;
    const user = await prisma.user.findFirst({
      where: {
        id,
      },
    });
    if (!user) {
      handleHttpError(res, "USER_NOT_EXIST", 404);
      return;
    }
    const family = await prisma.family.create({
      data: {
        padreId: id,
        name,
      },
    });
    res.send(family);
  } catch (error) {
    console.log(error);
    handleHttpError(res, "ERROR_CREATE_FAMILY");
  }
};

export { store };
