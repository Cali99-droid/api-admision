import { PrismaClient } from "@prisma/client";
import { handleHttpError } from "../utils/handleHttpError.js";
import { body, matchedData } from "express-validator";

const prisma = new PrismaClient();

const store = async (req, res) => {
  try {
    let body = matchedData(req);
    const id = parseInt(body.id);

    const children = await prisma.person.findUnique({
      where: {
        id,
      },
      include: {
        children: true,
      },
    });
    if (!children) {
      handleHttpError(res, "NOT_EXIST_PERSON", 404);
      return;
    }
    if (!children.children[0]?.id) {
      handleHttpError(res, "NOT_EXIST_CHILDREN", 404);
      return;
    }
    const child = children.children[0];
    const existVacant = await prisma.vacant.findFirst({
      where: {
        children_id: child.id,
      },
    });

    delete body.id;
    if (existVacant) {
      /***Actualizamos */

      const updateVacant = await prisma.vacant.update({
        data: body,
        where: {
          id: existVacant.id,
        },
      });
      res.status(201).json({
        success: true,
        data: {
          id: updateVacant.id,
        },
      });
      return;
    }
    body = { children_id: child.id, ...body };
    const createVacant = await prisma.vacant.create({
      data: body,
    });

    res.status(201).json({
      success: true,
      data: {
        id: createVacant.id,
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
    const children = await prisma.person.findUnique({
      where: {
        id,
      },
      include: {
        children: true,
      },
    });
    if (!children) {
      handleHttpError(res, "NOT_EXIST_PERSON", 404);
      return;
    }
    if (!children.children[0]?.id) {
      handleHttpError(res, "NOT_EXIST_CHILDREN", 404);
      return;
    }
    const child = children.children[0];

    const vacant = await prisma.vacant.findFirst({
      where: {
        children_id: child.id,
      },
    });
    const data = {
      id: vacant?.id,
      grade: vacant.grade,
      level: vacant.level,
      campus: vacant.campus,
      year: vacant.year,
      children_id: vacant.children_id,
    };
    res.status(200).json({
      success: true,
      data,
    });
  } catch (error) {
    console.log(error);
    handleHttpError(res, "ERROR_GET_CHILDREN");
  }
};

export { store, get };
