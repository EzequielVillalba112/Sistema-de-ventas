import axios from './axios';

export const crearProducto = (producto) => axios.post(`/add_producto`, producto);
export const listProductoAct = () => axios.get(`/all_productos_act`);
export const listProductoDesac = () => axios.get(`/all_productos_desac`);
export const searchDataProduct = (idProduct) => axios.get(`/producto/${idProduct}`);
export const updateProducto = (productoModif) => axios.post("/update_product", productoModif);
export const deleteProducto = (idProduct) => axios.delete(`/product_delete/${idProduct}`);
export const desactivateProducto = (idProduct) => axios.post(`/product_desactive/${idProduct}`);
export const validateProductExisting = (dataProduct) => axios.post('/validate_product_exxisten', dataProduct);