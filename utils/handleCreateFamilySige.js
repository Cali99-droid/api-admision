import axios from "axios";
import { loginSIGE } from "./handleLoginSige.js";
export const createFamilySIGE = async (name) => {
  try {
    const token = await loginSIGE();
    const formData = new FormData();

    formData.append("id", "");
    formData.append("id_usr", "");
    formData.append("cod", "");
    formData.append("nom", name);
    formData.append("est", "A");
    formData.append("login", "");
    formData.append("password", "");
    formData.append("id_dep", "");
    formData.append("id_pro", "");
    formData.append("id_dist", "");
    formData.append("direccion", "");
    formData.append("referencia", "");

    const urlFamily = `http://login.ae.edu.pe:8081/sige-mat/api/gruFam`;

    const respFamily = await axios.post(urlFamily, formData, {
      headers: {
        Authorization: `${token}`,
      },
    });
    console.log(respFamily.data);
    return respFamily;
  } catch (error) {
    console.error("Error creating family:", error);
    throw error;
  }
};
