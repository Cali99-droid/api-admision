import axios from "axios";
import { getKeycloakToken } from "./getKeycloakToken.js";

// Función para obtener usuarios por rol
export async function getUsersByRole(roleName) {
  const token = await getKeycloakToken();
  const realm = process.env.KEYCLOAK_REALM;
  if (!token) return;

  try {
    const response = await axios.get(
      `https://login.colegioae.edu.pe/admin/realms/${realm}/roles/${roleName}/users`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );

    return response.data; // Lista de usuarios asociados al rol
  } catch (error) {
    console.error("Error obteniendo usuarios por rol:", error);
  }
}
export async function getUsersByRoleClient(roleName) {
  const token = await getKeycloakToken();
  const realm = process.env.KEYCLOAK_REALM;
  const client_uuid = "10582d13-1034-471a-b975-74516f6855df";
  if (!token) return;

  try {
    const response = await axios.get(
      `https://login.colegioae.edu.pe/admin/realms/${realm}/clients/${client_uuid}/roles/${roleName}/users`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );

    return response.data; // Lista de usuarios asociados al rol
  } catch (error) {
    console.error("Error obteniendo usuarios por rol:", error);
  }
}
