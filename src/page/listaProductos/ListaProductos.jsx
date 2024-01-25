import { useState } from "react";
import BuscadorProducto from "../../components/buscadorProductos/BuscadorProducto";
import "./listaproductos.css";
import ProductoActDesc from "../../components/producto/listar-producto/ProductoActDesc";
import SinImg from "../../img/camera.png";

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
      <BuscadorProducto search={setResultSearch} />
      <ProductoActDesc />
      <div className="lista-productos">
        <ul>
          {prductList.map((product, i) => (
            <li key={i}>
              <div className="data-product">
                {product.img == "" ? (
                  <img src={SinImg} />
                ) : (
                  <img src={product.img} />
                )}
                <div className="data">
                  <div className="data-item">
                    <p>Nombre: </p>
                    <p>{product.nombre}</p>
                  </div>
                  <div className="data-item">
                    <p>Precio: </p>
                    <p>{product.precio}</p>
                  </div>
                  <div className="data-item">
                    <p>Cantidad: </p>
                    <p>{product.cantidad}</p>
                  </div>
                </div>
                <button>Detalles</button>
              </div>
            </li>
          ))}

         
        </ul>
      </div>
    </div>
  );
}
