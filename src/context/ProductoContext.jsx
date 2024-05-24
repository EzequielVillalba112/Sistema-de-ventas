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
  validateProductExisting,
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
  //Guarda las lista de los productos
  const [listProductAct, setListProductAct] = useState([]);
  const [listProductDesac, setListProductDesac] = useState([]);
  //
  const [modifiProductInterfaz, setModifiProductInterfaz] = useState(false);
  const [idProductModifi, setIdProductModifi] = useState("");

  const [dataProductModifi, setDataProductModifi] = useState([]);

  //Link con la ubicacion de las img
  const urlImgProduct = "http://localhost:3000/";

  //Lista los producto desactivados
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
  //Lista los productos que se encuente activos
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
  //Envia un objeto al back con los datos del producto
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
  //Modifica los datos del producto
  const updateProduct = async (product) => {
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
  //Modifica el estado del producto para abrir o cerrar la interfaz de moficar producto
  const modificarProductInterfaz = (id) => {
    setIdProductModifi(id);
    setModifiProductInterfaz(true);
  };
  //Elimina los productos para funcionar necesita el id del producto
  const deleteProduct = async (id) => {
    try {
      if (id != "") {
        const res = await deleteProducto(id);
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
  //Desactiva los productos que no se puede eliminar porque otro sector de la base de datos lo esta usando
  const desactivateProduct = async (id) => {
    try {
      return await desactivateProducto(id);
    } catch (error) {
      console.error("Error al desactivar el producto:", error);
      throw error;
    }
  };
  //Valida si el nombre o cod-barra del producto ya existe, si no existe retorna un valor 200
  const validProductExisting = async (dataProduct) => {
    try {
      return await validateProductExisting(dataProduct);
    } catch (error) {
      return (error.response.data);
    }
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
        desactivateProduct,
        validProductExisting
      }}
    >
      {children}
    </ProductoContext.Provider>
  );
}

ProductoProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
