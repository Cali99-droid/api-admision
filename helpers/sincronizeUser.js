import prisma from "../utils/prisma.js";
import { sendSingleEmail } from "./sendBulkEmailsSES.js";
import fs from "fs/promises";

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
        name: user.given_name,
        lastname: user.family_name,
        mLastname: user.family_name.split(" ")[1] || user.family_name,
        email: user.email,
        doc_number: user.dni,
        phone: user.phone,
        role: user.parentesco === "Padre" ? "P" : "M",
      },
    });

    const userCreated = await prisma.user.create({
      data: {
        sub: user.sub,
        person_id: createdPerson.id,
      },
    });
    const processState = {
      status: "running",
      totalEmails: 0,
      sentEmails: 0,
      failedEmails: 0,
      results: [],
      startTime: new Date(),
      endTime: null,
    };
    const htmlContent = await fs.readFile(
      "templates/emails/politicas-admision-2026.html",
      "utf-8"
    );
    await sendSingleEmail(
      user,
      htmlContent,
      "Políticas de admisión 2026",
      processState
    );
    console.log("New user add succesfully", userCreated.id);
    return userCreated;
  } else {
    const updatePhone = await prisma.user.update({
      where: {
        id: userDB.id,
      },
      data: {
        person: {
          update: {
            phone: user.phone,
          },
        },
      },
    });
    console.log("Exist user, not sincronized", userDB.id);
    return userDB;
  }
}
