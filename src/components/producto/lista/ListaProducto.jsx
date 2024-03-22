import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { useProductos } from "../../../context/ProductoContext";
export default function ListaProducto({ productList, listSearch, detail }) {
  const [list, setList] = useState([]);
  const {urlImgProduct} = useProductos();
  useEffect(() => {
    if (listSearch.length == 0) {
      setList(productList);
    } else {
      setList(listSearch);
    }
  }, [listSearch, productList]);

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
                  <p className="data-prin">{product.stock}</p>
                </div>
              </div>
              <button
                className="btn-detalles"
                onClick={() => {
                  detail(product.id_producto);
                }}
              >
                Detalles
              </button>
            </div>
          </li>
        ))}
      </ul>
    </>
  );
}

ListaProducto.propTypes = {
  productList: PropTypes.array.isRequired,
  listSearch: PropTypes.array.isRequired,
  detail: PropTypes.func.isRequired,
};
