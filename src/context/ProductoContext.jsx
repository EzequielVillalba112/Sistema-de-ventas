import React, { useEffect } from "react";
import PropTypes from "prop-types";

import {
  crearProducto,
  deleteProducto,
  desactivateProducto,
  listProductoAct,
  listProductoDesac,
  searchDataProduct,
  updateProducto,
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
  const [idProductModifi, setIdProductModifi] = useState("");

  const [dataProductModifi, setDataProductModifi] = useState([]);

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

 

  const urlImgProduct = "http://localhost:3000/";

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
  const updateProduct = async (product) => {
    console.log(product.body);
    try {
      const res = await updateProducto(product.body);
      if (res.statusText === "OK") {
        return true;
      } else {
        return false;
      }
    } catch (error) {
      console.error("Error al modificar producto:", error);
      return false;
    }
  };
  const modificarProductInterfaz = (id) => {
    setIdProductModifi(id);
    setModifiProductInterfaz(true);
  };

  const deleteProduct = async (id) => {
    try {
      if (id != "") {
        const res = await deleteProducto(id);
        console.log(res);
        if (res.status === 200) {
          // Verifica el código de estado de la respuesta
          return "Producto eliminado";
        } else {
          console.error(
            "No se pudo eliminar el producto. Código de estado:",
            res.status
          );
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
  };

  const desactivateProduct = async (id) =>{
    const res = desactivateProducto(id);
    return res;
  }

  useEffect(() => {
    async function fetchData() {
      const shouldFetch = idProductModifi !== "" && modifiProductInterfaz;
      if (shouldFetch) {
        try {
          const res = await searchDataProduct(idProductModifi);
          if (res.status === 200) {
            setDataProductModifi(res.data[0]);
          } else {
            console.error(
              "Error al buscar productos. Código de estado:",
              res.status
            );
          }
        } catch (error) {
          console.error("Error al buscar productos:", error);
        }
      }
    }

    fetchData();
  }, [idProductModifi, modifiProductInterfaz, setDataProductModifi]);

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
        setModifiProductInterfaz,
        dataProductModifi,
        urlImgProduct,
        updateProduct,
        deleteProduct,
        desactivateProduct
      }}
    >
      {children}
    </ProductoContext.Provider>
  );
}

ProductoProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
