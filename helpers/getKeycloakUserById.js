import axios from "axios";
import { getKeycloakToken } from "./getKeycloakToken.js";

/**
 * Obtiene un usuario específico de Keycloak por su ID
 * @param {string} userId - ID del usuario en Keycloak (sub)
 * @returns {Promise<Object|null>} - Datos del usuario o null si no existe
 */
export async function getKeycloakUserById(userId) {
  const token = await getKeycloakToken();
  const realm = process.env.KEYCLOAK_REALM;

  if (!token) {
    throw new Error("No se pudo obtener el token de Keycloak");
  }

  try {
    const response = await axios.get(
      `https://login.colegioae.edu.pe/admin/realms/${realm}/users/${userId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );

    return response.data;
  } catch (error) {
    if (error.response?.status === 404) {
      console.warn(`Usuario ${userId} no encontrado en Keycloak`);
      return null;
    }
    console.error(`Error obteniendo usuario ${userId} de Keycloak:`, error.message);
    throw error;
  }
}

/**
 * Obtiene múltiples usuarios de Keycloak por sus IDs
 * @param {Array<string>} userIds - Array de IDs de usuarios (subs)
 * @returns {Promise<Array>} - Array de usuarios encontrados
 */
export async function getKeycloakUsersByIds(userIds) {
  console.log(`Obteniendo ${userIds.length} usuarios de Keycloak...`);

  const users = [];
  const notFound = [];
  const errors = [];

  // Procesar en lotes para no sobrecargar la API
  const batchSize = 10;
  for (let i = 0; i < userIds.length; i += batchSize) {
    const batch = userIds.slice(i, i + batchSize);
    const batchPromises = batch.map(async (userId) => {
      try {
        const user = await getKeycloakUserById(userId);
        if (user) {
          return { success: true, user };
        } else {
          return { success: false, userId, reason: 'not_found' };
        }
      } catch (error) {
        return { success: false, userId, reason: 'error', error: error.message };
      }
    });

    const results = await Promise.all(batchPromises);

    results.forEach((result) => {
      if (result.success) {
        users.push(result.user);
      } else if (result.reason === 'not_found') {
        notFound.push(result.userId);
      } else {
        errors.push({ userId: result.userId, error: result.error });
      }
    });

    // Pequeña pausa entre lotes
    if (i + batchSize < userIds.length) {
      await new Promise(resolve => setTimeout(resolve, 100));
    }
  }

  console.log(`✓ Usuarios encontrados: ${users.length}`);
  if (notFound.length > 0) {
    console.warn(`⚠️  Usuarios no encontrados en Keycloak: ${notFound.length}`);
  }
  if (errors.length > 0) {
    console.error(`✗ Errores al obtener usuarios: ${errors.length}`);
  }

  return users;
}
