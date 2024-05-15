import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { listProdCC } from "../api/cuentaCorriente";

const CuentaCorrienteContext = React.createContext();

export const useCuentaCC = () => {
  const context = React.useContext(CuentaCorrienteContext);
  if (!context) {
    throw new Error("useContext debe usarse dentro del sistema de venta");
  }

  return context;
};

export function CuentaCorrienteProvider({ children }) {
    const [listProducCC, setListProducCC] = useState([]);

    const listarCuentaCC = async (idCliente) =>{
        try {
            const res = await listProdCC(idCliente);
            return res.data;
        } catch (error) {
            console.error(error);
        }
    }

  return (
    <CuentaCorrienteContext.Provider value={{listarCuentaCC}}>
      {children}
    </CuentaCorrienteContext.Provider>
  );
}

CuentaCorrienteProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
