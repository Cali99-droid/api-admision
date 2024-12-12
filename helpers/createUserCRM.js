import axios from "axios";
// import qs from "qs";
export async function createUserCRM(person) {
  const data = {
    id: person.id,
    doc_number: person.doc_number,
    email: person.email,
    names: person.names,
    phone: person.phone,
    level: person.level,
    grade: person.grade,
    gender: person.gender,
    opportunity: person.opportunity,
  };
  try {
    const response = await axios.post(
      process.env.URL_WEBHOOK_GHL,
    );
    console.log(response.data);
    return response.data.id;
  } catch (error) {
    console.error("Error al crear usuario en CRM:", error);
  }
}
