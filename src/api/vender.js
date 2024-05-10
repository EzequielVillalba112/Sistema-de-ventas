import axios from "./axios";

export const addSaleProd = (venta) => axios.post("/vender", venta);
export const addSaleCC = (ventaCC) => axios.post("/vender_cc", ventaCC);