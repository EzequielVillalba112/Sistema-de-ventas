import PropTypes from "prop-types";
import "./listData.css";
import { useEffect, useState } from "react";

export default function ListData({ listItems, listSearch, detail }) {
  const [list, setList] = useState([]);

  useEffect(() => {
    //Si la lista de busque esta vacia, solo renderiza la lista enviada 
    if (listSearch.length == 0) {
      setList(listItems);
    } else {
      setList(listSearch);
    }
  }, [listSearch, listItems]);

  return (
    <div className="container-list-items">
      <ul>
        {list.map((listItem, i) => (
          <li key={i} className="list-items">
            <div className="list-items-cont">

              <div className="data-list-con">
                <p>Nombre: </p>
                <p className="data-item-list">{listItem.nombre_cliente}</p>
              </div>

              <div className="data-list-con">
                <p>Apellido: </p>
                <p className="data-item-list">{listItem.apellido_cliente}</p>
              </div>

              <div className="data-list-con">
                <p>Limite CC: </p>
                <p className="data-item-list">{listItem.limite_cc}</p>
              </div>

              <div className="data-list-con">
                <p>Telefono: </p>
                <p className="data-item-list">{listItem.numero_telefono}</p>
              </div>
            </div>

            <button className="btn btn-detail" onClick={()=>{
              detail(listItem.id_cliente)
            }}>Detalles</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

ListData.propTypes = {
  listItems: PropTypes.array.isRequired,
  listSearch: PropTypes.array.isRequired,
  detail: PropTypes.func.isRequired
};
