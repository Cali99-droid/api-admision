import { handleHttpError } from "../utils/handleHttpError.js";
import { matchedData } from "express-validator";

import prisma from "../utils/prisma.js";

import { deleteImage, uploadImage } from "../utils/handleImg.js";
import { existFamilyUser } from "../utils/handleVerifyFamily.js";
import { handleVerifyValidate } from "../utils/handleVerifyValidate.js";
import FamilyRepository from "../repositories/FamilyRepository.js";

const store = async (req, res) => {
  try {
    const { user } = req;

    const { name } = matchedData(req);
    const secretaries = await prisma.user.findMany({
      where: {
        user_roles: {
          some: {
            roles_id: 2,
          },
        },
      },
      select: {
        id: true,
      },
      orderBy: { familiy_secretary: { _count: "asc" } },
    });
    const secretariaMenosOcupada = secretaries[0];
    // return res.status(201).json({
    //   success: true,
    //   data: secretariaMenosOcupada,
    // });
    // const userExists = await prisma.user.findFirst({
    //   where: {
    //     id,
    //   },
    // });
    // if (!userExists) {
    //   handleHttpError(res, "USER_NOT_EXIST", 404);
    //   return;
    // }
    const AnotherFamily = await prisma.family.findFirst({
      where: {
        mainParent: user.id,
      },
    });
    const family = await prisma.family.create({
      data: {
        mainParent: user.id,
        name,
      },
    });
    if (AnotherFamily) {
      console.log("asignando como existente");
      const existFamilySecretary = await prisma.familiy_secretary.findFirst({
        where: {
          family_id: AnotherFamily.id,
        },
      });

      const familyAsig = await prisma.familiy_secretary.create({
        data: {
          user_id: existFamilySecretary.user_id,
          family_id: family.id,
        },
      });
    } else {
      console.log("asignando como nuevo");
      const familyAsig = await prisma.familiy_secretary.create({
        data: {
          user_id: secretariaMenosOcupada.id,
          family_id: family.id,
        },
      });
    }

    // console.log(secretariaMenosOcupada);
    // console.log(familyAsig);
    const data = {
      id: family.id,
      name: family.name,
    };
    res.status(201).json({
      success: true,
      data: data,
    });
  } catch (error) {
    console.log(error);
    handleHttpError(res, "ERROR_CREATE_FAMILY");
  }
};

const show = async (req, res) => {
  try {
    const { user } = req;
    if (!user) {
      handleHttpError(res, "NOT_EXIST_USER");
    }
    const families = await prisma.family.findMany({
      where: {
        mainParent: user.id,
      },
      select: {
        id: true,
        name: true,
        home: {
          select: {
            id: true,
            address: true,
            doc: true,
            district: {
              select: {
                name: true,
              },
            },
          },
        },
        _count: {
          select: {
            children: true,
          },
        },
        income: true,
      },
    });

    const verificarDatos = (d) => {
      let bool = true;

      if (d.home.length < 1 || d.income.length < 1 || d._count.children > 1) {
        return false;
      }
      return bool;
    };
    const data = families.map((f) => {
      const object = {
        id: f.id,
        name: f.name,
        district: f.home[0]?.district.name,
        children: f._count.children,
        filled: verificarDatos(f),
      };
      return object;
    });
    res.status(200).json({
      success: true,
      data,
    });
  } catch (error) {
    console.log(error);
    handleHttpError(res, "ERROR_GET_FAMILIES");
  }
};
const update = async (req, res) => {
  try {
    const { user } = req;

    const { name, id } = matchedData(req);
    const family = await FamilyRepository.getFamilyById(+id);
    if (!family) {
      handleHttpError(res, "NOT_EXIST_FAMILY", 404);
      return;
    }
    const updateFamily = await FamilyRepository.update(+id, { name });

    res.status(201).json({
      success: true,
      data: updateFamily,
    });
  } catch (error) {
    console.log(error);
    handleHttpError(res, "ERROR_UPDATE_FAMILY");
  }
};
const destroy = async (req, res) => {
  try {
    const { user } = req;

    const { id } = matchedData(req);
    const family = await FamilyRepository.getFamilyById(+id);
    if (!family) {
      handleHttpError(res, "NOT_EXIST_FAMILY", 404);
      return;
    }
    const destroyFamily = await FamilyRepository.destroy(+id);

    res.status(201).json({
      success: true,
      data: destroyFamily,
    });
  } catch (error) {
    console.log(error);
    handleHttpError(res, "ERROR_UPDATE_FAMILY");
  }
};

