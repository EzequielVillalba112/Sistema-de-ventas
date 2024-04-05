import { useEffect, useState } from "react";
import FormModificar from "../../../components/formModificar/FormModificar";
import PropTypes from "prop-types";
import { useCliente } from "../../../context/ClienteContext";

export default function ModificarCliente({ closed }) {
  const nameForm = "Modificar Cliente ";

  const {dataClienteModif} = useCliente();

  const [nombreCliente, setNombreCliente] = useState("");
  const [apellidoCliente, setApellidoCliente] = useState("");
  const [limitCc, setLimitCc] = useState("");
  const [telefono, setTelefono] = useState("");

  const [disabledInput, setDisabledInput] = useState(true);

  useEffect(()=>{
    setNombreCliente(dataClienteModif.nombre_cliente || "")
    setApellidoCliente(dataClienteModif.apellido_cliente || "")
    setLimitCc(dataClienteModif.limite_cc || "")
    setTelefono(dataClienteModif.numero_telefono || "")
  },[dataClienteModif])

  const formItemsClient = [
    {
      class: "input-grup",
      inputs: [
        {
          nameInput: "NombreCliente",
          type: "text",
          placeholder: "Nombre de Cliente",
          onchange: setNombreCliente,
          value: nombreCliente,
          disabled: disabledInput,
        },
        {
          nameInput: "ApellidoCliente",
          type: "text",
          placeholder: "Apellido Cliente",
          onchange: setApellidoCliente,
          value: apellidoCliente,
          disabled: disabledInput,
        },
      ],
    },
    {
      class: "input-grup",
      inputs: [
        {
          nameInput: "LimiteCC",
          type: "number",
          placeholder: "Limite de CC.",
          onchange: setLimitCc,
          value: limitCc,
          disabled: disabledInput,
        },
        {
          nameInput: "NumeroTelefono",
          type: "number",
          placeholder: "Numero de Telefono",
          onchange: setTelefono,
          value: telefono,
          disabled: disabledInput,
        },
      ],
    },
  ];

  console.log(dataClienteModif);

  const modificarCliente = () => {
    console.log("Modificar");
  };

  const eliminarCliente = () => {
    console.log("Eliminar");
  };

  return (
    <FormModificar
      closed={closed}
      nameForm={nameForm}
      formItems={formItemsClient}
      enableInput={setDisabledInput}
      saved={modificarCliente}
      eliminar={eliminarCliente}
    />
  );
}

ModificarCliente.propTypes = {
  closed: PropTypes.func.isRequired,
};
