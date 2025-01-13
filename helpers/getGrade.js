export function getGradeEd(numero) {
  const niveles = {
    1: "3 años",
    2: "4 años",
    3: "5 años",
    4: "Primer Grado",
    5: "Segundo Grado",
    6: "Tercer Grado",
    7: "Cuarto Grado",
    8: "Quinto Grado",
    9: "Sexto Grado",
    10: "Primer Año de Secundaria",
    11: "Segundo Año de Secundaria",
    12: "Tercer Año de Secundaria",
    13: "Cuarto Año de Secundaria",
    14: "Quinto Año de Secundaria",
  };

  return niveles[numero] || "Nivel no válido";
}
