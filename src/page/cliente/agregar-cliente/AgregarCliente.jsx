import { useState } from "react";
import FormInputs from "../../../components/FormInputs/FormINputs";

export default function AgregarCliente() {
  const nameForm = "Cliente";
  
  const [nombreCliente, setNombreCliente] = useState();
  const [apellidoCliente, setApellidoCliente] = useState();
  const [limitCc, setLimitCc] = useState();
  const [telefono, setTelefono] = useState();

  const formItemsClient = [
    {
      class: "input-grup",
      inputs: [
        {
          nameInput: "NombreCliente",
          type: "text",
          placeholder: "Nombre de Cliente",
          onchange: setNombreCliente,
        },
        {
          nameInput: "ApellidoCliente",
          type: "text",
          placeholder: "Apellido Cliente",
          onchange: setApellidoCliente,
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
        },
        {
          nameInput: "NumeroTelefono",
          type: "number",
          placeholder: "Numero de Telefono",
          onchange: setTelefono,
        },
      ],
    },
  ];

  const guardarCliente = () => {};

  return (
    <div className="container-form">
      <FormInputs
        nameForm={nameForm}
        formItems={formItemsClient}
        saved={guardarCliente}
      />
    </div>
  );
}
