import prisma from "./prisma.js";

export const existFamilyUser = async (id, userId) => {
  const family = await prisma.family.findUnique({
    where: {
      id: id,
      AND: {
        mainParent: userId,
      },
    },
  });
  if (!family) {
    return false;
  }

  return true;
};
