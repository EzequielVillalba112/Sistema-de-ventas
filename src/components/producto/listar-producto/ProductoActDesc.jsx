import { useState } from "react";
import "./productoActDesc.css";

export default function ProductoActDesc() {
  const [productActiv, setProductActiv] = useState(false);
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
          Productos Activos
        </label>

        <br />

        <label>
          <input
            type="checkbox"
            checked={c}
            onChange={handlecChange}
          />
          Productos Inactivos
        </label>
      </div>
      <button>
        Listar
      </button>
    </div>
  );
}
