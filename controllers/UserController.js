import axios from "axios";
import { getKeycloakToken } from "../helpers/getKeycloakToken.js";
import { getUsersByRoleClient } from "../helpers/getUsersKeycloakByRealmRole.js";
import { handleHttpError } from "../utils/handleHttpError.js";
const getUsersKy = async (req, res) => {
  const { email, first, max, lastName, firstName, search } = req.query;
  const token = await getKeycloakToken();
  const realm = process.env.KEYCLOAK_REALM;
  if (!token) return;

  try {
    const response = await axios.get(
      `https://login.colegioae.edu.pe/admin/realms/${realm}/users`,
      {
        params: {
          email,
          first,
          max,
          lastName,
          firstName,
          search,
        },
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );

    res.status(201).json({
      success: true,
      data: response.data,
    });
  } catch (error) {
    console.log(error);
    handleHttpError(res, "ERROR_GET_USERS");
  }
};

const getAllRoles = async (req, res) => {
  const token = await getKeycloakToken();
  const realm = process.env.KEYCLOAK_REALM;
  const client = process.env.KEYCLOAK_CLIENT_UUID;
  try {
    const response = await axios.get(
      `https://login.colegioae.edu.pe/admin/realms/${realm}/clients/${client}/roles`,
      {
        // params: {
        //   email,
        //   first,
        //   max,
        //   lastName,
        //   firstName,
        //   search,
        // },
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
    const secretariesKey = await getUsersByRoleClient("secretaria-adm");
    console.log(secretariesKey);
    res.status(201).json({
      success: true,
      data: response.data,
    });
  } catch (error) {
    console.log(error);
    handleHttpError(res, "ERROR_GET_USERS");
  }
};
const getDetailUser = async (req, res) => {
  const { userId } = req.params;
  const token = await getKeycloakToken();
  const realm = process.env.KEYCLOAK_REALM;
  const client = process.env.KEYCLOAK_CLIENT_UUID;
  try {
    const response = await axios.get(
      `https://login.colegioae.edu.pe/admin/realms/${realm}/users/${userId}/role-mappings/clients/${client}/composite`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
    res.status(201).json({
      success: true,
      data: response.data,
    });
  } catch (error) {
    console.log(error);
    handleHttpError(res, "ERROR_GET_USERS");
  }
};
const getUser = async (emailToSearch) => {
  const token = await getKeycloakToken();
  const realm = process.env.KEYCLOAK_REALM;
  try {
    const response = await axios.get(
      `https://login.colegioae.edu.pe/admin/realms/${realm}/users`,
      {
        params: {
          email: emailToSearch,
          exact: true, // IMPORTANTE: Para que no busque coincidencias parciales
        },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const users = response.data;

    if (users.length === 0) {
      console.log("Usuario no encontrado");
    }
    return users[0];
  } catch (error) {
    console.log(error);
  }
};
const getUsersByRoleName = async (req, res) => {
  const { roleName } = req.params;
  try {
    const users = await getUsersByRoleClient(roleName);
    res.status(201).json({
      success: true,
      data: users,
    });
  } catch (error) {
    console.log(error);
    handleHttpError(res, "ERROR_GET_USERS_BY_ROLE");
  }
};
const assignRole = async (req, res) => {
  const { userId } = req.params;
  const role = req.body;
  const token = await getKeycloakToken();
  const realm = process.env.KEYCLOAK_REALM;
  const client = process.env.KEYCLOAK_CLIENT_UUID;

  try {
    const response = await axios.post(
      `https://login.colegioae.edu.pe/admin/realms/${realm}/users/${userId}/role-mappings/clients/${client}`,
      role,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
    console.log(response.data);
    const secretariesKey = await getUsersByRoleClient("secretaria-adm");

    res.status(201).json({
      success: true,
      data: secretariesKey,
    });
  } catch (error) {
    console.log(error);
    handleHttpError(res, "ERROR_GET_USERS");
  }
};

const deleteRole = async (req, res) => {
  const { userId } = req.params;
  const role = req.body;
  const token = await getKeycloakToken();
  const realm = process.env.KEYCLOAK_REALM;
  const client = process.env.KEYCLOAK_CLIENT_UUID;

  try {
    const response = await axios.delete(
      `https://login.colegioae.edu.pe/admin/realms/${realm}/users/${userId}/role-mappings/clients/${client}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        role,
      }
    );

    const secretariesKey = await getUsersByRoleClient("secretaria-adm");

    res.status(201).json({
      success: true,
      data: secretariesKey,
    });
  } catch (error) {
    console.log(error);
    handleHttpError(res, "ERROR_DELETE_USERS");
  }
};

export {
  getUsersKy,
  getAllRoles,
  assignRole,
  deleteRole,
  getUsersByRoleName,
  getDetailUser,
  getUser,
};
