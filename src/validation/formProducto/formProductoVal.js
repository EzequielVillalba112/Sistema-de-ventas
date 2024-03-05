export const validFormProduct = (categoria, nombreProd, precioProd, categoriaProd, stockProd, codBarProd, descripcionProd) => {
     // Verificar que todos los campos obligatorios estén presentes
     if (!categoria || !nombreProd || !precioProd || !categoriaProd || !stockProd || !codBarProd || !descripcionProd) {
        return "Todos los campos son obligatorios";
    }

    // Verificar que el precio sea un número positivo
    if (isNaN(precioProd) || precioProd <= 0) {
        return "El precio debe ser un número positivo";
    }

    // Verificar que el stock y el código de barras sean números positivos
    if (isNaN(stockProd) || stockProd <= 0 || isNaN(codBarProd) || codBarProd <= 0) {
        return "El stock y el código de barras deben ser números positivos";
    }

    // Verificar que el código de barras solo contenga números
    if (!/^\d+$/.test(codBarProd)) {
        return "El código de barras debe contener solo números";
    }

    // Si pasa todas las validaciones, retorna null indicando que no hay errores
    return null;
}