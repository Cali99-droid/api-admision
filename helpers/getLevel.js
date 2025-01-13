export function getLevel(nivel) {
  switch (nivel) {
    case 1:
      return "INICIAL";
    case 2:
      return "PRIMARIA";
    case 3:
      return "SECUNDARIA";
    default:
      return "Nivel no válido";
  }
}
