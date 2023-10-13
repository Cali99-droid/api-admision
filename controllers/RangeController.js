import prisma from "../utils/prisma.js";

const showRange = async (req, res) => {
  const rang = await prisma.range.findMany();

  res.status(200).json({
    success: true,
    data: rang,
  });
};

export { showRange };