/***
 * trae una familia en especifico
 *
 *  */
const get = async (req, res) => {
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
        AND: {
          mainParent: user.id,
        },
      },
      select: {
        id: true,
        name: true,
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
    if (!family) {
      handleHttpError(res, "FAMILY_DOES_NOT_EXIST", 404);
    }
    //formatear
    let spouse = {};
    if (family?.conyugue) {
      spouse = family.conyugue.person;
      spouse = { email: family.conyugue.email, ...spouse };
      spouse = { phone: family.conyugue.phone, ...spouse };
      spouse = { role: family.conyugue.role, ...spouse };
    }
    let home;
    if (family.home) {
      home = { id: family.home[0]?.id, address: family.home[0]?.address };
    }
    let income;
    if (family.income) {
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

const saveHome = async (req, res) => {
  try {
    const { user } = req;
    const id = parseInt(req.params.id);
    const { img } = req.files;
    let dataHome = matchedData(req);

    //**Verificar que la familia exista y pertenezca al usuario  */
    // const verify = await existFamilyUser(id, user.id);
    // if (!verify) {
    //   handleHttpError(res, "FAMILY_NOT_AVAILABLE", 404);
    //   return;
    // }

    //**Verificar si ya existe un domicilio */
    const homeExist = await prisma.home.findFirst({
      where: {
        family_id: id,
      },
    });
    if (dataHome.validate) {
      dataHome.validate = parseInt(dataHome.validate);
    }
    //** Si ya existe se actualiza */

    if (homeExist) {
      if (img) {
        if (homeExist.doc !== img[0].originalname) {
          deleteImage(homeExist.doc);
          const { imageName } = await uploadImage(img[0]);
          dataHome = { doc: imageName, ...dataHome };
        } else {
          const { imageName } = await uploadImage(img[0]);
          dataHome = { doc: imageName, ...dataHome };
        }
      }

      delete dataHome.id;
      const data = await prisma.home.update({
        data: dataHome,
        where: {
          id: homeExist.id,
        },
      });
      res.status(201).json({
        success: true,
        data,
      });
      return;
    }
    //** Si no existe se crea */
    const { imageName } = await uploadImage(img[0]);
    dataHome = { doc: imageName, ...dataHome };
    dataHome = { family_id: id, ...dataHome };
    delete dataHome.id;
    const data = await prisma.home.create({
      data: dataHome,
    });

    res.status(201).json({
      success: true,
      data,
    });
  } catch (error) {
    console.log(error);
    handleHttpError(res, "ERROR_CREATE_HOME");
  }
};
const updateHome = async (req, res) => {
  try {
    let { body } = req;
    const { user } = req;
    const id = parseInt(req.params.id);
    const { img } = req.files;

    const family = await prisma.family.findUnique({
      where: {
        id: id,
        AND: {
          mainParent: user.id,
        },
      },
    });

    if (!family) {
      handleHttpError(res, "FAMILY_NOT_AVAILABLE");
      return;
    }

    const homeExist = await prisma.home.findFirst({
      where: {
        family_id: id,
      },
    });
    if (!homeExist) {
      handleHttpError(res, "HOME_NOT_EXIST");
      return;
    }

    if (homeExist.doc !== img[0].originalname) {
      console.log("son diferentees");
      deleteImage(homeExist.doc);
      const { imageName } = await uploadImage(img[0]);
      body = { doc: imageName, ...body };
    }

    const dateUpdate = new Date();
    if (body.validate) {
      body.validate = parseInt(body.validate);
    }
    body = { family_id: id, ...body };
    body = { update_time: dateUpdate, ...body };

    const home = await prisma.home.update({
      data: body,
      where: {
        id: homeExist.id,
      },
    });
    const data = { id: home.id };

    res.status(201).json({
      success: true,
      data,
    });
  } catch (error) {
    console.log(error);
    handleHttpError(res, "ERROR_CREATE_HOME");
  }
};

const getHome = async (req, res) => {
  const id = parseInt(req.params.id);
  const { user } = req;

  if (user.user_roles.length === 0) {
    const verify = await existFamilyUser(id, user.id);
    if (!verify) {
      handleHttpError(res, "FAMILY_NOT_AVAILABLE", 404);
      return;
    }
  }
  // if(user.user_roles[0]?.roles_id)

  const home = await prisma.home.findFirst({
    where: {
      family_id: id,
    },
    select: {
      id: true,
      address: true,
      reference: true,
      validate: true,
      district: {
        select: {
          id: true,
          province: {
            select: {
              id: true,
              region: {
                select: {
                  id: true,
                },
              },
            },
          },
        },
      },
      doc: true,
    },
  });
  if (!home) {
    handleHttpError(res, "HOME_NOT_EXIST", 404);
    return;
  }
  const city = home.district;
  const data = {
    id: home.id,
    address: home.address,
    reference: home.reference,
    validate: home.validate,
    district: city.id,
    province: city.province.id,
    region: city.province.region.id,
    img: home.doc,
  };

  res.status(200).json({
    success: true,
    data,
  });
};

const createIncome = async (req, res) => {
  const range_id = parseInt(req.body.range_id);
  const validate = req.body.validate ? parseInt(req.body.validate) : 0;
  const { user } = req;
  const id = parseInt(req.params.id);

  //**Verificar que la familia exista y pertenezca al usuario  */
  // const verify = await existFamilyUser(id, user.id);
  // if (!verify) {
  //   handleHttpError(res, "FAMILY_NOT_AVAILABLE", 404);
  //   return;
  // }

  const existIncome = await prisma.income.findFirst({
    where: {
      family_id: id,
    },
  });
  //** si ya existe se actualiza */
  if (existIncome) {
    const dateUpdate = new Date();

    //** Actualizamos la imagenes */
    const images = [];
    if (req.files.length > 0) {
      const docs = await prisma.docsIncome.findMany({
        where: {
          income_id: existIncome.id,
        },
      });

      if (docs.length > 0) {
        docs.forEach(async (i) => {
          await prisma.docsIncome.delete({
            where: {
              id: i.id,
            },
          });
          deleteImage(i.name);
        });
      }

      //** subir imagenes

      for (const file of req.files) {
        const { imageName } = await uploadImage(file);

        images.push(imageName);
      }
      //**Alamcenar nombres en la base de datos */
    }

    const incomeUpdate = await prisma.income.update({
      data: {
        range_id,
        family_id: id,
        update_time: dateUpdate,
        validate,
      },
      where: {
        id: existIncome.id,
      },
      include: {
        docsIncome: true,
      },
    });
    let docsIncome;
    if (images.length > 0) {
      docsIncome = await prisma.docsIncome.createMany({
        data: images.map((name) => ({
          name,
          income_id: incomeUpdate.id,
        })),
      });
    }

    const data = { incomeUpdate, docsIncome };
    res.status(201).json({
      success: true,
      data,
    });
    return;
  }

  //**Si no existe se crea */

  const incomeCreate = await prisma.income.create({
    data: {
      range_id,
      family_id: id,
      validate,
    },
    include: {
      docsIncome: true,
    },
  });
  //subir imagenes
  const imageUrls = [];
  for (const file of req.files) {
    const { imageName } = await uploadImage(file);

    imageUrls.push(imageName);
  }
  const docsIncome = await prisma.docsIncome.createMany({
    data: imageUrls.map((name) => ({
      name,
      income_id: incomeCreate.id,
    })),
  });

  const data = { incomeCreate, docsIncome };

  res.status(200).json({
    success: true,
    data,
  });
};

const updateIncome = async (req, res) => {
  const range_id = parseInt(req.body.range_id);
  const { user } = req;
  const id = parseInt(req.params.id);
  const family = await prisma.family.findUnique({
    where: {
      id: id,
      AND: {
        mainParent: user.id,
      },
    },
  });

  if (!family) {
    handleHttpError(res, "FAMILY_NOT_AVAILABLE");
    return;
  }
  const existIncome = await prisma.income.findFirst({
    where: {
      family_id: id,
    },
  });
  if (!existIncome) {
    handleHttpError(res, "INCOME_NOT_EXIST");
    return;
  }
  const dateUpdate = new Date();
  const incomeUpdate = await prisma.income.update({
    data: {
      range_id,
      family_id: id,
      update_time: dateUpdate,
    },
    where: {
      id: existIncome.id,
    },
  });

  const docs = await prisma.docsIncome.findMany({
    where: {
      income_id: existIncome.id,
    },
  });
  if (docs.length > 0) {
    docs.forEach(async (i) => {
      await prisma.docsIncome.delete({
        where: {
          id: i.id,
        },
      });
      deleteImage(i.name);
    });
  }

  //subir imagenes
  const images = [];
  for (const file of req.files) {
    const { imageName } = await uploadImage(file);

    images.push(imageName);
  }
  const docsIncome = await prisma.docsIncome.createMany({
    data: images.map((name) => ({
      name,
      income_id: incomeUpdate.id,
    })),
  });

  const data = { incomeUpdate, images };

  res.status(201).json({
    success: true,
    data,
  });
};

const getIncome = async (req, res) => {
  const id = parseInt(req.params.id);
  const { user } = req;

  if (user.user_roles.length === 0) {
    const family = await prisma.family.findUnique({
      where: {
        id: id,
        AND: {
          mainParent: user.id,
        },
      },
    });

    if (!family) {
      handleHttpError(res, "FAMILY_NOT_AVAILABLE");
      return;
    }
  }

  const income = await prisma.income.findFirst({
    where: {
      family_id: id,
    },
    select: {
      id: true,
      range_id: true,
      validate: true,
    },
  });
  if (!income) {
    handleHttpError(res, "NOT_EXIST_INCOME", 404);
    return;
  }

  const incomeDoc = await prisma.docsIncome.findMany({
    where: {
      income_id: income?.id,
    },
    select: {
      name: true,
    },
  });
  const images = incomeDoc.map((i) => i.name);

  const data = { images, ...income };

  res.status(200).json({
    success: true,
    data,
  });
};

const getSpouse = async (req, res) => {
  const id = parseInt(req.params.id);
  let idSp = null;
  const family = await prisma.family.findFirst({
    where: {
      id: id,
    },
    select: {
      parent: true,
    },
  });

  if (!family) {
    handleHttpError(res, "NOT_EXIST_FAMILY", 404);
    return;
  }
  if (family.parent) {
    const user = await prisma.user.findFirst({
      where: {
        id: family.parent,
      },
    });
    idSp = user.person_id;
  }

  // if (!family.parent) {
  //   handleHttpError(res, "NOT_EXIST_FAMILY", 404);
  //   return;
  // }
  const data = { idSpouse: idSp };

  res.status(200).json({
    success: true,
    data,
  });
};

const getStatus = async (req, res) => {
  const id = parseInt(req.params.id);
  const { user } = req;
  try {
    const family = await prisma.family.findFirst({
      where: {
        id: id,
        AND: {
          mainParent: user.id,
        },
      },
      select: {
        mainParent: true,
        mainConyugue: {
          select: {
            person: true,
          },
        },
        conyugue: {
          select: {
            person: true,
          },
        },
        parent: true,
        income: true,
        home: true,
        children: {
          include: {
            vacant: true,
          },
        },
      },
    });

    if (!family) {
      handleHttpError(res, "NOT_EXIST_FAMILY", 404);
      return;
    }
    const dataVacantChildren = family.children.map((c) => {
      if (c.vacant.length > 0) {
        return {
          id: c.person_id,
          formStatus: true,
          validateStatus: handleVerifyValidate(c.vacant[0]?.validate),
        };
      } else {
        return {
          id: c.person_id,
          formStatus: false,
          validateStatus: handleVerifyValidate(c.vacant[0]?.validate),
        };
      }
    });
    const dataSchoolChildren = family.children.map((c) => {
      // console.log(c.schoolId);
      if (c.schoolId) {
        return {
          id: c.person_id,
          formStatus: true,
          validateStatus: handleVerifyValidate(c.validateSchool),
        };
      } else {
        return {
          id: c.person_id,
          formStatus: false,
          validateStatus: handleVerifyValidate(c.validateSchool),
        };
      }
    });

    const status = [
      {
        name: "mainParent",
        formStatus: family.mainParent !== null,
        validateStatus: handleVerifyValidate(
          family.mainConyugue.person.validate
        ),
      },
      {
        name: "parent",
        formStatus: family.parent !== null,
        validateStatus: family.conyugue?.person?.validate
          ? handleVerifyValidate(family.conyugue.person?.validate)
          : false,
      },
      {
        name: "income",
        formStatus: family.income.length > 0,
        validateStatus: family.income[0]?.validate
          ? handleVerifyValidate(family.income[0].validate)
          : false,
      },
      {
        name: "home",
        formStatus: family.home.length > 0,
        validateStatus: family.home[0]?.validate
          ? handleVerifyValidate(family.home[0].validate)
          : false,
      },
      {
        name: "school",
        children:
          dataSchoolChildren.length <= 0
            ? [{ formStatus: false, validateStatus: false }]
            : dataSchoolChildren,
      },

      {
        name: "vacant",
        children:
          dataVacantChildren.length <= 0
            ? [{ formStatus: false, validateStatus: false }]
            : dataVacantChildren,
      },
      // { children: family.children.length > 0 },
    ];

    res.status(200).json({
      success: true,
      data: status,
    });
  } catch (error) {
    console.log(error);
    handleHttpError(res, "ERROR_GET_STATUS");
  }
};

const setFamilyToSecretary = async (req, res) => {
  const families = await prisma.family.findMany();

  const data = await prisma.user_roles.findMany({
    where: {
      roles_id: 2,
    },
    select: {
      user: true,
    },
  });
  const secretaries = data.map((dat) => dat.user);

  // Obtener la cantidad actual de familias asignadas a cada secretaria
  const familySecretaryRelations = await prisma.familiy_secretary.findMany();
  const asignaments = {};
  secretaries.forEach((secretary) => {
    const assignedFamilies = familySecretaryRelations.filter(
      (rel) => rel.user_id === secretary.id
    );
    asignaments[secretary.id] = assignedFamilies.map((rel) => rel.family_id);
  });

  // Asignar las familias no asignadas
  families.forEach((family) => {
    const secretariaIds = Object.keys(asignaments);
    const secretariaMenosOcupada = secretariaIds.reduce((a, b) =>
      asignaments[a].length < asignaments[b].length ? a : b
    );
    asignaments[secretariaMenosOcupada].push(family.id);
  });
  // Actualizar la base de datos con las asignaciones
  const updatePromises = Object.entries(asignaments).map(
    ([user_id, familiaIds]) => {
      const data = familiaIds.map((id) => {
        return { user_id: parseInt(user_id), family_id: id };
      });

      return prisma.familiy_secretary.createMany({
        data,
      });
    }
  );

  await Promise.all(updatePromises);

  res.json({ message: "Familias asignadas con éxito." });
};
export {
  store,
  update,
  show,
  get,
  destroy,
  saveHome,
  updateHome,
  getHome,
  createIncome,
  updateIncome,
  getIncome,
  getSpouse,
  getStatus,
  setFamilyToSecretary,
};
