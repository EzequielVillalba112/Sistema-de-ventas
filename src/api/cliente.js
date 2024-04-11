import axios from "./axios";

export const crearCliente = (cliente) => axios.post('/add_cliente',cliente);
export const allCLienteAct = () => axios.get('/all_cliente_act');
export const allClienteDesact = () => axios.get('/all_cliente_desac');
export const searchCliente = (idCliente) => axios.get(`/cliente/${idCliente}`);
export const updateCliente = (clienteModif) => axios.post("/update_clientes",clienteModif);
export const deleteCliente = (idCliente) => axios.delete(`/cliente_delete/${idCliente}`);
export const desactivateCliente = (idClient) => axios.post(`/cliente_desact/${idClient}`)