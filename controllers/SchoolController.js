import { handleHttpError } from "../utils/handleHttpError.js";
import { matchedData } from "express-validator";
import { deleteImage, uploadImage } from "../utils/handleImg.js";
import prisma from "../utils/prisma.js";
import client from "../utils/client.js";

const store = async (req, res) => {
  try {
    const { user } = req;
    const { img } = req.files;
    const id = parseInt(req.params.id);
    let school = matchedData(req);
    const children = await prisma.person.findUnique({
      where: {
        id,
      },
      include: {
        children: true,
      },
    });
    if (!children) {
      handleHttpError(res, "NOT_EXIST_PERSON", 404);
      return;
    }
    if (!children.children[0]?.id) {
      handleHttpError(res, "NOT_EXIST_CHILDREN", 404);
      return;
    }
    const child = children.children[0];

    if (img) {
      if (child.doc !== img[0].originalname) {
        deleteImage(child.doc);
        const { imageName } = await uploadImage(img[0]);
        school = { doc: imageName, ...school };
      }
    }

    const dateUpdate = new Date();

    const schoolUpdate = await prisma.children.update({
      data: {
        schoolId: parseInt(school.schoolId),
        grade: parseInt(school.grade),
        level: parseInt(school.level),
        doc: school.doc,
        district_id: school.district_id,
        update_time: dateUpdate,
        validateSchool: school.validate ? parseInt(school.validate) : 0,
      },
      where: {
        id: child.id,
      },
    });

    res.status(201).json({
      success: true,
      data: { id: schoolUpdate.id },
    });
    return;
  } catch (error) {
    handleHttpError(res, "ERROR_UPDATE_SCHOOL");
    console.log(error);
  }
};

const update = async (req, res) => {
  try {
    const { user } = req;
    const { img } = req.files;
    const id = parseInt(req.params.id);

    let school = matchedData(req);

    const schoolExist = await prisma.school.findUnique({
      where: {
        id,
      },
    });
    if (!schoolExist) {
      handleHttpError(res, "NOT_EXIST_SCHOOL", 404);
      return;
    }
    if (schoolExist.lib_doc !== img[0].originalname) {
      console.log("son diferentees");
      deleteImage(schoolExist.lib_doc);
      const { imageName } = await uploadImage(img[0]);
      school = { lib_doc: imageName, ...school };
    }
    const dateUpdate = new Date();
    school = { update_time: dateUpdate, ...school };

    const schoolUpdate = await prisma.school.update({
      data: school,
      where: {
        id,
      },
    });

    const data = { schoolUpdate };
    res.status(201).json({
      success: true,
      data,
    });
  } catch (error) {
    console.log(error);
  }
};

const get = async (req, res) => {
  try {
    req = matchedData(req);
    const id = parseInt(req.id);

    const children = await prisma.children.findFirst({
      where: {
        person_id: id,
      },
      include: {
        district: {
          include: {
            province: true,
          },
        },
      },
    });
    // const children = await prisma.person.findUnique({
    //   where: {
    //     id,
    //   },
    //   include: {
    //     children: {
    //       include: {
    //         district: {
    //           include: {
    //             province: {
    //               include: {
    //                 region: true,
    //               },
    //             },
    //           },
    //         },
    //       },
    //     },
    //   },
    // });
    if (!children) {
      handleHttpError(res, "NOT_EXIST_CHILDREN", 404);
      return;
    }
    // if (!children.children[0]?.id) {
    //   handleHttpError(res, "NOT_EXIST_CHILDREN", 404);
    //   return;
    // }
    //nooo

    const data = {
      schoolId: children.schoolId,
      grade: children.grade,
      level: children.level,
      img: children.doc,
      district_id: children?.district_id,
      province_id: children.district?.province_id,
      region_id: children?.district?.province?.region_id,
      validate: children.validateSchool,
    };
    res.status(200).json({
      success: true,
      data,
    });
  } catch (error) {
    console.log(error);
    handleHttpError(res, "ERROR_GET_DATA_SCHOOLS");
  }
};

const show = async (req, res) => {
  try {
    const schools = await client.schools.findMany({
      select: {
        id: true,
        ubigean: true,
        name: true,
        level: true,
        cod_modular: true,
      },
    });
    res.status(200).json({
      success: true,
      data: schools,
    });
  } catch (error) {
    console.log(error);
    handleHttpError(res, "ERROR_GET_SCHOOLS");
  }
};

const showSchoolByName = async (req, res) => {
  try {
    const { name } = req.params;

    const schools = await client.schools.findMany({
      select: {
        id: true,
        ubigean: true,
        name: true,
        level: true,
      },
      where: {
        name: {
          contains: name,
        },
      },
    });
    res.status(200).json({
      success: true,
      data: schools,
    });
  } catch (error) {
    console.log(error);
    handleHttpError(res, "ERROR_GET_SCHOOLS");
  }
};
const showSchoolByDistrict = async (req, res) => {
  try {
    const { ubigean } = req.params;

    const schools = await client.schools.findMany({
      select: {
        id: true,
        ubigean: true,
        name: true,
        level: true,
      },
      where: {
        ubigean,
      },
    });
    res.status(200).json({
      success: true,
      data: schools,
    });
  } catch (error) {
    console.log(error);
    handleHttpError(res, "ERROR_GET_SCHOOLS");
  }
};

export { store, update, get, show, showSchoolByName, showSchoolByDistrict };
