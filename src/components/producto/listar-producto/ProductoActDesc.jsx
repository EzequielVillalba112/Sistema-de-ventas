import { useState } from "react";
import "./productoActDesc.css";

export default function ProductoActDesc() {
  const [productActiv, setProductActiv] = useState(false);
  const [productDesc, setProductDesc] = useState(false);

  const handleProductActivChange = () => {
    setProductActiv(!productActiv);
    if (productDesc == true) {
      setProductDesc(false);
    }
  };

  const handleProductDescChange = () => {
    setProductDesc(!productDesc);
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
            checked={productDesc}
            onChange={handleProductDescChange}
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
