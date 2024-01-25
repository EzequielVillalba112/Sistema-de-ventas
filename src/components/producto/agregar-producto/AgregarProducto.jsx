import "./agregarProducto.css";
import AddImg from "../../../img/camera.png";
import { useRef } from "react";
import { useState } from "react";

export default function AgregarProducto() {
  const inputRef = useRef(null);
  const [img, setImg] = useState("");
  const [categoria, setCategoria] = useState(["Lacteos", "Alcohol", "Higiene","Prueba"]);

  const clickImg = () => {
    inputRef.current.click();
  };

  const cambiarImgClick = (e) => {
    const file = e.target.files[0];
    setImg(file);
  };

  return (
    <>
      <h1>Agregar Producto</h1>

      <form className="form-agregar-product">
        <div className="colums">
          <div className="columna-form">
            <input type="text" name="" placeholder="Nombre de producto" />
            <input type="number" name="" id="" placeholder="Precios" />
            <input type="number" name="" id="" placeholder="Cod. Barra" />
          </div>

          <div className="columna-form">
            <select name="" id="">
              <option value="">Categoria</option>
              {
                categoria.map((categoria, i)=>(
                  <option key={i}>{categoria}</option>
                ))
              }
            </select>
            <input type="number" name="" id="" placeholder="Stock" />
            <input type="text" name="" id="" placeholder="Descripcion" />
          </div>
        </div>
        <div className="img-producto" onClick={clickImg}>
          {img ? <img src={URL.createObjectURL(img)} /> : <img src={AddImg} />}
          <input
            type="file"
            ref={inputRef}
            onChange={cambiarImgClick}
            style={{ display: "none" }}
          />
        </div>

        <button className="btn-guardar" type="submit">
          Guardar
        </button>
      </form>
    </>
  );
}
