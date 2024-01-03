import axios from "axios";
const NODE_ENV = process.env.NODE_ENV;

/**
 * Enviar email de obtencion de vacante!
 * @param {*} id
 * @param {*} emailId
 * @param {*} token
 */
const sendEmail = async (id, emailId) => {
  try {
    const apiUrl = process.env.MAUTIC_API_URL;
    const mauticUrl = process.env.MAUTIC_URL;
    const publicKey = process.env.MAUTIC_PUBLIC_KEY;
    const secretKey = process.env.MAUTIC_SECRET_KEY;
    // const emailId = process.env.MAUTIC_ID_EMAIL_VACANT;

    // Obtén un token de acceso
    const authResponse = await axios.post(`${mauticUrl}/oauth/v2/token`, {
      client_id: publicKey,
      client_secret: secretKey,
      grant_type: "client_credentials",
    });

    const accessToken = authResponse.data.access_token;

    // email con tokens
    const response = await axios.post(
      `${apiUrl}/emails/${emailId}/contact/${id}/send`,
      {},
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    console.log("Email enviado correctamente:", response.data);
    return true;
  } catch (error) {
    console.error("Error al enviar email :", error);
    return false;
  }
};

export default sendEmail;
