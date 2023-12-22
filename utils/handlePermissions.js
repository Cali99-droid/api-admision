export async function validatePersissions(permission = [], perm) {
  let bool = false;
  permission.forEach((p) => {
    if (p.name === perm) {
      bool = true;
    }
  });

  return bool;
}
