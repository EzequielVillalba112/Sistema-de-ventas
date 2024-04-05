import { useEffect, useState } from "react";
import { useProductos } from "../../context/ProductoContext";
import "./buscador.css";
import PropTypes from "prop-types";
import { notSearchFalse } from "../alert/alert";
import { useCliente } from "../../context/ClienteContext";

//resibe los valores para renderizar el input del buscador
export default function Buscador({
  search = [],
  placeholder,
  status,
  nameTabSearch,
}) {
  const { listProductAct, listProductDesac } = useProductos();
  const { allClienteAct, allClienteDes } = useCliente();
  const [inputSearch, setInputSearch] = useState("");

  const searchDate = async () => {
    if (inputSearch !== "") {
      const query = inputSearch.toLowerCase();
      //Verfica en que lista de producto tiene que realizar la busqueda

      if (nameTabSearch == "Cliente") {
        const listCliente = status
          ? await allClienteAct()
          : await allClienteDes();

        const resultados = listCliente.filter(
          (cliente) =>
            cliente.nombre_cliente.toLowerCase().includes(query) ||
            cliente.apellido_cliente.toLowerCase().includes(query)
        );

        if (resultados.length === 0) {
          //Llama a la notificacion de error
          notSearchFalse("cliente");
        } else {
          return search(resultados);
        }
      } else if (nameTabSearch == "Producto") {
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
  nameTabSearch: PropTypes.string.isRequired,
};
