import React from 'react';
import PropTypes from 'prop-types';

import { crearProducto } from '../api/productos';

const ProductoContext = React.createContext();

export const useProductos = () => {
  const context = React.useContext(ProductoContext);
  if (!context) {
    throw new Error('useProductos debe usarse dentro de un ProductoProvider');
  }
  return context;
};

export function ProductoProvider({ children }) {

  const createProducto = async (producto) => {
    console.log(producto);
    const res = await crearProducto(producto);
    console.log(res);
  }

  return (
    <ProductoContext.Provider value={{ createProducto, children }}>
      {children}
    </ProductoContext.Provider>
  );
}

ProductoProvider.propTypes = {
  children: PropTypes.node.isRequired
};