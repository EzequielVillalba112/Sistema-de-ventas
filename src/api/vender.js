import axios from "./axios";

export const addSaleProd = (venta) => axios.post("/vender", venta)