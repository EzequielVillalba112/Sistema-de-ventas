import { useState } from "react";
import ListaCategoria from "../../components/categoria/listar-categoria/ListaCategoria";
import FormInputs from "../../components/FormInputs/FormINputs";
import { useCategory } from "../../context/CategoryContext";
import { notError, notSuccess } from "../../components/alert/alert";
import { validCategoria } from "../../validation/formCategoria/formaCategory";
import ModificarCategoria from "./modificarCategoria/ModificarCategoria";

export default function AgregarCategoria() {
  const {
    listaCategory,
    addCategoria,
    modifiCategoryInterfaz,
    setModifiCategoryInterfaz,
    //func para poder cambiar la vista a modifi categoria
    modifiCategoryInterface,
    validCategoryExisting
  } = useCategory();

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
      const resValidExisting = await validCategoryExisting({nombreCategoria});
      if(resValidExisting.status == 200){
        const res = await addCategoria({ nombreCategoria, descripcion });

        if (res == true) {
          notSuccess("Categoria");
        } else {
          notError("Categoria");
        }
      }else {
        notError(resValidExisting.error);
      }
     
    } else {
      notError(validarCategoria);
    }
  };

  return (
    <>
      {modifiCategoryInterfaz ? (
        <div className="container-form">
          <ModificarCategoria closed={setModifiCategoryInterfaz} />
        </div>
      ) : (
        <>
          <div className="container-form">
            <FormInputs
              nameForm={nameForm}
              formItems={formItemsCategoria}
              saved={guardarCategoria}
            />
          </div>
          <div className="container-form">
            <ListaCategoria
              ListaCategoria={listaCategory}
              detail={modifiCategoryInterface}
            />
          </div>
        </>
      )}
    </>
  );
}
