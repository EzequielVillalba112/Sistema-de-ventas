import "./listProductCarrito.css";
import { useProductos } from "../../context/ProductoContext";
import { MdDeleteForever } from "react-icons/md";
import { IoIosAdd } from "react-icons/io";
import { IoRemoveOutline } from "react-icons/io5";
import { useCarrito } from "../../context/CarritoContext";

export default function ListProductCarrito() {
  const { urlImgProduct } = useProductos();
  const { productCarrito, sumarProducto, restarProducto, eliminarProducto } =
    useCarrito();

  return (
    <div className="container-list_carrito">
      {productCarrito.length > 0 ? (
        <ul>
          {productCarrito.map((product, i) => (
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
                  className="btn-eliminar-producto_carrito"
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
      ) : (
       
          <h1>No hay productos</h1>
       
      )}
    </div>
  );
}
