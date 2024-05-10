import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import {
  allCLienteAct,
  crearCliente,
  allClienteDesact,
  searchCliente,
  updateCliente,
  deleteCliente,
  desactivateCliente,
  validateClienteExisting
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

  //Agrega clientes
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

  //Trae todos los clientes Activos
  const allClienteAct = async () => {
    try {
      const res = await allCLienteAct();
      return res.data;
    } catch (error) {
      console.error("Error al listar Clientes: ", error);
      return false;
    }
  };

  //Trae todos los clientes Desactivados
  const allClienteDes = async () => {
    try {
      const res = await allClienteDesact();
      return res.data;
    } catch (error) {
      console.error("Error al listar Clientes: ", error);
      return false;
    }
  };

  //Habilita la interfaz para modificar un cliente
  const modificarClienteInterfaz = (id) => {
    setIdCliete(id);
    setModfiClienteInterfaz(true);
  };
  
  const updateClienteData = async (clienteData) => {
    
    try {
      const res = await updateCliente(clienteData);
      if (res.statusText === "OK") {
        return true;
      } else {
        return false;
      }
    } catch (error) {
      console.error("Error al actualizar Cliente: ", error);
      return false;
    }
  }

  const eliminarCliente = async (id) => {
  
    try {
      if(id != "") {
        const res = await deleteCliente(id);
        if(res.status === 200) {
          return "Cliente eliminado";
        }else{
          console.error("No se pudo eliminar el cliente. Código de estado:", res.status);
          return false;
        }
      }
    } catch (error) {
      if (error.response && error.response.data && error.response.data.error) {
        return { error: error.response.data.error, status: 400 };
      } else {
        return { error: error.message, status: 400 };
      }
    }
  }

  const desacCliente = async (id) => {
    try {
      return await desactivateCliente(id);
    } catch (error) {
      console.error("Error al desactivar el cliente:", error);
      throw error;
    }
  }

  const validClienteExisten = async (dataClient) => {
    try {
      return await validateClienteExisting(dataClient);
    } catch (error) {
      return (error.response.data);
    }
  }

  //Busca un cliente y guarda los datos del cliente
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
        dataClienteModif,
        updateClienteData,
        idCliente,
        eliminarCliente,
        desacCliente,
        validClienteExisten
      }}
    >
      {children}
    </ClienteContext.Provider>
  );
}

ClienteProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
