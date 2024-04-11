export const validCliente = (nombreCliente, apellidoCliente, limiteCC) => {
    // Constantes para mensajes de error
    const ERROR_CAMPOS_REQUERIDOS = "¡El campo nombre, apellido y limiteCC son requeridos!";
    const ERROR_LIMITE_NO_POSITIVO = "El limite debe ser un número positivo";
    const ERROR_LETRAS_NOMBRE_APELLIDO = "El nombre y apellido deben contener solo letras sin espacios";

    // Validación de campos requeridos
    if (!nombreCliente || !apellidoCliente || !limiteCC) {
        return ERROR_CAMPOS_REQUERIDOS;
    }

    // Validación de limiteCC
    if (isNaN(limiteCC) || limiteCC <= 0) {
        return ERROR_LIMITE_NO_POSITIVO;
    }

    // Validación de nombre y apellido
    if (!esSoloLetras(nombreCliente) || !esSoloLetras(apellidoCliente)) {
        return ERROR_LETRAS_NOMBRE_APELLIDO;
    }

    return null; // No hay errores
}

// Función auxiliar para validar letras
function esSoloLetras(texto) {
    const expRegLetras = /^[A-Za-z]+$/;
    return expRegLetras.test(texto);
}
