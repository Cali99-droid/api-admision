import { matchedData } from "express-validator";
import prisma from "../utils/prisma.js";
import { handleHttpError } from "../utils/handleHttpError.js";
import sendMessage from "../message/api.js";
import { handleVerifyValidate } from "../utils/handleVerifyValidate.js";
import client from "../utils/client.js";
import sendMessageFromSecretary from "../message/fromUser.js";
import PsychologyRepository from "../repositories/PsychologyRepository.js";

const getFamilies = async (req, res) => {
  try {
    const { user } = req;
    const families = await prisma.familiy_secretary.findMany({
      where: {
        user_id: user.id,
      },
      select: {
        status: true,
        family: {
          include: {
            children: {
              include: {
                vacant: true,
              },
            },
            mainConyugue: {
              include: {
                person: true,
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
        email: f.family.mainConyugue.email,
        phone: f.family.mainConyugue.phone,
        nameParent:
          f.family.mainConyugue.person.name +
          " " +
          f.family.mainConyugue.person.lastname,
        vacant: f.family.children.map((child) => {
          const vacant = {
            level: child.vacant[0]?.level || null,
            grade: child.vacant[0]?.grade || null,
            campus: child.vacant[0]?.campus || null,
          };
          return vacant;
        }),
        children: f.family.children.length,
        served: f.status,
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
            schoolId: true,
            validateSchool: true,
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
        familiy_secretary: true,
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
    const validate = (number) => {
      if (number === 0) {
        return false;
      } else {
        if (number === 1) {
          return true;
        }
        return false;
      }
    };
    if (family.home) {
      home = {
        id: family.home[0]?.id,
        address: family.home[0]?.address,
        validate: validate(family.home[0]?.validate),
      };
    }
    let income;
    if (family.income) {
      income = {
        id: family.income[0]?.id,
        income: family.income[0]?.range.name,
        validate: validate(family.income[0]?.validate),
      };
    }

    const findSchool = async (id) => {
      const school = await client.schools.findUnique({
        select: {
          id: true,
          ubigean: true,
          name: true,
          level: true,
        },
        where: {
          id,
        },
      });
      console.log(school);
      return school.name;
    };

    const children = family.children.map((child, { person }) => ({
      id: child.person.id,
      name: child.person.name,
      lastname: child.person.lastname,
      mLastname: child.person.mLastname,
      validate: handleVerifyValidate(child.validate),
      school: child.schoolId,
      validateSchool: child.validateSchool,
    }));

    const parents = [mainSpouse, spouse];
    const data = {
      id: family.id,
      family: family.name,
      parents,
      children,
      home,
      income,
      served: family.familiy_secretary[0].status,
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

    // TODO cambiar cuando exista mas de un rol
    const token = user.user_roles[0].token_boss;
    const data = matchedData(req);

    const family = await prisma.family.findUnique({
      where: {
        id: parseInt(data.id),
      },
    });

    const userToSend = await prisma.user.findFirst({
      where: {
        id: family.mainParent,
      },
    });

    if (!userToSend) {
      handleHttpError(res, "NOT_EXISTS_USER", 404);
      return;
    }

    const body = data.message;
    const number = `51` + userToSend.phone;
    const resp = await sendMessageFromSecretary(number, body, token);
    console.log(resp);
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
          phone: userToSend.phone,
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
    const family = await prisma.family.findUnique({
      where: {
        id: parseInt(id),
      },
    });
    const data = await prisma.chat.findMany({
      where: {
        person_id: family.mainParent,
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

const setServed = async (req, res) => {
  const id = parseInt(req.params.id);
  const family = await prisma.familiy_secretary.findFirst({
    where: {
      family_id: parseInt(id),
    },
  });
  if (!family) {
    handleHttpError(res, "FAMILY_NOT_EXIST", 404);
    return;
  }
  //asignar a la psicologa menos ocupada rol: 3
  const psychology = await prisma.user.findMany({
    where: {
      user_roles: {
        some: {
          roles_id: 3,
        },
      },
    },
    select: {
      id: true,
    },
    orderBy: { psy_evaluation: { _count: "asc" } },
  });
  // console.log(psychology);
  const lessPsychology = psychology[0];

  const updateFamily = await prisma.familiy_secretary.update({
    where: {
      id: family.id,
    },
    data: {
      status: 1,
    },
  });

  const asigFamilyToPsy = await PsychologyRepository.assignFamily({
    user_id: lessPsychology.id,
    family_id: id,
  });
  res.status(201).json({
    success: true,
    data: {
      id: updateFamily.id,
    },
  });
};

const getServed = async (req, res) => {
  const { user } = req;
  const serverdFamilies = await prisma.familiy_secretary.findMany({
    where: {
      status: 1,
      AND: {
        user_id: user.id,
      },
    },
  });
  res.status(200).json({
    success: true,
    data: {
      served: serverdFamilies.length,
    },
  });
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
  setServed,
  getServed,
};
