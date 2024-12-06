export async function updateUserCRM(person) {
  const data = {
    crmGHLId: person.crmGHLId,
    phone: person.phone,
    names: person.names,
  };
  try {
    const response = await axios.post(
      "https://hook.eu2.make.com/lpdphbi6oyx9swtpnw4r45j4hr5btznq",
      data
    );
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error("Error al crear usuario en CRM:", error);
  }
}
