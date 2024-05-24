import axios from "./axios";

export const listProdCC = (idClient) => axios.get(`/cuenta_corriente/${idClient}`);
export const payOffCC = (idCliente) => axios.delete(`/saldar_cuenta/${idCliente}`);
export const customerBalance = (data) => axios.post("/saldo_clienteCC", data);