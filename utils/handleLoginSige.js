import axios from "axios";
import FormData from "form-data";
export const loginSIGE = async () => {
  const loginUrl = process.env.SIGE_URL_LOGIN;

  const user = process.env.SIGE_USER;
  const password = process.env.SIGE_PASSWORD;
  const formData = new FormData();

  formData.append("login", user);
  formData.append("password", password);

  const loginResponse = await axios.post(loginUrl, formData);
  const { data } = loginResponse;
  const token = data.result.token;

  return token;
};
