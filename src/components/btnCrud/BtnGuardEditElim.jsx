import PropTypes from "prop-types";
import { useState } from "react";
import { notCancel } from "../alert/alert";

export default function BtnGuardEditElim({
  enableInput,
  closed,
  saved,
  eliminar,
  estado
}) {
  const [guardar, setGuardar] = useState(false);
  const [editar, setEditar] = useState(true);

  const btnEditar = () => {
    enableInput(!enableInput);
    setGuardar(!guardar);
    setEditar(!editar);
  };

  const btnCancelar = () => {
    notCancel(closed);
  };

  const btnEliminar = () => {
    eliminar();
  };

  const save = () => {
    saved();
  };
  return (
    <div className="continer-buttons-modific">
      {guardar == true && (
        <button className="btn btn-guardar" onClick={save}>
          Guardar
        </button>
      )}
      {editar == true ? (
        <button className="btn btn-editar" onClick={btnEditar}>
          Editar
        </button>
      ) : (
        <button className="btn btn-cancelar" onClick={btnCancelar}>
          Cancelar
        </button>
      )}

      {(estado != 1 && estado != undefined) && (
        <button className="btn btn-eliminar" onClick={btnEliminar}>
          Eliminar
        </button>
      )}
     
    </div>
  );
}
BtnGuardEditElim.propTypes = {
  enableInput: PropTypes.func,
  closed: PropTypes.func,
  saved: PropTypes.func,
  eliminar: PropTypes.func,
  estado: PropTypes.number
};
