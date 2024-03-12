import React from "react";
import PropTypes from "prop-types";

import {
  crearProducto,
  listProductoAct,
  listProductoDesac,
} from "../api/productos";
import { useState } from "react";

const ProductoContext = React.createContext();

export const useProductos = () => {
  const context = React.useContext(ProductoContext);
  if (!context) {
    throw new Error("useProductos debe usarse dentro de un ProductoProvider");
  }
  return context;
};

export function ProductoProvider({ children }) {
  const [listProductAct, setListProductAct] = useState([]);
  const [listProductDesac, setListProductDesac] = useState([]);

  const [modifiProductInterfaz, setModifiProductInterfaz] = useState(false);
  const [idProductModifi, setIdProductModifi] = useState();

  const listProductDesactivos = async () => {
    try {
      const res = await listProductoDesac();

      if (res.statusText === "OK") {
        setListProductDesac(res.data);
      } else {
        return false;
      }
    } catch (error) {
      console.error("Error al listar productos:", error);
      return false;
    }
  };

  const listProductActivos = async () => {
    try {
      const res = await listProductoAct();

      if (res.statusText === "OK") {
        setListProductAct(res.data);
      } else {
        return false;
      }
    } catch (error) {
      console.error("Error al listar productos:", error);
      return false;
    }
  };

  const createProducto = async (producto) => {
    try {
      const res = await crearProducto(producto.body);
      if (res.statusText === "OK") {
        return true;
      } else {
        return false;
      }
    } catch (error) {
      console.error("Error al crear producto:", error);
      return false;
    }
  };

  const  modificarProductInterfaz =  (id)=>{
    setIdProductModifi(id);
    setModifiProductInterfaz(true);
  }

  return (
    <ProductoContext.Provider
      value={{
        createProducto,
        listProductActivos,
        children,
        listProductAct,
        listProductDesactivos,
        listProductDesac,
        modificarProductInterfaz,
        idProductModifi,
        modifiProductInterfaz,
        setModifiProductInterfaz
      }}
    >
      {children}
    </ProductoContext.Provider>
  );
}

ProductoProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
