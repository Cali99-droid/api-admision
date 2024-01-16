import axios from "axios";

export const getVacantSIGE = async () => {
  const loginUrl = process.env.SIGE_URL_LOGIN;
  const vacantUrl = process.env.SIGE_URL_VACANT;
  const user = process.env.SIGE_USER;
  const password = process.env.SIGE_PASSWORD;

  const formData = new FormData();
  formData.append("login", user);
  formData.append("password", password);

  const loginResponse = await axios.post(loginUrl, formData);
  const { data } = loginResponse;
  const token = data.result.token;

  const matriculaUrl = `${vacantUrl}?id_anio=8&id_suc=${""}&id_niv=${""}&id_gir=1&id_gra=${""}`;
  const matriculaResponse = await axios.get(matriculaUrl, {
    headers: {
      Authorization: `${token}`,
    },
  });
  const resp = matriculaResponse.data.result;
  const sucursalMapping = {
    "Local 1 - Jr. Huaylas 220": 1,
    "Local 2 - Einstinitos 2": 2,
    "Local 3 - Jr. Huaylas 245": 3,
  };

  const nivelMapping = {
    INICIAL: 1,
    PRIMARIA: 2,
    SECUNDARIA: 3,
  };

  resp.forEach((obj) => {
    obj.sucursal = sucursalMapping[obj.sucursal] || obj.sucursal;
    obj.nivel = nivelMapping[obj.nivel] || obj.nivel;

    if (obj.id_gra >= 4 && obj.id_gra <= 9) {
      obj.id_gra -= 3;
    } else if (obj.id_gra >= 10 && obj.id_gra <= 15) {
      obj.id_gra -= 9;
    }
  });
  return resp;
};
