import { handleHttpError } from "../utils/handleHttpError.js";
import { matchedData } from "express-validator";

import prisma from "../utils/prisma.js";

import { deleteImage, uploadImage } from "../utils/handleImg.js";
import { existFamilyUser } from "../utils/handleVerifyFamily.js";

const store = async (req, res) => {
  try {
    const { user } = req;
    const { name } = matchedData(req);
    // const userExists = await prisma.user.findFirst({
    //   where: {
    //     id,
    //   },
    // });
    // if (!userExists) {
    //   handleHttpError(res, "USER_NOT_EXIST", 404);
    //   return;
    // }
    const family = await prisma.family.create({
      data: {
        mainParent: user.id,
        name,
      },
    });
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
    console.log(families);
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

/***
 * trae una familia en especifico
 *
 *  */
const get = async (req, res) => {
  try {
    req = matchedData(req);
    const id = parseInt(req.id);

    const family = await prisma.family.findUnique({
      where: {
        id,
      },
      select: {
        id: true,
        name: true,
        conyugue: {
          select: {
            id: true,
            email: true,
            phone: true,
            person: true,
          },
        },
        children: {
          select: {
            id: true,
            person: true,
          },
        },
      },
    });
    if (!family) {
      handleHttpError(res, "FAMILY_DOES_NOT_EXIST", 404);
    }
    //formatear
    let spouse = {};
    if (family.conyugue) {
      spouse = family.conyugue.person;
      spouse = { email: family.conyugue.email, ...spouse };
      spouse = { phone: family.conyugue.phone, ...spouse };
      spouse = { role: family.conyugue.role, ...spouse };
    }

    const data = {
      id: family.id,
      family: family.name,
      spouse,
      children: family.children,
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
    const verify = await existFamilyUser(id, user.id);
    if (!verify) {
      handleHttpError(res, "FAMILY_NOT_AVAILABLE", 404);
      return;
    }

    //**Verificar si ya existe un domicilio */
    const homeExist = await prisma.home.findFirst({
      where: {
        family_id: id,
      },
    });

    //** Si ya existe se actualiza */

    if (homeExist) {
      if (homeExist.doc !== img[0].originalname) {
        deleteImage(homeExist.doc);
        const { imageName } = await uploadImage(img[0]);
        dataHome = { doc: imageName, ...dataHome };
      } else {
        const { imageName } = await uploadImage(img[0]);
        dataHome = { doc: imageName, ...dataHome };
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

  const verify = await existFamilyUser(id, user.id);
  if (!verify) {
    handleHttpError(res, "FAMILY_NOT_AVAILABLE", 404);
    return;
  }

  const home = await prisma.home.findFirst({
    where: {
      family_id: id,
    },
    select: {
      id: true,
      address: true,
      reference: true,
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
    //** Actualizamos la imagenes */
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
    const images = [];
    for (const file of req.files) {
      const { imageName } = await uploadImage(file);

      images.push(imageName);
    }
    //**Alamcenar nombres en la base de datos */
    const docsIncome = await prisma.docsIncome.createMany({
      data: images.map((name) => ({
        name,
        income_id: incomeUpdate.id,
      })),
    });
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
  // const family = await prisma.family.findUnique({
  //   where: {
  //     id: id,
  //     AND: {
  //       mainParent: user.id,
  //     },
  //   },
  // });

  // if (!family) {
  //   handleHttpError(res, "FAMILY_NOT_AVAILABLE");
  //   return;
  // }

  const income = await prisma.income.findFirst({
    where: {
      family_id: id,
    },
    select: {
      id: true,
      range_id: true,
    },
  });
  if (!income) {
    handleHttpError(res, "NOT_EXIST_INCOME", 404);
  }

  const incomeDoc = await prisma.docsIncome.findMany({
    where: {
      income_id: income.id,
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

export {
  store,
  show,
  get,
  saveHome,
  updateHome,
  getHome,
  createIncome,
  updateIncome,
  getIncome,
};
