import { PrismaClient } from "@prisma/client";
import { handleHttpError } from "../utils/handleHttpError.js";
import generateId from "../utils/handleToken.js";
import createContact from "../mautic/mauticApi.js";
import { compare, encrypt } from "../utils/handlePassword.js";
import { matchedData } from "express-validator";
import { tokenSign } from "../utils/handleJwt.js";
import sendEmailToContact from "../mautic/sendEmailReset.js";
const prisma = new PrismaClient();

const registerUser = async (req, res) => {
  try {
    req = matchedData(req);
    const { name, lastname, mLastname, doc_number, email, phone } = req;

    //verificar emails y número de documento duplicados
    const existsDoc = await prisma.person.findFirst({
      where: {
        doc_number,
      },
    });

    if (existsDoc) {
      handleHttpError(res, "EXIST_DATA");
      return;
    }

    const existsEmail = await prisma.user.findFirst({
      where: {
        OR: [
          {
            email: {
              equals: email,
            },
          },
          {
            phone: {
              equals: phone,
            },
          },
        ],
      },
    });

    if (existsEmail) {
      handleHttpError(res, "EXIST_DATA");
      return;
    }

    const surnames = lastname + " " + mLastname;
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
        mLastname,
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
        // mauticId: 0,
      },
    });
    const data = { id: user.id, email: user.email, name: person.name };
    res.status(201).json({
      success: true,
      data: data,
    });
    // res.send({ id: user.id, email: user.email, name: person.name });
    // res.success({ mensaje: "Operación exitosa" });

    //mautic email
  } catch (error) {
    console.log(error);
    handleHttpError(res, "ERROR_REGISTER_USER");
  }
};

const confirmEmail = async (req, res) => {
  try {
    req = matchedData(req);
    const { token, password } = req;

    const userConfirm = await prisma.user.findFirst({
      where: {
        token,
      },
    });

    if (!userConfirm) {
      handleHttpError(res, "INVALID_TOKEN", 401);
      return;
    }
    const passHash = await encrypt(password);
    const userUpdate = await prisma.user.update({
      where: {
        id: userConfirm.id,
      },
      data: {
        token: "",
        confirmed_email: 1,
        password: passHash,
      },
    });

    const data = { email: userUpdate.email };
    res.status(201).json({
      success: true,
      data: data,
    });
  } catch (error) {
    console.log(error);
    handleHttpError(res, "ERROR_CONFIRM_USER");
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
      include: {
        person: {
          select: {
            name: true,
            lastname: true,
            mLastname: true,
          },
        },
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
      id: user.id,
      personId: user.person_id,
      role: user.role,
      email: user.email,
      name: user.person.name,
      lastname: user.person.lastname,
      mLastname: user.person.mLastname,
      agree: user.agree,
    };
    res.status(201).json({
      success: true,
      data: data,
    });
  } catch (e) {
    console.log(e);
    handleHttpError(res, "ERROR_LOGIN_USER");
  }
};
const forgotPassword = async (req, res) => {
  try {
    // req = matchedData(req);
    const { email } = req.body;
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
    const token = generateId();
    const updateUser = await prisma.user.update({
      data: {
        token,
      },
      where: {
        id: existsUser.id,
      },
    });

    const resp = await sendEmailToContact(updateUser.mauticId, token);
    if (!resp) {
      console.log(error);
      handleHttpError(res, "ERROR_MAUTIC_DONT_SEND_EMAIL");
    }

    const data = { email: updateUser.email };
    res.status(201).json({
      success: true,
      data: data,
    });
  } catch (error) {
    console.log(error);
    handleHttpError(res, "ERROR_SEND_EMAIL");
  }
};

export { registerUser, confirmEmail, login, forgotPassword };
