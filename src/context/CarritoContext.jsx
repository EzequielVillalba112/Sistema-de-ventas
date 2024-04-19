import React, { useState } from "react";
import PropTypes from "prop-types";
import moment from "moment";
import "moment/locale/es";

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
        setDataClientSelect
      }}
    >
      {children}
    </CarritoContext.Provider>
  );
}
CarritoProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
