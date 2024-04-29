import "./formClienteVenta.css";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { MdDeleteForever } from "react-icons/md";

export default function FormClienteVenta({ dataCliente, limpiarData }) {
  const [nombreCliente, setNombreCliente] = useState("");
  const [apellidoCliente, setApellidoCliente] = useState("");
  const [limitCc, setLimitCc] = useState("");

  useEffect(() => {
    setNombreCliente(dataCliente.nombre_cliente || "");
    setApellidoCliente(dataCliente.apellido_cliente || "");
    setLimitCc(dataCliente.limite_cc || "");
  }, [dataCliente]);

  return (
    <div className="container-form-cliente_cc">
      <div className="input-data">
        <label>Nombre:</label>
        <input type="text" value={nombreCliente} disabled />
      </div>
      <div className="input-data">
        <label>Apellido:</label>
        <input type="text" value={apellidoCliente} disabled />
      </div>
      <div className="input-data">
        <label>Limite CC:</label>
        <input type="text" value={limitCc} disabled />
      </div>

      <button className="btn-eliminar-cliente_data" onClick={()=>{limpiarData([])}}>
        <MdDeleteForever color="#ffff" size="1.5rem"/>
      </button>
    </div>
  );
}

FormClienteVenta.propType = {
  dataCliente: PropTypes.array.isRequired,
  limpiarData: PropTypes.func.isRequired,
};
