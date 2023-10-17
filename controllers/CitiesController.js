import prisma from "../utils/prisma.js";

const showRegion = async (req, res) => {
  const cities = await prisma.region.findMany();

  res.status(200).json({
    success: true,
    data: cities,
  });
};

const showProvince = async (req, res) => {
  const cities = await prisma.province.findMany({
    select: {
      id: true,
      name: true,
      region_id: true,
    },
  });

  res.status(200).json({
    success: true,
    data: cities,
  });
};
const showDistrict = async (req, res) => {
  const cities = await prisma.district.findMany({
    select: {
      id: true,
      name: true,
      province_id: true,
    },
  });

  res.status(200).json({
    success: true,
    data: cities,
  });
};

export { showRegion, showProvince, showDistrict };
