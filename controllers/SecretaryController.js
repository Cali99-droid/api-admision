import { matchedData } from "express-validator";
import prisma from "../utils/prisma.js";
import { handleHttpError } from "../utils/handleHttpError.js";
import sendMessage from "../message/api.js";
import { handleVerifyValidate } from "../utils/handleVerifyValidate.js";

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
            level: verifyLevel(child.vacant[0]?.level) || null,
            grade: child.vacant[0]?.grade || null,
            local: child.vacant[0]?.campus || null,
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
                validate: true,
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
                validate: true,
              },
            },
          },
        },
        children: {
          select: {
            validate: true,
            person: {
              select: {
                id: true,
                name: true,
                lastname: true,
                mLastname: true,
                validate: true,
              },
            },
          },
        },
        home: {
          select: {
            id: true,
            address: true,
            validate: true,
          },
        },
        income: {
          select: {
            id: true,
            validate: true,
            range: {
              select: {
                name: true,
              },
            },
          },
        },
      },
    });

    if (!family) {
      handleHttpError(res, "FAMILY_DOES_NOT_EXIST", 404);
    }
    //formatear
    let mainSpouse = {};

    if (family?.mainConyugue) {
      mainSpouse = family.mainConyugue.person;
      mainSpouse.validate = handleVerifyValidate(
        family.mainConyugue.person.validate
      );
      mainSpouse = { email: family.mainConyugue.email, ...mainSpouse };
      mainSpouse = { phone: family.mainConyugue.phone, ...mainSpouse };
      mainSpouse = { role: family.mainConyugue.person.role, ...mainSpouse };
    }

    let spouse = {};
    if (family?.conyugue) {
      spouse = family.conyugue.person;
      spouse.validate = handleVerifyValidate(family.conyugue.person.validate);
      spouse = { email: family.conyugue.email, ...spouse };
      spouse = { phone: family.conyugue.phone, ...spouse };
      spouse = { role: family.conyugue.person.role, ...spouse };
    }
    let home;
    if (family.home) {
      home = {
        id: family.home[0]?.id,
        address: family.home[0]?.address,
        validate: family.home[0]?.validate === 0 ? false : true,
      };
    }
    let income;
    if (family.income) {
      income = {
        id: family.income[0]?.id,
        income: family.income[0]?.range.name,
        validate: family.income[0]?.validate === 0 ? false : true,
      };
    }

    const children = family.children.map((child, { person }) => ({
      id: child.person.id,
      name: child.person.name,
      lastname: child.person.lastname,
      mLastname: child.person.mLastname,
      validate: handleVerifyValidate(child.validate),
    }));

    const parents = [mainSpouse, spouse];
    const data = {
      id: family.id,
      family: family.name,
      parents,
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

    const validateIncome = await prisma.income.update({
      data: {
        validate: 1,
      },
      where: {
        id: dataIncome.id,
      },
    });
    res.status(201).json({
      success: true,
      data: validateIncome.id,
    });
  } catch (error) {
    console.log(error);
    handleHttpError(res, "ERROR_VALIDATE_HOME");
  }
};

const validateChildren = async (req, res) => {
  try {
    const id = parseInt(req.params.id);

    const dataChild = await prisma.children.findFirst({
      where: {
        person_id: id,
      },
    });
    if (!dataChild) {
      handleHttpError(res, "CHILD_NOT_EXIST", 404);
      return;
    }
    const validateChild = await prisma.children.update({
      data: {
        validate: 1,
      },
      where: {
        id: dataChild.id,
      },
    });

    res.status(201).json({
      success: true,
      data: validateChild.id,
    });
  } catch (error) {
    console.log(error);
    handleHttpError(res, "ERROR_VALIDATE_CHILD");
  }
};
const validateSchool = async (req, res) => {
  try {
    const id = parseInt(req.params.id);

    const dataChild = await prisma.children.findFirst({
      where: {
        person_id: id,
      },
    });
    if (!dataChild) {
      handleHttpError(res, "CHILD_NOT_EXIST", 404);
      return;
    }
    const validateChild = await prisma.children.update({
      data: {
        validateSchool: 1,
      },
      where: {
        id: dataChild.id,
      },
    });

    res.status(201).json({
      success: true,
      data: validateChild.id,
    });
  } catch (error) {
    console.log(error);
    handleHttpError(res, "ERROR_VALIDATE_CHILD");
  }
};
const validateSpouse = async (req, res) => {
  try {
    const id = parseInt(req.params.id);

    const dataPerson = await prisma.person.findFirst({
      where: {
        id: id,
      },
    });
    if (!dataPerson) {
      handleHttpError(res, "CHILD_NOT_EXIST", 404);
      return;
    }
    const validatePerson = await prisma.person.update({
      data: {
        validate: 1,
      },
      where: {
        id,
      },
    });

    res.status(201).json({
      success: true,
      data: validatePerson.id,
    });
  } catch (error) {
    console.log(error);
    handleHttpError(res, "ERROR_VALIDATE_CHILD");
  }
};

const sendMessageSecretary = async (req, res) => {
  try {
    const { user } = req;
    const data = matchedData(req);

    const userToSend = await prisma.user.findFirst({
      where: {
        person_id: parseInt(data.id),
      },
    });

    if (!user) {
      handleHttpError(res, "NOT_EXISTS_USER", 404);
      return;
    }

    const body = data.message;
    const number = `51` + userToSend.phone;
    const resp = await sendMessage(number, body);

    if (resp) {
      const saveMessage = await prisma.chat.create({
        data: {
          message: body,
          person_id: parseInt(data.id),
          user_id: user.id,
        },
      });
      res.status(201).json({
        success: true,
        data: {
          phone: userToSend.phone,
        },
      });
    } else {
      res.status(401).json({
        success: false,
        data: {
          phone: userToConfirm.phone,
        },
      });
    }
  } catch (error) {
    console.log(error);
    handleHttpError(res, "ERROR_SEND_MESSAGE");
  }
};

const getMessage = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const data = await prisma.chat.findMany({
      where: {
        person_id: id,
      },
      select: {
        message: true,
        create_time: true,
      },
    });
    res.status(201).json({
      success: true,
      data,
    });
  } catch (error) {
    console.log(error);
    handleHttpError(res, "ERROR_GET_MESSAGE");
  }
};

export {
  getFamilies,
  getFamily,
  validateHome,
  validateIncome,
  validateChildren,
  validateSchool,
  validateSpouse,
  sendMessageSecretary,
  getMessage,
};
