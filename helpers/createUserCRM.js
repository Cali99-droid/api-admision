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
      "https://services.leadconnectorhq.com/hooks/wp3Dzm0Ktsmq3kEgTA7A/webhook-trigger/15632cfb-76e5-4819-b192-a91eb9c9bc69",
      data
    );
    console.log(response.data);
    console.log(response.status);
    return response.data.id;
  } catch (error) {
    console.error("Error al crear usuario en CRM:", error);
  }
}
