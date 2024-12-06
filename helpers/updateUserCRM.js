import axios from "axios";

export async function updateUserCRM(person) {
  const data = {
    crmGHLId: person.crmGHLId,
    phone: person.phone,
    name: person.name,
    lastName: person.lastName,
  };
  try {
    const response = await axios.post(
      "https://hook.eu2.make.com/lpdphbi6oyx9swtpnw4r45j4hr5btznq",
      data
    );
    return true;
  } catch (error) {
    console.error("Error al crear usuario en CRM:", error);
    return false;
  }
}
