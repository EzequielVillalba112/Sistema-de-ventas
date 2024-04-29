import "./listProductCarrito.css";
import PropTypes from "prop-types";
import { useProductos } from "../../context/ProductoContext";
import { MdDeleteForever } from "react-icons/md";
import { IoIosAdd } from "react-icons/io";
import { IoRemoveOutline } from "react-icons/io5";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { useCarrito } from "../../context/CarritoContext";

export default function ListProductCarrito({ productCarrito }) {
  const { urlImgProduct } = useProductos();
  const [carrito, setCarrito] = useState([]);
  const{setTotal, total} = useCarrito();

  useEffect(() => {
    if (productCarrito.length != 0) {
      setCarrito(productCarrito);
    }
  }, []);

  const sumarProducto = (id) => {
    carrito.forEach((item) => {
      if (item.id_producto === id) {
        item.cantidad += 1;
      }
      setCarrito([...carrito]);
    });
  };

  const restarProducto = (id) => {
    carrito.forEach((item) => {
      if (item.id_producto === id) {
        if (item.cantidad > 1) {
          item.cantidad -= 1;
        }
        setCarrito([...carrito]);
      }
    });
  };

  const eliminarProducto = (id) => {
    Swal.fire({
      title: "¿Estas seguro de eliminar este producto?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si, Eliminar",
    }).then((result) => {
      if (result.isConfirmed) {
        carrito.forEach((item, index) => {
          if (item.id_producto === id) {
            carrito.splice(index, 1);
          }
        });
        setCarrito([...carrito]);
        Swal.fire({
          title: "Eliminado!",
          text: "Su archivo ha sido eliminado.",
          icon: "success",
        });
      }
    });
  };

  useEffect(()=>{
    let suma = 0;
    for(let key in carrito) {
        suma += (carrito[key].precio_pro * carrito[key].cantidad);
    }
    setTotal(suma);
  },[carrito])

  return (
    <div className="container-list_carrito">
       
      <ul>
        {carrito.map((product, i) => (
          <li key={i}>
            <div className="data-list_carrito">
              <img src={urlImgProduct + product.img_prod} />
              <div className="data-carrito">
                <div className="data-item_carrito">
                    <p>Nombre:</p>
                  <b className="data-item_carrito">{product.nombre_prod}</b>
                </div>
                <div className="data-item_carrito">
                    <p>Precio:</p>
                  <p className="data-prin">${product.precio_pro}</p>
                </div>
                <div className="data-item_carrito">
                  <div className="data-cantidad_prod">
                    <IoIosAdd
                      className="btn_prod add-prod"
                      color="#ffff"
                      size="1.5rem"
                      onClick={() => {
                        sumarProducto(product.id_producto);
                      }}
                    />
                    <b className="data-prin">{product.cantidad}</b>
                    <IoRemoveOutline
                      className="btn_prod rest-prod"
                      color="#ffff"
                      size="1.5rem"
                      onClick={() => {
                        restarProducto(product.id_producto);
                      }}
                    />
                  </div>
                </div>
                <div className="data-item_carrito">
                  <div className="total-product">
                    <p>Total:</p>
                    <p className="data-prin">
                      ${product.precio_pro * product.cantidad}
                    </p>
                  </div>
                </div>
              </div>

              <button
                className="btn-eliminar-cliente_data"
                onClick={() => {
                  eliminarProducto(product.id_producto);
                }}
              >
                <MdDeleteForever color="#ffff" size="1.5rem" />
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

ListProductCarrito.propTypes = {
  productCarrito: PropTypes.array.isRequired,
};
