import axios from "axios";
import FormData from "form-data";
export const createFamilySIGE = async (name, token) => {
  try {
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
    return respFamily.data;
  } catch (error) {
    console.error("Error creating family:", error);
    throw error;
  }
};
export const createFamiliarsSIGE = async (id_gpf, data, token) => {
  try {
    const formData = new FormData();

    formData.append("id", "");
    formData.append("id_fam", "");
    formData.append("id_gpf", id_gpf);
    formData.append("id_anio", 8);
    formData.append("es_padre_madre", true);
    formData.append("est", "A");
    /**El role P : PADRE Y M : MADRE */
    data.person.role === "P"
      ? formData.append("id_par", 2)
      : formData.append("id_par", 1);
    /**El role P : PADRE Y M : MADRE */
    data.person.type_doc === "DNI"
      ? formData.append("id_tdc", 1)
      : formData.append("id_tdc", 3);

    formData.append("nro_doc", data.person.doc_number);
    formData.append("ubigeo", data.person.ubigeo);
    /**El role P : PADRE Y M : MADRE */
    data.person.role === "P"
      ? /**Si es PADRE entonces es Genero Masculino y su id en SIGE ES :1  */
        formData.append("id_gen", 1)
      : /**Si es MADRE entonces es Genero Femenino y su id en SIGE ES :0  */
        formData.append("id_gen", 0);
    formData.append("ape_pat", data.person.lastname);
    formData.append("ape_mat", data.person.mLastname);
    formData.append("nom", data.person.name);
    /**Cambio de formato de fecha asegun SIGE  */
    const fecha = new Date(data.person.birthdate);
    const day = fecha.getDate();
    const month = fecha.getMonth() + 1;
    const year = fecha.getFullYear();
    formData.append("fec_nac", `${day}/${month}/${year}`);
    /**Si es SOLTERO entonces su ID en SIGE ES :1 Y SI NO 2(CASADO) */
    // data.person.civil_status === 'soltero'
    // ?formData.append("id_eci", 1)
    // :formData.append("id_eci", 2);
    //-----SIEMPRE SOLTERO POR MIENTRAS-----
    formData.append("id_eci", 1);
    formData.append(
      "prof",
      data.person.profession !== null ? data.person.profession : ""
    );
    formData.append("cel", data.phone);
    formData.append("tlf", "");
    formData.append("corr", data.email !== null ? data.email : "");
    formData.append("email_inst", "");
    const urlFamiliars = `http://login.ae.edu.pe:8081/sige-mat/api/familiar/actualizarInformacion`;

    const respFamiliars = await axios.post(urlFamiliars, formData, {
      headers: {
        Authorization: `${token}`,
      },
    });
    return respFamiliars.data;
  } catch (error) {
    console.error("Error creating family:", error);
    throw error;
  }
};
export const createStudentSIGE = async (id_gpf, data, token) => {
  try {
    const formData = new FormData();
    formData.append("cod", "");
    formData.append("id_anio", "");
    formData.append("id_gpf", id_gpf);
    // /**El role P : PADRE Y M : MADRE */
    data.type_doc === "DNI"
      ? formData.append("id_tdc", 1)
      : formData.append("id_tdc", 3);

    formData.append("nro_doc", data.doc_number);
    formData.append("ubigeo", data.ubigeo !== null ? data.person.ubigeo : "");
    formData.append("ape_pat", data.lastname);
    formData.append("ape_mat", data.mLastname);
    formData.append("nom", data.name);
    /**El role P : PADRE Y M : MADRE */
    data.gender === "M"
      ? /**Si es  Genero Masculino y su id en SIGE ES :1  */
        formData.append("id_gen", 1)
      : /**Si es Genero Femenino y su id en SIGE ES :0  */
        formData.append("id_gen", 0);
    /**Alumno SOLTERO entonces su ID en SIGE ES :1  */
    formData.append("id_eci", 1);
    /**Cambio de formato de fecha asegun SIGE  */
    const fecha = new Date(data.birthdate);
    const day = fecha.getDate();
    const month = fecha.getMonth() + 1;
    const year = fecha.getFullYear();
    formData.append("fec_nac", `${day}/${month}/${year}`);
    formData.append("corr", "");
    formData.append("email_inst", "");
    formData.append("cel", "");
    formData.append("id_pais_nac", "");
    /**Alumno religion CRISTIANA CATOLIGA por defecto con ID:1  */
    formData.append("id_rel", 1);
    /**Alumno con idioma CASTELLANO por defecto con ID:1  */
    formData.append("id_idio1", "2");
    formData.append("id_idio2:", "");
    /**Alumno no TRABAJA por defecto con valor :0  */
    formData.append("trab:", 1);
    /**Alumno con condicion DEPENDIENTE por defecto con valor :2  */
    formData.append("id_cond:", 2);
    formData.append("usuario:", "");
    formData.append("pass_educando:", "");
    formData.append("est", "A");

    const urlFamiliars = `http://login.ae.edu.pe:8081/sige-mat/api/alumno/alumnoActualizacion`;

    const respFamiliars = await axios.post(urlFamiliars, formData, {
      headers: {
        Authorization: `${token}`,
      },
    });
    return respFamiliars.data;
  } catch (error) {
    console.error("Error creating family:", error);
    throw error;
  }
};
