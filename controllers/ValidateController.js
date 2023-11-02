import { PrismaClient } from "@prisma/client";
import { handleHttpError } from "../utils/handleHttpError.js";
import { body, matchedData } from "express-validator";
import { generateCode } from "../utils/handleToken.js";

const prisma = new PrismaClient();

const store = async (req, res) => {
  try {
    const body = matchedData(req);
    const code = body.code;

    const validateUser = await prisma.user.findFirst({
      where: {
        code,
      },
    });
    console.log(validateUser);
    if (!validateUser) {
      handleHttpError(res, "INVALID_CODE", 404);
      return;
    }

    const validatedUser = await prisma.user.update({
      data: {
        confirmed_phone: 1,
        code: "",
      },
      where: {
        id: validateUser.id,
      },
    });

    res.status(201).json({
      success: true,
      data: {
        id: validatedUser.id,
      },
    });
  } catch (error) {
    console.log(error);
    handleHttpError(res, "ERROR_CREATE_VACANT");
  }
};

const get = async (req, res) => {
  try {
    req = matchedData(req);
    const id = parseInt(req.id);

    const person = await prisma.person.findUnique({
      where: {
        id,
      },
      include: {
        user: {
          select: {
            id: true,
          },
        },
      },
    });
    if (!person) {
      handleHttpError(res, "NOT_EXISTS_PERSON", 404);
      return;
    }
    if (!person.user[0]) {
      handleHttpError(res, "NOT_EXISTS_USER", 404);
      return;
    }

    const userToConfirm = await prisma.user.update({
      data: {
        code: generateCode().toString(),
      },
      where: {
        id: person.user[0].id,
      },
    });

    res.status(201).json({
      success: true,
      data: {
        code: userToConfirm.code,
      },
    });
  } catch (error) {
    console.log(error);
    handleHttpError(res, "ERROR_GET_CODE");
  }
};

export { store, get };
