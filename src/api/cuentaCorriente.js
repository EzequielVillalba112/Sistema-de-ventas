import axios from "./axios";

export const listProdCC = (idClient) => axios.get(`/cuenta_corriente/${idClient}`);