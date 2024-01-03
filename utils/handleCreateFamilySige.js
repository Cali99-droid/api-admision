import axios from "axios";
import { loginSIGE } from "./handleLoginSige.js";
import qs from "qs";
export const createFamilySIGE = async (name) => {
  try {
    const token = await loginSIGE();
    const formData = new FormData();

    formData.append("nom", name);
    formData.append("est", "A");

    const urlFamily = `http://login.ae.edu.pe:8081/sige-mat/api/gruFam`;

    const respFamily = await axios.post(urlFamily, formData, {
      headers: {
        Authorization: `${token}`,
      },
    });
    console.log(respFamily);
    return respFamily;
  } catch (error) {
    console.error("Error creating family:", error);
    throw error;
  }
};
