import axios from "axios";
import qs from "qs";
export async function getKeycloakToken() {
  const realm = process.env.KEYCLOAK_REALM;
  const data = qs.stringify({
    username: process.env.KY_USERNAME,
    password: process.env.KY_PASSWORD,
    grant_type: "password",
    client_id: process.env.KEYCLOAK_RESOURCE, // ID del cliente en Keycloak
    client_secret: process.env.KEYCLOAK_CREDENTIALS_SECRET, // Secreto del cliente en Keycloak
  });
  try {
    const response = await axios.post(
      `https://login.colegioae.edu.pe/realms/${realm}/protocol/openid-connect/token`,
      data,
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );

    return response.data.access_token;
  } catch (error) {
    console.error("Error obteniendo el token de Keycloak:", error);
  }
}
