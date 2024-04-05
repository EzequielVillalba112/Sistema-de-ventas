import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import {
  allCLienteAct,
  crearCliente,
  allClienteDesact,
  searchCliente,
} from "../api/cliente";

const ClienteContext = React.createContext();

export const useCliente = () => {
  const context = React.useContext(ClienteContext);
  if (!context) {
    throw new Error("useContext debe usarse dentro de un CategoryProvider");
  }

  return context;
};

export function ClienteProvider({ children }) {
  const [modfiClienteInterfaz, setModfiClienteInterfaz] = useState(false);
  const [idCliente, setIdCliete] = useState("");
  const [dataClienteModif, setDataClienteModif] = useState([]);

  const addCliente = async (clienteData) => {
    try {
      const res = await crearCliente(clienteData);
      if (res.statusText == "OK") {
        return true;
      } else {
        return false;
      }
    } catch (error) {
      console.error("Error al agregar Cliente: ", error);
      return false;
    }
  };

  const allClienteAct = async () => {
    try {
      const res = await allCLienteAct();
      return res.data;
    } catch (error) {
      console.error("Error al listar Clientes: ", error);
      return false;
    }
  };

  const allClienteDes = async () => {
    try {
      const res = await allClienteDesact();
      return res.data;
    } catch (error) {
      console.error("Error al listar Clientes: ", error);
      return false;
    }
  };

  const modificarClienteInterfaz = (id) => {
    setIdCliete(id);
    setModfiClienteInterfaz(true);
  };

  useEffect(() => {
    const dataCliente = async () => {
      const validCliente = idCliente !== "" && modfiClienteInterfaz;

      if (validCliente) {
        try {
          const res = await searchCliente(idCliente);
          if (res.status === 200) {
            setDataClienteModif(res.data[0]);
          } else {
            console.error(
              "Error al buscar Cliente . Código de estado:",
              res.status
            );
          }
        } catch (error) {
            console.error("Error al buscar cliente:", error);
        }
      }
    };
    dataCliente();
  }, [idCliente, modfiClienteInterfaz]);

  return (
    <ClienteContext.Provider
      value={{
        addCliente,
        allClienteAct,
        allClienteDes,
        modificarClienteInterfaz,
        modfiClienteInterfaz,
        setModfiClienteInterfaz,
        dataClienteModif
      }}
    >
      {children}
    </ClienteContext.Provider>
  );
}

ClienteProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
