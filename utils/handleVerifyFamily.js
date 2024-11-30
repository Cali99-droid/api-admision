import prisma from "./prisma.js";

export const existFamilyUser = async (id, personId) => {
  const family = await prisma.family.findUnique({
    where: {
      id: id,
      AND: {
        parent_one: personId,
      },
    },
  });

  if (!family) {
    return false;
  }

  return true;
};
