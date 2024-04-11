import './formModificar.css'
import { IoCloseSharp } from "react-icons/io5";
import FormInputs from "../FormInputs/FormINputs";
import BtnGuardEditElim from "../btnCrud/BtnGuardEditElim";
import PropTypes from "prop-types";

export default function FormModificar({
  closed,
  nameForm,
  formItems,
  enableInput,
  saved,
  eliminar,
  estado
}) {
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
        <FormInputs nameForm={nameForm} formItems={formItems} />
        <BtnGuardEditElim
          enableInput={enableInput}
          closed={closed}
          saved={saved}
          eliminar={eliminar}
          estado={estado}
        />
      </div>
    </div>
  );
}

FormModificar.propTypes = {
  closed: PropTypes.func.isRequired,
  nameForm: PropTypes.string.isRequired,
  formItems: PropTypes.array.isRequired,
  enableInput: PropTypes.func.isRequired,
  saved: PropTypes.func.isRequired,
  eliminar: PropTypes.func.isRequired,
  estado: PropTypes.number
};
