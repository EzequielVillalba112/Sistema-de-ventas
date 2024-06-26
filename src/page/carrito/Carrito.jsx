import {useState } from "react";
import Buscador from "../../components/buscadorProductos/Buscador";
import { useCarrito } from "../../context/CarritoContext";
import "./carrito.css";
import { IoCloseSharp } from "react-icons/io5";
import FormClienteVenta from "../../components/formClienteVenta/FormClienteVenta";
import ListProductCarrito from "../../components/listaProductCarrito/ListProductCarrito";
import BtnVenta from "../../components/btnVenta/BtnVenta";

export default function Carrito() {
  const nameTabSearch = "Cliente";
  const {
    actCarrito,
    setActCarrito,
    fechaVenta,
    dataClientSelect,
    setDataClientSelect,
    total
  } = useCarrito();
  const [resultSearch, setResultSearch] = useState([]);
  const [inputSearch, setInputSearch] = useState("");

  const selectClient = (data) => {
    setDataClientSelect(data);
    setResultSearch([]);
  };

  return (
    <div className="container-carrito">
      <button
        className="btn-cerrar-carrito"
        onClick={() => setActCarrito(!actCarrito)}
      >
        <IoCloseSharp color="#ffff" size="1.5rem" />
      </button>
      <div className="container-form-cliente-cc">
        <div className="date">
          <label>Fecha:</label>
          <input value={fechaVenta} disabled />
        </div>
        <div className="buscador-cliente-pre">
          <Buscador
            search={setResultSearch}
            placeholder={"Buscar por nombre de cliente"}
            nameTabSearch={nameTabSearch}
            value={inputSearch}
            onChange={setInputSearch}
            status={true}
          />
          {resultSearch.length > 0 && (
            <ul>
              {resultSearch.map((item, index) => (
                <div
                  className="list-data-search"
                  onClick={() => selectClient(item)}
                  key={index}
                >
                  <li>
                    <label>Nombre: </label>
                    <p>{item.nombre_cliente}</p>
                  </li>
                  <li>
                    <label>Apellido: </label>
                    <p>{item.apellido_cliente}</p>
                  </li>
                </div>
              ))}
            </ul>
          )}
        </div>

        <FormClienteVenta
          dataCliente={dataClientSelect}
          limpiarData={setDataClientSelect}
        />
      </div>
      <div className="lista-product_carrito">
        <ListProductCarrito />
      </div>
      <div className="container-boton-carrito">
        <div className="data-total">
          <h3>Total: </h3>
          <p>${total}</p>
        </div>
      </div>
      <BtnVenta/>
    </div>
  );
}
