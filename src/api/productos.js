import axios from './axios';

export const crearProducto = (producto) => axios.post(`/add_producto`, producto);
export const listProductoAct = () => axios.get(`/all_productos_act`);
export const listProductoDesac = () => axios.get(`/all_productos_desac`);