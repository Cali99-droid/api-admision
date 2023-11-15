export async function validateRol(rols, role) {
  console.log(rols);
  let bool = false;
  rols.forEach((rol) => {
    if (rol.roles.id == role) {
      bool = true;
    }
  });

  return bool;
}
