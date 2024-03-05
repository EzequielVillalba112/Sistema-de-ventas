import "./formInputs.css";
import PropTypes from "prop-types";
export default function FormInputs({ nameForm, formItems, saved = "" }) {
  const handleSubmit = (e) => {
    e.preventDefault();
    saved();
  };

  return (
    <div className="container-form-inputs">
      <h1>Agregar {nameForm}</h1>

      <form onSubmit={handleSubmit} className="form-inputs">
        {formItems.map((inputForm, formIndex) => (
          /*Divido los inputs en grupos para poder ordenar el formulario de
            una forma mas sencilla con css
            */
          <div key={formIndex} className={inputForm.class}>
            {/*Map el array de inputs resivido, y verifico si tiene un select
            para poder mapear todas las posibles selecciones, en el caso de que no
            encuentre un select carga un input de forma normal
            */}
            {inputForm.inputs.map((input, indexInput) => (
              <div
                key={`${input.nameInput}-${input.type}-${indexInput}`}
                className={input.type == "file" ? "file-select" : ""}
              >
                {input.type == "select" ? (
                  <select
                    onChange={(e) => {
                      input.onchange(e.target.value);
                    }}
                    value={input.value}
                  >
                    {input.option.map((opt, i) => (
                      <option key={i} value={opt}>
                        {opt}
                      </option>
                    ))}
                  </select>
                ) : input.type == "file" ? (
                  <input
                    name={input.nameInput}
                    type={input.type}
                    placeholder={input.placeholder}
                    onChange={(e) => {
                      input.onchange(e.target.files[0]);
                    }}
                    value={input.value}
                  />
                ) : (
                  <input
                    name={input.nameInput}
                    type={input.type}
                    placeholder={input.placeholder}
                    onChange={(e) => {
                      input.onchange(e.target.value);
                    }}
                    value={input.value}
                  />
                )}
              </div>
            ))}
          </div>
        ))}
        <button className="btn btn-guardar" type="submit">
          Guardar
        </button>
      </form>
    </div>
  );
}

// Definición de PropTypes
FormInputs.propTypes = {
  formItems: PropTypes.array.isRequired,
  nameForm: PropTypes.string.isRequired,
  saved: PropTypes.func.isRequired,
};
