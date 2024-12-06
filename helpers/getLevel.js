export function getLevel(nivel) {
  switch (nivel) {
    case 1:
      return "Inicial";
    case 2:
      return "Primaria";
    case 3:
      return "Secundaria";
    default:
      return "Nivel no válido";
  }
}
