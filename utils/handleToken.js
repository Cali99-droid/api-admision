const generateId = () => {
  return Date.now().toString(32) + Math.random().toString(32).substring(2);
};
export default generateId;

export function generateCode() {
  const min = 1000; // El valor mínimo (inclusive) de un número de 4 dígitos
  const max = 9999; // El valor máximo (inclusive) de un número de 4 dígitos

  // Genera un número aleatorio en el rango deseado
  const numeroAleatorio = Math.floor(Math.random() * (max - min + 1)) + min;

  return numeroAleatorio;
}
