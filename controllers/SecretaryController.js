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
            register: child.vacant[0].create_time,
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

export { getFamilies };
