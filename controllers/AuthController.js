import { PrismaClient } from "@prisma/client";
import { handleHttpError } from "../utils/handleHttpError.js";
import generateId from "../utils/handleToken.js";
import createContact from "../mautic/mauticApi.js";
import { compare, encrypt } from "../utils/handlePassword.js";
import { matchedData } from "express-validator";
import { tokenSign } from "../utils/handleJwt.js";
import sendEmailToContact from "../mautic/sendEmailReset.js";
import PersonRepository from "../repositories/PersonRepository.js";
import UserRepository from "../repositories/UserRepository.js";
import ContactRepository from "../repositories/ContactRepository.js";
import UserRoleRepository from "../repositories/UserRoleRepository.js";
const prisma = new PrismaClient();
//commit
const registerUser = async (req, res) => {
  try {
    req = matchedData(req);
    const { name, lastname, mLastname,role, doc_number, email, phone,status_polit } = req;

    //verificar emails, phone y número de documento duplicados
    const existsDoc = await PersonRepository.getPersonByNumberDoc(doc_number);

    if (existsDoc) {
      handleHttpError(res, "EXIST_DATA");
      return;
    }
    const existsEmail = await UserRepository.getUserByEmail(email);

    if (existsEmail) {
      handleHttpError(res, "EMAIL_EXIST");
      return;
    }

    const existsPhone = await UserRepository.getUserByPhone(phone);

    if (existsPhone) {
      handleHttpError(res, "PHONE_EXIST");
      return;
    }

    const surnames = lastname + " " + mLastname;
    //generar token
    const token = generateId();

    const dataContact = {
      firstname: name,
      lastname: surnames,
      email: email,
      token: token,
      phone: phone,
      origen: "admision",
      // Otros campos según tus necesidades y configuración en Mautic
    };
    let contactId;
    if (process.env.NODE_ENV === "production") {
      const { contact } = await ContactRepository.createContact(dataContact);
      contactId = contact.id;
    }

    const code = generateId().substring(5, 10);
    const dataPerson = { name, mLastname, lastname, role, doc_number };
    const person = await PersonRepository.createPerson(dataPerson);
    const dataUser = {
      email,
      phone,
      person_id: person.id,
      token,
      code,
      status_polit,
      mauticId: process.env.NODE_ENV === "production" ? contactId : null,
      // mauticId: 0,
    };
    const user = await UserRepository.createUser(dataUser);

    const data = { id: user.id, email: user.email, name: person.name };
    res.status(201).json({
      success: true,
      data,
    });
  } catch (error) {
    console.log(error);
    handleHttpError(res, "ERROR_REGISTER_USER");
  }
};

const confirmEmail = async (req, res) => {
  try {
    req = matchedData(req);
    const { token, password } = req;

    const userConfirm = await UserRepository.getUserByToken(token);

    if (!userConfirm) {
      handleHttpError(res, "INVALID_TOKEN", 401);
      return;
    }
    const passHash = await encrypt(password);
    const dataUserUpdate = {
      token: "",
      confirmed_email: 1,
      password: passHash,
    };
    const userUpdate = await UserRepository.updateUser(
      userConfirm.id,
      dataUserUpdate
    );

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
    const role = req.body.role;

    req = matchedData(req);
    const { password, email } = req;
    const user = await UserRepository.getUserByEmail(email);
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
    const userRoles = await UserRoleRepository.getUserRolesByUser(user.id);
    if (role && userRoles.length > 0) {
      const foundRole = userRoles.find((rol) => rol.roles_id === role);
      if (!foundRole) {
        handleHttpError(res, "NOT_HAVE_ROL", 403);
        return;
      }
      if (foundRole.status === 0) {
        handleHttpError(res, "INACTIVE_USER", 403);
        return;
      }
    } else if (role) {
      handleHttpError(res, "NOT_HAVE_PERMISSIONS", 403);
      return;
    }

    // user.set("password", undefined, { strict: false });
    const person = await PersonRepository.getPersonById(user.person_id);
    user.doc_number =person.doc_number ;
    user.role_parent =person.role ;
    const data = {
      token: await tokenSign(user),
      id: user.id,
      personId: user.person_id,
      role: role ?? 0,
      email: user.email,
      name: person.name,
      lastname: person.lastname,
      mLastname: person.mLastname,
      agree: user.agree,
      role_parent:person.role,
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
    const existsUser = await UserRepository.getUserByEmail(email);

    if (!existsUser) {
      handleHttpError(res, "USER_DOES_NOT_EXIST", 404);
      return;
    }
    if (existsUser.confirmed_email === 0) {
      handleHttpError(res, "UNCONFIRMED_EMAIL", 401);
      return;
    }
    const token = generateId();
    const updateUser = await UserRepository.updateUser(existsUser.id, {
      token,
    });

    const resp = await sendEmailToContact(updateUser.mauticId, token);
    if (!resp) {
      console.log(error);
      handleHttpError(res, "ERROR_MAUTIC_DONT_SEND_EMAIL");
      return;
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

const getRoles = async (req, res) => {
  try {
    const roles = await prisma.roles.findMany();
    const data = roles.map(({ id, rol }) => ({ id, name: rol }));
    res.status(200).json({
      success: true,
      data,
    });
  } catch (error) {
    console.log(error);
    handleHttpError(res, "ERROR_GET_ROL");
  }
};
const validateSession = async (req, res) => {
  try {
    const { user } = req;
    if (!user) {
      handleHttpError(res, "ERROR_VALIDATE_SESSION");
      return;
    }
    res.status(200).json({
      success: true,
      data: user.email,
    });
  } catch (error) {
    console.log(error);
    handleHttpError(res, "ERROR_VALIDATE_SESSION");
  }
};
const getPermissions = async (req, res) => {
  try {
    const { user } = req;
    if (!user) {
      handleHttpError(res, "ERROR_VALIDATE_SESSION");
      return;
    }
    const permissions = await UserRepository.getUserPermission(user.id);
    res.status(200).json({
      success: true,
      data: permissions,
    });
  } catch (error) {
    console.log(error);
    handleHttpError(res, "ERROR_VALIDATE_SESSION");
  }
};

export {
  registerUser,
  confirmEmail,
  login,
  forgotPassword,
  getRoles,
  validateSession,
  getPermissions,
};
