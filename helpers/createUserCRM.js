import axios from "axios";
// import qs from "qs";
export async function createUserCRM(email,nombres,phone,sexo) {
  const data = {
    email: email,
    nombres: nombres,
    phone: phone,
    sexo: sexo,
  };
  try {
    const response = await axios.post(
      "https://hook.eu2.make.com/ifoave1tkfo844qnspcxlg33almo4h2g",
      data,
    );
    console.log(response.data);
    return response.data.id;
  } catch (error) {
    console.error("Error al crear usuario en CRM:", error);
  }
}