export const validCategoria = (nombreCategoria) =>{
    if (!nombreCategoria) {
        return "El campo nombre es requerido";
    }

    return null;
}