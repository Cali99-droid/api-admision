import axios from "axios";
export const verifyFamilySIGE = async (lastname,mLastname,token) => {
    try {
      const param = `${lastname}%20${mLastname}`;
      const urlFamily = `http://login.ae.edu.pe:8081/sige-mat/api/gruFam/verficarFamilia/${param}`;
      const respFamily = await axios.get(urlFamily, {
        headers: {
          Authorization: `${token}`,
        },
      });
      return respFamily.data;
    } catch (error) {
      console.error("Error verify family:", error);
      throw error;
    }
  };
