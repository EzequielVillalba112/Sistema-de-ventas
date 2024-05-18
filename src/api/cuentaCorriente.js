import axios from "./axios";

export const listProdCC = (idClient) => axios.get(`/cuenta_corriente/${idClient}`);
export const payOffCC = (data) => axios.delete("/saldar_cuenta", data);