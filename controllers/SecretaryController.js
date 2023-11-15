import prisma from "../utils/prisma.js";

const getFamilies = async (req, res) => {
  try {
    const { user } = req;
    const families = await prisma.familiy_secretary.findMany({
      where: {
        user_id: user.id,
      },
      select: {
        family: {
          include: {
            children: {
              include: {
                vacant: true,
              },
            },
          },
        },
      },
    });

    const data = families.map((f) => {
      return {
        id: f.family.id,
        name: f.family.name,
        vacant: f.family.children.map((child) => {
          const vacant = {
            level: child.vacant[0].level,
            register: child.vacant[0].grade,
          };
          return vacant;
        }),
        children: f.family.children.length,
        served: false,
      };
    });

    res.status(200).json({
      success: true,
      data: data,
    });
  } catch (error) {
    console.log(error);
    handleHttpError(res, "ERROR_GET_FAMILIES");
  }
};

const validateHome = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const dataHome = await prisma.home.findFirst({
      where: {
        family_id: id,
      },
    });

    if (!dataHome) {
      handleHttpError(res, "HOME_NOT_EXIST", 404);
      return;
    }

    const validateHome = await prisma.home.update({
      data: {
        validate: 1,
      },
      where: {
        id: dataHome.id,
      },
    });
    res.status(201).json({
      success: true,
      data: validateHome.id,
    });
  } catch (error) {
    console.log(error);
    handleHttpError(res, "ERROR_VALIDATE_HOME");
  }
};

export { getFamilies, validateHome };
