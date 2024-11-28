import prisma from "../utils/prisma.js";

export async function saveUserIdIfNotExists(user) {
  const userDB = await prisma.user.findUnique({
    where: {
      sub: user.sub,
    },
  });

  if (!userDB) {
    // const userCRM = await createCRMuser(user);
    const createdPerson = await prisma.person.create({
      data: {
        name: user.name,
        lastname: user.family_name,
        mLastname: user.family_name,
        email: user.email,
        doc_number: user.dni,
        role: user.parentesco === "Padre" ? "P" : "M",
      },
    });

    const userCreated = await prisma.user.create({
      data: {
        sub: user.sub,
        person_id: createdPerson.id,
      },
    });
    console.log("new user add succesfully");
    return userCreated;
  } else {
    console.log("exist user, not sincronized");
    return userDB;
  }
}
