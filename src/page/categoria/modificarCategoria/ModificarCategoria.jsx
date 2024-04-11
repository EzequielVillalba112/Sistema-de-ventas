import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { useCategory } from "../../../context/CategoryContext";
import { validCategoria } from "../../../validation/formCategoria/formaCategory.js";
import { notError, notSuccess } from "../../../components/alert/alert.jsx";
import Swal from "sweetalert2";
import FormModificar from "../../../components/formModificar/FormModificar.jsx";
export default function ModificarCategoria({ closed }) {
  const nameForm = "Modificar categoría ";

  const {
    dataCategoryModific,
    updateCategoria,
    idCategoryModifi,
    deleteCategoria,
    validCategoryExisting
  } = useCategory();

  const [disabledInput, setDisabledInput] = useState(true);
  const [nombreCategoria, setNombreCAtegoria] = useState("");
  const [descripcion, setDescripcion] = useState("");

  useEffect(() => {
    setNombreCAtegoria(dataCategoryModific.nombre || "");
    setDescripcion(dataCategoryModific.descripcion || "");
  }, [dataCategoryModific]);

  const formItemsCategoria = [
    {
      class: "input-grup",
      inputs: [
        {
          nameInput: "NombreCategoria",
          type: "text",
          placeholder: "Nombre de categoría",
          value: nombreCategoria,
          onchange: setNombreCAtegoria,
          disabled: disabledInput,
        },
        {
          nameInput: "DescripcionCategoria",
          type: "text",
          placeholder: "Descripción",
          onchange: setDescripcion,
          value: descripcion,
          disabled: disabledInput,
        },
      ],
    },
  ];

  const modifiCategoria = async () => {
    const validForm = validCategoria(nombreCategoria);

    if (validForm == null) {
      const resValid = await validCategoryExisting({nombreCategoria});
      
      if(resValid.status == 200) {
        try {
          const res = await updateCategoria({
            nombreCategoria: nombreCategoria,
            descripcion: descripcion,
            idCategory: idCategoryModifi,
          });
          if (res) {
            notSuccess("Categoría modificada");
            closed(false);
          }
        } catch (error) {
          console.error("Error al modifica categoria: ", error);
        }
      }else {
        notError(resValid.error);
      }
      
    } else {
      notError(validForm);
    }
  };

  const deletCategoria = () => {
    try {
      Swal.fire({
        title: "Desea eliminar esta categoría ",
        showDenyButton: true,
        showCancelButton: true,
        confirmButtonText: "Si",
        denyButtonText: `no`,
        confirmButtonColor: "#29C716",
      }).then(async (result) => {
        if (result.isConfirmed) {
          const resultado = await deleteCategoria(idCategoryModifi);
         
          if (resultado === "Categoria eliminado") {
            Swal.fire({
              title: "Categoría Eliminado Correctamente",
              icon: "success",
              confirmButtonColor: "#29C716",
            }).then((result) => {
              if (result.isConfirmed) {
                window.location.reload();
              }
            });

            closed(false);
          }
        } else if (result.isDenied) {
          Swal.fire({
            title: "No se elimino ninguna categoría",
            icon: "info",
            confirmButtonColor: "#29C716",
          });
        }
      });
    } catch (error) {
      console.error("Error al ejecutar la promesa:", error);
    }
  };

  return (
    <FormModificar
      closed={closed}
      nameForm={nameForm}
      formItems={formItemsCategoria}
      enableInput={setDisabledInput}
      saved={modifiCategoria}
      eliminar={deletCategoria}
    />
  );
}

ModificarCategoria.propTypes = {
  closed: PropTypes.func.isRequired,
};
