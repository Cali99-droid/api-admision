import axios from "axios";
import qs from "qs";
export async function getKeycloakToken() {
  const data = qs.stringify({
    username: "carlosjhardel4@gmail.com",
    password: "admin12",
    grant_type: "password",
    client_id: "test-client", // ID del cliente en Keycloak
    client_secret: "68b489DOZbybCI7Z0wdsicepeLBINbLT", // Secreto del cliente en Keycloak
  });
  try {
    const response = await axios.post(
      "https://login.colegioae.edu.pe/realms/test-login/protocol/openid-connect/token",
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
