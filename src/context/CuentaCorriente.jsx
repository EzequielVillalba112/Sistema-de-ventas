import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { customerBalance, listProdCC, payOffCC } from "../api/cuentaCorriente";
import { makeSale, notError, notSuccess } from "../components/alert/alert";

const CuentaCorrienteContext = React.createContext();

export const useCuentaCC = () => {
  const context = React.useContext(CuentaCorrienteContext);
  if (!context) {
    throw new Error("useContext debe usarse dentro del sistema de venta");
  }

  return context;
};

export function CuentaCorrienteProvider({ children }) {
  const cuentaSaldada = () => {
    const message = "Cuenta saldada ";
    notSuccess(message);
  };

  const payOffccContext = async (idCliente) => {
    const res = await payOffCC(idCliente);
    if (res.status === 200) {
      cuentaSaldada();
    } else {
      console.log(res);
    }
  };

  const saldarCuentaCC = async (data) => {
    console.log(data);
    try {
      if (data.entrega === 0) {
        const message = "No hay un monto de entrega";
        notError(message);
      } else if (data.totalist > data.entrega) {
        const message =
          "Entrega inferior al total, queda un saldo de $" +
          (data.totalist -  data.entrega) +
          " ¿desea continuar?";
        const messageBtn = "Continuar";
        const res = await makeSale(message, messageBtn);
        if (res) {
          console.log(res);
          const resApi = await customerBalance(data);
          console.log(resApi);
          cuentaSaldada();
        } else {
          console.log("cancelado");
        }
      } else if (data.vuelto > 0) {
        const message = "Tiene un vuelto de $" + data.vuelto;
        const messageBtn = "Continuar";
        const res = await makeSale(message, messageBtn);
        if (res) {
          payOffccContext(data.idCliente)
        }
      } else {
        payOffccContext(data.idClientSelect)
      }
    } catch (error) {
      console.error(error);
    }
  };
  const listarCuentaCC = async (idCliente) => {
    try {
      const res = await listProdCC(idCliente);
      return res.data;
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <CuentaCorrienteContext.Provider value={{ listarCuentaCC, saldarCuentaCC }}>
      {children}
    </CuentaCorrienteContext.Provider>
  );
}

CuentaCorrienteProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
