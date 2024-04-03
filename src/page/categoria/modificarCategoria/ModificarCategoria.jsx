import PropTypes from "prop-types";
import { IoCloseSharp } from "react-icons/io5";
import FormInputs from "../../../components/FormInputs/FormINputs";
import BtnGuardEditElim from "../../../components/btnCrud/BtnGuardEditElim";
import { useEffect, useState } from "react";
import { useCategory } from "../../../context/CategoryContext";
export default function ModificarCategoria({ closed }) {
  const nameForm = "Modificar Categoria";

  const { dataCategoryModific } = useCategory();

  useEffect(() => {
    setNombreCAtegoria(dataCategoryModific.nombre || "");
    setDescripcion(dataCategoryModific.descripcion || "");
  }, [dataCategoryModific]);

  const [disabledInput, setDisabledInput] = useState(true);
  const [nombreCAtegoria, setNombreCAtegoria] = useState("");
  const [descripcion, setDescripcion] = useState("");

  const formItemsCategoria = [
    {
      class: "input-grup",
      inputs: [
        {
          nameInput: "NombreCategoria",
          type: "text",
          placeholder: "Nombre de categoría",
          value: nombreCAtegoria,
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

  const updateCategoria = () => {
    console.log("update");
  };

  const deleteCategoria = () => {
    console.log("Delete");
  };

  return (
    <div className="container-modificar">
      <button
        className="btn-cerrar-modifi"
        onClick={() => {
          closed(false);
        }}
      >
        <IoCloseSharp color="#ffff" size="1.5rem" />
      </button>
      <div className="modific">
        <FormInputs nameForm={nameForm} formItems={formItemsCategoria} />
        <BtnGuardEditElim
          enableInput={setDisabledInput}
          closed={closed}
          saved={updateCategoria}
          eliminar={deleteCategoria}
        />
      </div>
    </div>
  );
}

ModificarCategoria.propTypes = {
  closed: PropTypes.func.isRequired,
};
