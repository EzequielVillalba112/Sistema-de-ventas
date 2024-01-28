import { useState } from "react";

import "./listaproductos.css";
import SinImg from "../../../img/camera.png";
import ProductoActDesc from "../../../components/producto/listar-producto/ProductoActDesc";
import BuscadorProducto from "../../../components/buscadorProductos/BuscadorProducto";

export default function ListaProductos() {
  const [resultSearch, setResultSearch] = useState("");
  const [prductList, setProductList] = useState([
    { img: "", nombre: "Desodorante Rexona", precio: 2500, cantidad: 25 },
    { img: "", nombre: "Desodorante Rexona", precio: 2500, cantidad: 25 },
    { img: "", nombre: "Desodorante Rexona", precio: 2500, cantidad: 25 },
    { img: "", nombre: "Desodorante Rexona", precio: 2500, cantidad: 25 },
    { img: "", nombre: "Desodorante Rexona", precio: 2500, cantidad: 25 },
    { img: "", nombre: "Desodorante Rexona", precio: 2500, cantidad: 25 },
    { img: "", nombre: "Desodorante Rexona", precio: 2500, cantidad: 25 },
    { img: "", nombre: "Desodorante Rexona", precio: 2500, cantidad: 25 },
    { img: "", nombre: "Desodorante Rexona", precio: 2500, cantidad: 25 },
    { img: "", nombre: "Desodorante Rexona", precio: 2500, cantidad: 25 },
    { img: "", nombre: "Desodorante Rexona", precio: 2500, cantidad: 25 },
    { img: "", nombre: "Desodorante Rexona", precio: 2500, cantidad: 25 },
    { img: "", nombre: "Desodorante Rexona", precio: 2500, cantidad: 25 },
    { img: "", nombre: "Desodorante Rexona", precio: 2500, cantidad: 25 },
  ]);

  return (
    <div className="container-lista-productos">
      <h1>Lista de Productos</h1>
      <BuscadorProducto search={setResultSearch}/>
      <ProductoActDesc />
      <div className="lista-productos">
        <ul>
          {prductList.map((product, i) => (
            <li key={i}>
              <div className="data-list">
                {product.img == "" ? (
                  <img src={SinImg} />
                ) : (
                  <img src={product.img} />
                )}
                <div className="data">
                  <div className="data-item">
                    <p>Nombre: </p>
                    <p className="data-prin">{product.nombre}</p>
                  </div>
                  <div className="data-item">
                    <p>Precio: </p>
                    <p className="data-prin">{product.precio}</p>
                  </div>
                  <div className="data-item">
                    <p>Cantidad: </p>
                    <p className="data-prin">{product.cantidad}</p>
                  </div>
                </div>
                <button className="btn-detalles">Detalles</button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
