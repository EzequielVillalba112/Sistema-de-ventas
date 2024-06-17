export const validUser = (nameUser, passUser, telefUser, rango) => {
  const ERROR_CAMPOS_REQUERIDOS =
    "¡El campo nombre, contraseña, y rango son requeridos!";
  const ERROR_LETRAS_NOMBRE_APELLIDO =
    "El nombre deben contener solo letras sin espacios";
  const ERROR_TELEFONO = "El telefono debe ser un número positivo";

  if (!nameUser || !passUser || !rango) {
    return ERROR_CAMPOS_REQUERIDOS;
  }

  if (telefUser && (isNaN(telefUser) || telefUser <= 0)) {
    return ERROR_TELEFONO;
  }

  if (!esSoloLetras(nameUser)) {
    return ERROR_LETRAS_NOMBRE_APELLIDO;
  }

  return null; // No hay errores
};

function esSoloLetras(texto) {
  const expRegLetras = /^[A-Za-z]+$/;
  return expRegLetras.test(texto);
}
