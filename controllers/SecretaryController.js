import { matchedData } from "express-validator";
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
    const verifyLevel = (level) => {
      switch (level) {
        case "1":
          return "Inicial";
        case "2":
          return "Primaria";
        case "3":
          return "Secundaria";
        default:
          break;
      }
    };
    const data = families.map((f) => {
      return {
        id: f.family.id,
        name: f.family.name,
        vacant: f.family.children.map((child) => {
          const vacant = {
            level: verifyLevel(child.vacant[0].level),
            grade: child.vacant[0].grade,
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
const getFamily = async (req, res) => {
  try {
    const { user } = req;
    if (!user) {
      handleHttpError(res, "NOT_EXIST_USER");
    }
    req = matchedData(req);
    const id = parseInt(req.id);

    const family = await prisma.family.findUnique({
      where: {
        id,
      },
      select: {
        id: true,
        name: true,
        mainConyugue: {
          select: {
            id: true,
            email: true,
            phone: true,
            person: {
              select: {
                id: true,
                name: true,
                lastname: true,
                mLastname: true,
                role: true,
              },
            },
          },
        },
        conyugue: {
          select: {
            id: true,
            email: true,
            phone: true,
            person: {
              select: {
                id: true,
                name: true,
                lastname: true,
                mLastname: true,
                role: true,
              },
            },
          },
        },
        children: {
          select: {
            person: {
              select: {
                id: true,
                name: true,
                lastname: true,
                mLastname: true,
              },
            },
          },
        },
        home: {
          select: {
            id: true,
            address: true,
          },
        },
        income: {
          select: {
            id: true,
            range: {
              select: {
                name: true,
              },
            },
          },
        },
      },
    });
    console.log(family.mainConyugue);
    if (!family) {
      handleHttpError(res, "FAMILY_DOES_NOT_EXIST", 404);
    }
    //formatear
    let mainSpouse = {};
    if (family?.mainConyugue) {
      mainSpouse = family.mainConyugue.person;
      mainSpouse = { email: family.mainConyugue.email, ...mainSpouse };
      mainSpouse = { phone: family.mainConyugue.phone, ...mainSpouse };
      mainSpouse = { role: family.mainConyugue.person.role, ...mainSpouse };
    }
    let spouse = {};
    if (family?.conyugue) {
      spouse = family.conyugue.person;
      spouse = { email: family.conyugue.email, ...spouse };
      spouse = { phone: family.conyugue.phone, ...spouse };
      spouse = { role: family.conyugue.person.role, ...spouse };
    }
    let home;
    if (family.home) {
      home = { id: family.home[0]?.id, address: family.home[0]?.address };
    }
    let income;
    if (family.home) {
      income = {
        id: family.income[0]?.id,
        income: family.income[0]?.range.name,
      };
    }
    const children = family.children.map(({ person }) => ({
      id: person.id,
      name: person.name,
      lastname: person.lastname,
      mLastname: person.mLastname,
    }));

    const data = {
      id: family.id,
      family: family.name,
      mainSpouse,
      spouse,
      children,
      home,
      income,
    };
    res.status(200).json({
      success: true,
      data,
    });
  } catch (error) {
    console.log(error);
    handleHttpError(res, "ERROR_GET_FAMILY");
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
const validateIncome = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const dataIncome = await prisma.income.findFirst({
      where: {
        family_id: id,
      },
    });

    if (!dataIncome) {
      handleHttpError(res, "INCOME_NOT_EXIST", 404);
      return;
    }

    const validateIncome = await prisma.home.update({
      data: {
        validate: 1,
      },
      where: {
        id: dataIncome.id,
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

export { getFamilies, validateHome, validateIncome, getFamily };
