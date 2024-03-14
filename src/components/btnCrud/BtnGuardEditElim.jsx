import PropTypes from "prop-types";
import { useState } from "react";
import { notCancel, notEliminar, notError, notSuccess } from "../alert/alert";

export default function BtnGuardEditElim({ enableInput, closed }) {
  const [guardar, setGuardar] = useState(false);
  const [editar, setEditar] = useState(true);

  const btnEditar = () => {
    enableInput(!enableInput);
    setGuardar(!guardar);
    setEditar(!editar)
  };

  const btnCancelar = () =>{
    notCancel(closed);
  }

  const btnEliminar = () =>{
    const message = "Producto"
    notEliminar(message)
  }

  const save = () =>{
    //const message = "Producto modificado"
    //notSuccess(message)
    //notError()
  }
  return (
    <div className="continer-buttons-modific">
      {guardar == true && <button className="btn btn-guardar" onClick={save}>Guardar</button>}
      {editar == true ? (
        <button className="btn btn-editar" onClick={btnEditar}>
          Editar
        </button>
      ) : (
        <button className="btn btn-cancelar" onClick={btnCancelar}>
          Cancelar
        </button>
      )}

      <button className="btn btn-eliminar" onClick={btnEliminar}>Elimnar</button>
    </div>
  );
}
BtnGuardEditElim.propTypes = {
  enableInput: PropTypes.func,
  closed: PropTypes.func
};
