import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import moment from "moment";
import "moment/locale/es";
import { useProductos } from "./ProductoContext";
import {
  deleteProductCarrito,
  limitStock,
  makeSale,
  notError,
  notSuccess,
} from "../components/alert/alert";
import { addSaleCC, addSaleProd } from "../api/vender";

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

  //Datos para el carrito
  const listProductCarrito =
    JSON.parse(localStorage.getItem("listProductCarrito")) ?? [];
  const dataCliente =
    JSON.parse(localStorage.getItem("dataClienteCarrito")) ?? [];
  const [productCarrito, setProductCarrito] = useState(listProductCarrito);
  const [dataClientSelect, setDataClientSelect] = useState(dataCliente);
  const [total, setTotal] = useState(0);

  const { listProductAct } = useProductos();

  //Agrega un producto al carrito, en el objeto "productCarrito"
  const addProductCarrito = (idProduct, cantidadProducto) => {
    const check = productCarrito.every((item) => {
      return item.id_producto !== idProduct;
    });

    if (check) {
      const data = listProductAct.filter((producto) => {
        return producto.id_producto === idProduct;
      });

      const dataProduct = { ...data[0], cantidad: cantidadProducto };

      setProductCarrito([...productCarrito, dataProduct]);
      return true;
    } else {
      return "El producto ya se encuentra añadido al carrito";
    }
  };
  //Suma una unidad mas al producto que se encuentra en el carrito
  const sumarProducto = (id) => {
    productCarrito.forEach((item) => {
      if (item.id_producto === id) {
        if (item.stock > item.cantidad) {
          item.cantidad += 1;
        } else {
          limitStock();
        }
      }
      setProductCarrito([...productCarrito]);
    });
  };

  //Resta una unidad mas al producto que se encuentra en el carrito
  const restarProducto = (id) => {
    productCarrito.forEach((item) => {
      if (item.id_producto === id) {
        if (item.cantidad > 1) {
          item.cantidad -= 1;
        }
        setProductCarrito([...productCarrito]);
      }
    });
  };

  //Elimina un producto del carrito
  const eliminarProducto = (id) => {
    const message = "¿Estas seguro de eliminar este producto del carrito?";
    const funcEliminar = () => {
      productCarrito.forEach((item, index) => {
        if (item.id_producto === id) {
          productCarrito.splice(index, 1);
        }
      });
      setProductCarrito([...productCarrito]);
    };

    deleteProductCarrito(funcEliminar, message);
  };

  const clearCarrito = () => {
    const message = "¿Estas seguro de vaciar el carrito?";
    const functClear = () => {
      setProductCarrito([]);
    };
    deleteProductCarrito(functClear, message);
  };

  const vender = () => {
    if (dataClientSelect == "") {
      ventaStandar();
      return;
    } else {
      ventaCC();
    }
  };

  const ventaStandar = async () => {
    const message = "¿Estas seguro de realizar la venta?";
    const messageErrorCarrito =
      "El carrito está vacío, no se puede realizar la venta.";
    const messageBtn = "Vender";

    if (productCarrito.length > 0) {
      const makeMessage = await makeSale(message, messageBtn);
      if (makeMessage) {
        const res = await addSaleProd({
          productCarrito,
          fecha_venta: fechaVenta,
          total_venta: total,
        });

        if (res.status === 200) {
          notSuccess("Venta realizada ");
          setProductCarrito([]);
        } else {
          notError(res.error);
        }
      }
    } else {
      notError(messageErrorCarrito);
      return;
    }
  };

  const ventaCC = async () => {
    const message = "Cliente CC, SUPERO LÍMITE DE COMPRA, ¿desea continuar?";
    const messageBtn = "Continuar";

    if (total > dataClientSelect.limite_cc) {
      const makeMessage = await makeSale(message, messageBtn);
      if (makeMessage) {
        makeSaleCC();
      }
    } else {
      const message = "¿Estas seguro de realizar el registro a cuenta CC?";
      const messageBtn = "Vender";
      const makeMessage = await makeSale(message, messageBtn);
      if (makeMessage) {
        makeSaleCC();
      }
     
    }
  };

  const makeSaleCC = async () => {
    try {
      const res = await addSaleCC({
        dataClientSelect,
        productCarrito,
        fechaVenta,
        total,
      });

      if (res.status === 200) {
        notSuccess("Venta realizada ");
        setProductCarrito([]);
        setDataClientSelect([]);
      } else {
        notError(res.error);
      }
    } catch (error) {
      console.error("Error al realizar la venta: ", error);
      throw error;
    }
  };

  //Calcula el total de la compra del carrito
  useEffect(() => {
    let suma = 0;
    for (let key in productCarrito) {
      suma += productCarrito[key].precio_pro * productCarrito[key].cantidad;
    }
    setTotal(suma);
  }, [productCarrito]);

  //Cada vez que cambia los valores del carrito lo guarda al localStorage
  useEffect(() => {
    localStorage.setItem("listProductCarrito", JSON.stringify(productCarrito));
  }, [productCarrito]);

  //Cada vez que cambia los valores del Cliente CC lo guarda al localStorage
  useEffect(() => {
    localStorage.setItem(
      "dataClienteCarrito",
      JSON.stringify(dataClientSelect)
    );
  }, [dataClientSelect]);

  //Cuando el limite de la cuenta es superado muestra una notificacion
  const calLimitCuentaCC = () => {
    if (dataClientSelect.limite_cc < total) {
      alert("Limite superado");
    }
  };

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
        total,
        sumarProducto,
        restarProducto,
        eliminarProducto,
        clearCarrito,
        vender,
      }}
    >
      {children}
    </CarritoContext.Provider>
  );
}
CarritoProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
