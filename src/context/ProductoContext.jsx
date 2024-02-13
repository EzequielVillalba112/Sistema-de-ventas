import { useContext } from "react";
import { createContext } from "react";
import { crearProducto } from "../api/productos";

const ProductoContext = createContext();

export const useProductos = () => {
  const context = useContext(ProductoContext);
  if (!context) {
    throw new Error("useProductos debe usarse dentro de un ProductoProvider");
  }
  return context;
};

export function ProductoProvider({ children }) {

    const createProducto = async (producto) => {
        const res = await crearProducto(producto);
        console.log(res);
    }

  return (
    <ProductoContext.Provider value={{createProducto,}}>
      {children}
    </ProductoContext.Provider>
  );
}