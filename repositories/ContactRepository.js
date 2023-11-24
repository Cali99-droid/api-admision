import axios from "axios";

class ContactRepository {
  async createContact(data) {
    try {
      const apiUrl = process.env.MAUTIC_API_URL;
      const mauticUrl = process.env.MAUTIC_URL;
      const publicKey = process.env.MAUTIC_PUBLIC_KEY;
      const secretKey = process.env.MAUTIC_SECRET_KEY;

      // Obtén un token de acceso
      const authResponse = await axios.post(`${mauticUrl}/oauth/v2/token`, {
        client_id: publicKey,
        client_secret: secretKey,
        grant_type: "client_credentials",
      });

      const accessToken = authResponse.data.access_token;

      // Crea el contacto utilizando el token de acceso
      const response = await axios.post(`${apiUrl}/contacts/new`, data, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      console.log("Contacto creado exitosamente");
      return response.data;
    } catch (error) {
      console.error("Error al crear el contacto:", error);
      throw error;
    }
    // return prisma.user.create({
    //   data,
    // });
  }
}

export default new ContactRepository();
