import { PrismaClient } from "@prisma/client";
import { handleHttpError } from "../utils/handleHttpError.js";
import generateId from "../utils/handleToken.js";
import createContact from "../mautic/mauticApi.js";
import { compare, encrypt } from "../utils/handlePassword.js";
import { matchedData } from "express-validator";
import { tokenSign } from "../utils/handleJwt.js";
const prisma = new PrismaClient();

const registerUser = async (req, res) => {
  try {
    req = matchedData(req);
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
  try {
    req = matchedData(req);
    const { token } = req.params;

    const userConfirm = await prisma.user.findFirst({
      where: {
        token,
      },
    });

    if (!userConfirm) {
      handleHttpError(res, "INVALID_TOKEN", 401);
      return;
    }
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
    res.send({ email: userUpdate.email });
  } catch (error) {
    console.log(error);
    handleHttpError(res, "ERROR_CONFIRM_USER");
  }
};
const resetPassword = async (req, res) => {
  try {
    req = matchedData(req);
    const { password, email } = req;
    const existsUser = await prisma.user.findFirst({
      where: {
        email,
      },
    });
    if (!existsUser) {
      handleHttpError(res, "USER_DOES_NOT_EXIST", 404);
      return;
    }
    if (existsUser.confirmed_email === 0) {
      handleHttpError(res, "UNCONFIRMED_EMAIL", 401);
      return;
    }
    const passHash = await encrypt(password);
    const updateUserPass = await prisma.user.update({
      where: {
        email,
      },
      data: {
        password: passHash,
      },
    });
    res.status(201);
    res.send({ id: updateUserPass.id });
  } catch (error) {
    console.log(error);
    handleHttpError(res, "ERROR_CREATE_PASSWORD");
  }
};
const login = async (req, res) => {
  try {
    req = matchedData(req);
    const { password, email } = req;
    const user = await prisma.user.findFirst({
      where: {
        email,
      },
    });

    if (!user) {
      handleHttpError(res, "EMAIL_NOT_EXIST", 404);
      return;
    }
    if (user.confirmed_email === 0) {
      handleHttpError(res, "UNCONFIRMED_EMAIL", 401);
      return;
    }

    const hashPassword = user.password;

    const check = await compare(password, hashPassword);

    if (!check) {
      handleHttpError(res, "PASSWORD_INVALID", 401);
      return;
    }

    // user.set("password", undefined, { strict: false });
    const data = {
      token: await tokenSign(user),
      user: { id: user.id, role: user.role },
    };

    res.send({ data });
  } catch (e) {
    console.log(e);
    handleHttpError(res, "ERROR_LOGIN_USER");
  }
};

export { registerUser, confirmEmail, resetPassword, login };
