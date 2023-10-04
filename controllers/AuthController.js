import { PrismaClient } from "@prisma/client";
import { handleHttpError } from "../utils/handleHttpError.js";
import generateId from "../utils/handleToken.js";
import createContact from "../mautic/mauticApi.js";
const prisma = new PrismaClient();

const registerUser = async (req, res) => {
  const { name, lastname, surname, doc_number, email, phone } = req.body;

  //verificar emails y número de documento duplicados
  const existsDoc = await prisma.person.findFirst({
    where: {
      doc_number,
    },
  });

  if (existsDoc) {
    handleHttpError(res, "EXIST_DOCUMENT_NUMBER");
    return;
  }

  const existsEmail = await prisma.user.findFirst({
    where: {
      email,
    },
  });

  if (existsEmail) {
    handleHttpError(res, "EXIST_EMAIL");
    return;
  }

  const surnames = lastname + " " + surname;

  try {
    //generar token
    const token = generateId();
    const { contact } = await createContact(
      name,
      email,
      phone,
      token,
      surnames
    );
    const code = generateId().substring(5, 10);
    const person = await prisma.person.create({
      data: {
        name,
        surname,
        lastname,
        doc_number,
      },
    });
    const user = await prisma.user.create({
      data: {
        email,
        phone,
        person_id: person.id,
        token,
        code,
        mauticId: contact.id,
      },
    });
    res.status(201);
    res.send(user);

    //mautic email
  } catch (error) {
    console.log(error);
    handleHttpError(res, "ERROR_REGISTER_USER");
  }
};

const confirmEmail = async (req, res) => {
  const { token } = req.params;

  const userConfirm = await prisma.user.findFirst({
    where: {
      token,
    },
  });

  if (!userConfirm) {
    handleHttpError(res, "INVALID_TOKEN");
    return;
  }
  try {
    const userUpdate = await prisma.user.update({
      where: {
        id: userConfirm.id,
      },
      data: {
        token: "",
        confirmed_email: 1,
      },
    });
    res.status(201);
    res.send(userUpdate);
  } catch (error) {
    console.log(error);
    handleHttpError(res, "ERROR_CONFIRM_USER");
  }
};

export { registerUser, confirmEmail };
