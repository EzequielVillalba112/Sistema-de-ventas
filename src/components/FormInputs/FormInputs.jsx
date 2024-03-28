import "./formInputs.css";
import PropTypes from "prop-types";
export default function FormInputs({ nameForm, formItems, saved = "" }) {
  const handleSubmit = (e) => {
    e.preventDefault();
    if (saved != "") {
      saved();
    }
  };

  const handleBarcodeInput = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
    }
  };

  return (
    <div className="container-form-inputs">
      <h1>{nameForm}</h1>

      <form onSubmit={handleSubmit} className="form-inputs">
        {formItems.map((inputForm, formIndex) => (
          /*Divido los inputs en grupos para poder ordenar el formulario de
            una forma mas sencilla con css
            */
          <div key={`inputs-form-${formIndex}`} className={inputForm.class}>
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
                  <>
                    <h3 className="description-input">Selecione una opcion</h3>
                    <select
                      onChange={(e) => {
                        input.onchange(e.target.value);
                      }}
                      value={input.value}
                      disabled={input.disabled}
                    >
                      {input.option.map((opt, i) => (
                        <option key={i} value={opt}>
                          {opt.nombre}
                        </option>
                      ))}
                    </select>
                  </>
                ) : input.type == "file" ? (
                  <>
                    <h3 className="description-input">Seleccione una imagen</h3>
                    <input
                      name={input.nameInput}
                      type={input.type}
                      placeholder={input.placeholder}
                      onChange={(e) => {
                        input.onchange(e.target.files[0]);
                      }}
                      disabled={input.disabled}
                      accept=".png,image/*"
                    />
                  </>
                  //Este sector los uso para evitar que se precion la opcion de submit
                  //cuando se utiliza el escaner de cod_barra
                ) : input.onKeyDown === true ? (
                  <>
                    <h3 className="description-input">{input.placeholder}</h3>
                    <input
                      name={input.nameInput}
                      type={input.type}
                      placeholder={input.placeholder}
                      onChange={(e) => {
                        input.onchange(e.target.value);
                      }}
                      value={input.value}
                      onKeyDown={handleBarcodeInput}
                      disabled={input.disabled}
                    />
                  </>
                ) : (
                  input.type != "submit" && (
                    <>
                      <h3 className="description-input">{input.placeholder}</h3>
                      <input
                        name={input.nameInput}
                        type={input.type}
                        placeholder={input.placeholder}
                        onChange={(e) => {
                          input.onchange(e.target.value);
                        }}
                        value={input.value}
                        disabled={input.disabled}
                      />
                    </>
                  )
                )}
              </div>
            ))}
            <div
              key={`buton-${formIndex}-${formIndex}`}
              className={inputForm.class}
            >
              {inputForm.inputs.map(
                (btn, i) =>
                  btn.type == "submit" && (
                    <button className={btn.className} key={"btn-" + i}>
                      {btn.text}
                    </button>
                  )
              )}
            </div>
          </div>
        ))}
      </form>
    </div>
  );
}

// Definición de PropTypes
FormInputs.propTypes = {
  formItems: PropTypes.array.isRequired,
  nameForm: PropTypes.string.isRequired,
  saved: PropTypes.func,
};
