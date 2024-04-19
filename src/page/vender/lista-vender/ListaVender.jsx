import PropTypes from "prop-types";
import { useProductos } from "../../../context/ProductoContext";
import { useEffect, useState } from "react";
import { MdAddShoppingCart } from "react-icons/md";
import { addCarrito, limitStock } from "../../../components/alert/alert";
export default function ListaVender({ productList, listSearch }) {
  const { urlImgProduct } = useProductos();
  const [list, setList] = useState([]);
  const [cantidadProducto, setCantidadProducto] = useState(1);

  useEffect(() => {
    if (listSearch.length == 0) {
      setList(productList);
    } else {
      setList(listSearch);
    }
  }, [listSearch, productList]);

  const addProduct = (dataProduct) => {
    const stock = dataProduct.stock - cantidadProducto;

    if (stock < 0) {
        limitStock();
        setCantidadProducto(1);
        return;
    }else{
        addCarrito();
        setCantidadProducto(1);
        return
    }
  };

  return (
    <>
      <ul>
        {list.map((product, i) => (
          <li key={i}>
            <div className="data-list">
              <img src={urlImgProduct + product.img_prod} />
              <div className="data">
                <div className="data-item">
                  <p>Nombre: </p>
                  <p className="data-prin">{product.nombre_prod}</p>
                </div>
                <div className="data-item">
                  <p>Precio: </p>
                  <p className="data-prin">{product.precio_pro}</p>
                </div>
                <div className="data-item">
                  <p>Cantidad: </p>
                  <input
                    type="number"
                    min="1"
                    defaultValue="1"
                    onChange={(e) => setCantidadProducto(e.target.value)}
                  />
                </div>
              </div>

              <button
                className="btn-add_carrito"
                onClick={() => {
                  addProduct(product);
                }}
              >
                <MdAddShoppingCart color="#ffff" size="1.2rem" />
              </button>
            </div>
          </li>
        ))}
      </ul>
    </>
  );
}

ListaVender.propTypes = {
  productList: PropTypes.array.isRequired,
  listSearch: PropTypes.array.isRequired,
};
