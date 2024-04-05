export const validCliente = (nombreCliente, apellidoCliente, limiteCC) =>{
    const expRegLetras = /^[A-Za-z]+$/;
    
    if (!nombreCliente || !apellidoCliente || !limiteCC) {
        return "¡El campo nombre, apellido y limiteCC son requerido!";
    }

    if(isNaN(limiteCC) || limiteCC <= 0){
        return "El limite debe ser un número positivo";
    }
    if (!expRegLetras.test(nombreCliente) || !expRegLetras.test(apellidoCliente)) {
        return "El nombre y apellido deben contener solo letras";
    }

    return null;
}