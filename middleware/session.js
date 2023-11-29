import { handleHttpError } from "../utils/handleHttpError.js";
import { verifyToken } from "../utils/handleJwt.js";
import { PrismaClient } from "@prisma/client";
import { validateRol } from "../utils/handleRol.js";
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
      include: {
        user_roles: {
          select: {
            roles_id: true,
          },
        },
      },
    });
    req.user = user;
    next();
  } catch (e) {
    handleHttpError(res, "NOT_SESSION", 401);
  }
};

export const sessionSecretaryMiddleware = async (req, res, next) => {
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
      include: {
        user_roles: {
          select: {
            roles: true,
            token_boss: true,
          },
        },
      },
    });
    if (user.user_roles.length <= 0) {
      handleHttpError(res, "NOT_HAVE_PERMISSIONS", 403);
      return;
    }
    const haveRol = await validateRol(user.user_roles, 2);

    if (!haveRol) {
      handleHttpError(res, "NOT_HAVE_PERMISSIONS", 403);
      return;
    }

    req.user = user;
    next();
  } catch (e) {
    handleHttpError(res, "NOT_SESSION", 401);
  }
};
