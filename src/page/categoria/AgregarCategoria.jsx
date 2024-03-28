import { useState } from "react";
import ListaCategoria from "../../components/categoria/listar-categoria/ListaCategoria";
import FormInputs from "../../components/FormInputs/FormINputs";
import { useCategory } from "../../context/CategoryContext";
import { notError, notSuccess } from "../../components/alert/alert";
import { validCategoria } from "../../validation/formCategoria/formaCategory";

export default function AgregarCategoria() {
  const { listaCategory, addCategoria } = useCategory();

  const nameForm = "categoría";

  const [nombreCategoria, setNombreCAtegoria] = useState("");
  const [descripcion, setDescripcion] = useState("");

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
          text: "Guardar",
        },
      ],
    },
  ];

  const guardarCategoria = async () => {
    const validarCategoria = validCategoria(nombreCategoria);

    if (validarCategoria == null) {
      const res = await addCategoria({ nombreCategoria, descripcion });

      if (res == true) {
        notSuccess("Categoria");
      } else {
        notError("Categoria");
      }
    }else{
      notError(validarCategoria);
    }
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
        <ListaCategoria ListaCategoria={listaCategory} />
      </div>
    </>
  );
}
