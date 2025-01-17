import { handleHttpError } from "../utils/handleHttpError.js";
import { verifyToken } from "../utils/handleJwt.js";
import { PrismaClient } from "@prisma/client";
import { validateRol } from "../utils/handleRol.js";
import { validatePersissions } from "../utils/handlePermissions.js";
const prisma = new PrismaClient();
//comment
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
        // OR: {
        //   user_roles: {
        //     some: {
        //       roles_id: {
        //         in: [2, 1], // Puedes ajustar los roles según tus necesidades
        //       },
        //     },
        //   },
        // },
      },
      include: {
        user_roles: {
          select: {
            roles_id: true,
          },
        },
        person: true,
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
        user_roles: {
          some: {
            roles_id: {
              in: [2, 1], // Puedes ajustar los roles según tus necesidades
            },
          },
        },
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

    if (!user) {
      handleHttpError(res, "NOT_HAVE_PERMISSIONS", 403);
      return;
    }
    // const haveRol = await validateRol(user.user_roles, 2);

    // if (!haveRol) {
    //   handleHttpError(res, "NOT_HAVE_PERMISSIONS", 403);
    //   return;
    // }

    req.user = user;
    next();
  } catch (e) {
    console.log(e);
    handleHttpError(res, "NOT_SESSION", 401);
  }
};

export const economicMiddleware = async (req, res, next) => {
  try {
    const permissions = await prisma.auth.findMany({
      where: {
        user_id: req.user.id,
      },
    });
    if (permissions.length <= 0) {
      handleHttpError(res, "NOT_HAVE_PERMISSIONS", 403);
      return;
    }

    const havePersissions = await validatePersissions(permissions, "economic");
    if (!havePersissions) {
      handleHttpError(res, "NOT_HAVE_PERMISSIONS", 403);
      return;
    }

    next();
  } catch (e) {
    console.log(e);
    handleHttpError(res, "NOT_SESSION", 401);
  }
};

export const allMiddleware = async (req, res, next) => {
  try {
    const permissions = await prisma.auth.findMany({
      where: {
        user_id: req.user.id,
      },
    });
    if (permissions.length <= 0) {
      handleHttpError(res, "NOT_HAVE_PERMISSIONS", 403);
      return;
    }

    // const havePersissions = await validatePersissions(permissions, "economic");
    // if (!havePersissions) {
    //   handleHttpError(res, "NOT_HAVE_PERMISSIONS", 403);
    //   return;
    // }

    next();
  } catch (e) {
    handleHttpError(res, "NOT_SESSION", 401);
  }
};
export const antecedentMiddleware = async (req, res, next) => {
  try {
    const permissions = await prisma.auth.findMany({
      where: {
        user_id: req.user.id,
      },
    });
    if (permissions.length <= 0) {
      handleHttpError(res, "NOT_HAVE_PERMISSIONS", 403);
      return;
    }

    const havePersissions = await validatePersissions(
      permissions,
      "antecedent"
    );
    if (!havePersissions) {
      handleHttpError(res, "NOT_HAVE_PERMISSIONS", 403);
      return;
    }

    next();
  } catch (e) {
    handleHttpError(res, "NOT_SESSION", 401);
  }
};

export const sessionPsychologyMiddleware = async (req, res, next) => {
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
        user_roles: {
          some: {
            roles_id: {
              in: [3, 1], // Puedes ajustar los roles según tus necesidades
            },
          },
        },
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
    if (!user) {
      handleHttpError(res, "NOT_HAVE_PERMISSIONS", 403);
      return;
    }
    // const haveRol = await validateRol(user.user_roles, 3);

    // if (!haveRol) {
    //   handleHttpError(res, "NOT_HAVE_PERMISSIONS", 403);
    //   return;
    // }

    req.user = user;
    next();
  } catch (e) {
    handleHttpError(res, "NOT_SESSION", 401);
  }
};

export const adminMiddleware = async (req, res, next) => {
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
          },
        },
      },
    });
    const haveRol = await validateRol(user.user_roles, 1);
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
