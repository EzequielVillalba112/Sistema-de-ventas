import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { listProdCC } from "../api/cuentaCorriente";
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

  const saldarCuentaCC = async (entrega, total, vuelto) => {
    try {
      if (entrega === 0) {
        const message = "No hay un monto de entrega";
        notError(message);
      } else if (total > entrega) {
        const message =
          "Entrega inferior al total, queda un saldo de $" +
          (total - entrega) +
          " ¿desea continuar?";
        const messageBtn = "Continuar";
        const res = await makeSale(message, messageBtn);
        if (res) {
          cuentaSaldada();
        } else {
          console.log("cancelado");
        }
      } else if (vuelto > 0) {
        const message = "Tiene un vuelto de $" + vuelto;
        const messageBtn = "Continuar";
        const res = await makeSale(message, messageBtn);
        if (res) {
          cuentaSaldada();
        }
      } else {
        cuentaSaldada();
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
