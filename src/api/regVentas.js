import axios from './axios';

export const regVentas = () => axios.get('/all_regVentas');
export const detailSale = (idSale) => axios.get(`/detalle_venta/${idSale}`);