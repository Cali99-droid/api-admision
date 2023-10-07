import { handleHttpError } from "../utils/handleHttpError.js";
import { verifyToken } from "../utils/handleJwt.js";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export const authMiddleware = async (req, res, next) => {
  try {
    if (!req.headers.authorization) {
      handleHttpError(res, "NEED_SESSION", 403);
      return;
    }

    const token = req.headers.authorization.split(" ").pop();
    const dataToken = await verifyToken(token);

    if (!dataToken) {
      handleHttpError(res, "NOT_PAYLOAD_DATA", 401);
      return;
    }

    const user = await prisma.user.findUnique({
      where: {
        id: dataToken["id"],
      },
    });
    req.user = user;
    next();
  } catch (e) {
    handleHttpError(res, "NOT_SESSION", 401);
  }
};
