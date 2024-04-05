import { useState } from "react";
import FormInputs from "../../../components/FormInputs/FormINputs";
import { validCliente } from "../../../validation/formCliente/formClienteVal";
import { useCliente } from "../../../context/ClienteContext";
import { notError, notSuccess } from "../../../components/alert/alert";

export default function AgregarCliente() {
  const nameForm = "Agregar Cliente";
  
  const {addCliente} = useCliente(); 

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
    {
      class: "button-grup",
      inputs: [
        {
          className: "btn btn-guardar",
          type: "submit",
          text: "Guardar"
        }
      ]
    }
  ];

  const guardarCliente = async () => {
    const validacionCliente = validCliente(nombreCliente, apellidoCliente, limitCc);

    if(validacionCliente == null){
      const res = await addCliente({nombreCliente, apellidoCliente, limitCc, telefono});

      if (res == true) {
        notSuccess("Cliente");
      } else {
        notError("Cliente");
      }
    }
  };

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
