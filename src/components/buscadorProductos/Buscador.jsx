import { useEffect } from "react";
import { useProductos } from "../../context/ProductoContext";
import "./buscador.css";
import PropTypes from "prop-types";
import { notSearchFalse } from "../alert/alert";

export default function Buscador({
  search = [],
  placeholder,
  status = [],
  value = "",
  onChange = [],
}) {
  const { listProductAct, listProductDesac } = useProductos();

  const searchDate = () => {
    if (status) {
      if (value != "") {
        let query = value.toLowerCase();
        let resultados = listProductAct.filter(
          (producto) =>
            producto.nombre_prod.toLowerCase().includes(query) ||
            producto.cod_barra == value
        );

        if (resultados.length == 0) {
          notSearchFalse("producto");
        } else {
          return search(resultados);
        }
      }
    } else {
      if (value != "") {
        let query = value.toLowerCase();
        let resultados = listProductDesac.filter(
          (producto) =>
            producto.nombre_prod.toLowerCase().includes(query) ||
            producto.cod_barra == value
        );

        if (resultados.length == 0) {
          notSearchFalse("producto");
        } else {
          return search(resultados);
        }
      }
    }
  };

  useEffect(() => {
    search([]);
  }, [value === ""]);

  useEffect(() => {
    onChange("");
  }, [search == []]);

  return (
    <div className="buscador-productos">
      <input
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={(e) => {
          onChange(e.target.value);
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
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};
