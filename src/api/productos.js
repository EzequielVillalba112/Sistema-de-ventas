import axios from './axios';

export const crearProducto = (producto) => axios.post(`/add_producto`, producto);