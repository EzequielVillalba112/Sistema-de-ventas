import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import moment from "moment";
import "moment/locale/es";
import { useProductos } from "./ProductoContext";

const CarritoContext = React.createContext();

export const useCarrito = () => {
  const context = React.useContext(CarritoContext);

  if (!context) {
    throw new Error("useCarrito debe usarse dentro de un CarritoProvider");
  }
  return context;
};

export function CarritoProvider({ children }) {
  const [actCarrito, setActCarrito] = useState(false);
  const [fechaVenta, setFechaVenta] = useState(
    moment().format("YYYY-MM-DD HH:mm")
  );
  const [productCarrito, setProductCarrito] = useState([]);
  const [dataClientSelect, setDataClientSelect] = useState([]);
  const [total, setTotal] = useState(0);

  const {listProductAct} = useProductos();

  const addProductCarrito = (idProduct, cantidadProducto) => {
    const check = productCarrito.every(item => {
        return item.id_producto !== idProduct;
    })
    
    if(check){
      const data = listProductAct.filter(producto => {
        return producto.id_producto === idProduct;
      })

      const dataProduct ={...data[0], cantidad:cantidadProducto}

      setProductCarrito([...productCarrito, dataProduct]);
      return true;
    }else{
      return "El producto ya se encuentra añadido al carrito";
    }
  }

  return (
    <CarritoContext.Provider
      value={{
        actCarrito,
        setActCarrito,
        setFechaVenta,
        fechaVenta,
        productCarrito,
        setProductCarrito,
        dataClientSelect,
        setDataClientSelect,
        addProductCarrito,
        setTotal,
        total
      }}
    >
      {children}
    </CarritoContext.Provider>
  );
}
CarritoProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
