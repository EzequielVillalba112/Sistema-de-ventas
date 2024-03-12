import { useState } from "react";
import ListaCategoria from "../../components/categoria/listar-categoria/ListaCategoria";
import FormInputs from "../../components/FormInputs/FormINputs";

export default function AgregarCategoria() {
  const nameForm = "categoría";

  const [nombreCategoria, setNombreCAtegoria] = useState();
  const [descripcion, setDescripcion] = useState();

  const formItemsCategoria = [
    {
      class: "input-grup",
      inputs: [
        {
          nameInput: "NombreCategoria",
          type: "text",
          placeholder: "Nombre de categoría",
          onchange: setNombreCAtegoria,
        },
        {
          nameInput: "DescripcionCategoria",
          type: "text",
          placeholder: "Descripción",
          onchange: setDescripcion,
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

  const guardarCategoria = () => {
    console.log(nombreCategoria);
    console.log(descripcion);
  };

  return (
    <>
      <div className="container-form">
        <FormInputs
          nameForm={nameForm}
          formItems={formItemsCategoria}
          saved={guardarCategoria}
        />
      </div>

      <div className="container-form">
        <ListaCategoria />
      </div>
    </>
  );
}
