import { useState } from "react";
import PropTypes from "prop-types";
import "./productoActDesc.css";

export default function ProductoActDesc({ submit, name }) {
  //Productos Activos
  const [productActiv, setProductActiv] = useState(true);
  //Productos Desactivos
  const [c, setc] = useState(false);

  const handleProductActivChange = () => {
    setProductActiv(!productActiv);
    if (c == true) {
      setc(false);
    }
  };

  const handlecChange = () => {
    setc(!c);
    if (productActiv == true) {
      setProductActiv(false);
    }
  };

  return (
    <div className="container-list-act-desc-pro">
      <div className="container-checkbox-prod">
        <label>
          <input
            type="checkbox"
            checked={productActiv}
            onChange={handleProductActivChange}
          />
          {name} Activos
        </label>

        <br />

        <label>
          <input type="checkbox" checked={c} onChange={handlecChange} />
          {name} Inactivos
        </label>
      </div>
      <button onClick={() => submit(productActiv)}>Listar</button>
    </div>
  );
}

ProductoActDesc.propTypes = {
  submit: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
};
