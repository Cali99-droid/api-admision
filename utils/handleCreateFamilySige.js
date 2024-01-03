import axios from "axios";
import { loginSIGE } from "./handleLoginSige.js";
import qs from "qs";
export const createFamilySIGE = async (name) => {
  try {
    const token = await loginSIGE();

    const data = { nom: name };

    const urlFamily = `http://login.ae.edu.pe:8081/sige-mat/api/gruFam`;
    const options = {
      method: "POST",
      headers: {
        Authorization: `${token}`,
        "content-type": "application/x-www-form-urlencoded; charset=UTF-8",
      },
      data: qs.stringify(data),
      url: urlFamily,
    };
    const respFamily = await axios(options);
    console.log(respFamily);
    return respFamily;
  } catch (error) {
    console.error("Error creating family:", error);
    throw error;
  }
};
