import { useEffect, useState } from "react";
import { useProductos } from "../../context/ProductoContext";
import "./buscador.css";
import PropTypes from "prop-types";
import { notSearchFalse } from "../alert/alert";

//resibe los valores para renderizar el input del buscador
export default function Buscador({ search = [], placeholder, status }) {
  const { listProductAct, listProductDesac } = useProductos();
  const [inputSearch, setInputSearch] = useState("");

  const searchDate = () => {
    if (inputSearch !== "") {
      const query = inputSearch.toLowerCase();
      //Verfica en que lista de producto tiene que realizar la busqueda
      const productList = status ? listProductAct : listProductDesac;

      const resultados = productList.filter(
        (producto) =>
          producto.nombre_prod.toLowerCase().includes(query) ||
          producto.cod_barra == inputSearch
      );

      if (resultados.length === 0) {
        //Llama a la notificacion de error
        notSearchFalse("producto");
      } else {
        return search(resultados);
      }
    }
  };

  //cada vez que se cambie el status de la lista se limpia el buscador
  useEffect(() => {
    setInputSearch("");
  }, [status]);

  //Si se borra lo que se está buscando, la lista se vuelve a mostrar completa.
  useEffect(() => {
    search([]);
  }, [inputSearch === ""]);

  useEffect(() => {
    setInputSearch("");
  }, [search == []]);

  return (
    <div className="buscador-productos">
      <input
        type="text"
        placeholder={placeholder}
        value={inputSearch}
        onChange={(e) => {
          setInputSearch(e.target.value);
        }}
      />
      <button onClick={searchDate}>Buscar</button>
    </div>
  );
}

Buscador.propTypes = {
  search: PropTypes.func.isRequired,
  placeholder: PropTypes.string.isRequired,
  status: PropTypes.bool.isRequired,
};
