import axios from "axios";
import { getKeycloakToken } from "./getKeycloakToken.js";

/**
 * Obtiene todos los usuarios de Keycloak (paginados)
 * @param {number} max - Número máximo de usuarios por página (default: 100, max: 100)
 * @returns {Promise<Array>} - Array de usuarios de Keycloak
 */
export async function getAllKeycloakUsers(max = 100) {
  const token = await getKeycloakToken();
  const realm = process.env.KEYCLOAK_REALM;

  if (!token) {
    throw new Error("No se pudo obtener el token de Keycloak");
  }

  try {
    let allUsers = [];
    let first = 0;
    const maxPerPage = Math.min(max, 100); // Keycloak tiene límite de 100 por página
    let hasMore = true;

    // Paginar para obtener todos los usuarios
    while (hasMore) {
      const response = await axios.get(
        `https://login.colegioae.edu.pe/admin/realms/${realm}/users`,
        {
          params: {
            first: first,
            max: maxPerPage,
          },
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      const users = response.data;

      if (users.length === 0) {
        hasMore = false;
      } else {
        allUsers = allUsers.concat(users);
        first += maxPerPage;

        // Si recibimos menos usuarios que el máximo, es la última página
        if (users.length < maxPerPage) {
          hasMore = false;
        }
      }
    }

    console.log(`Total de usuarios obtenidos de Keycloak: ${allUsers.length}`);
    return allUsers;
  } catch (error) {
    console.error("Error obteniendo todos los usuarios de Keycloak:", error.message);
    throw error;
  }
}
