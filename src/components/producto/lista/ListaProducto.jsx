import PropTypes from "prop-types";
import { useEffect, useState } from "react";
export default function ListaProducto({ productList, listSearch, detail }) {
  const [list, setList] = useState([]);

  useEffect(() => {
    if (listSearch.length == 0) {
      setList(productList);
    } else {
      setList(listSearch);
    }
  }, [listSearch]);

  return (
    <>
      <ul>
        {list.map((product, i) => (
          <li key={i}>
            <div className="data-list">
              <img src={"http://localhost:3000/" + product.img_prod} />
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
