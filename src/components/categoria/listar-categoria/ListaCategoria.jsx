import "./listaCategoria.css";
import { useState } from "react";

export default function ListaCategoria() {
  const [categoriaList, setCategoriaList] = useState([
    { nombre: "Prueba categoria", descripcion: "Prueba descripcion" },
    { nombre: "Prueba categoria", descripcion: "Prueba descripcion" },
    { nombre: "Prueba categoria", descripcion: "Prueba descripcion" },
    { nombre: "Prueba categoria", descripcion: "Prueba descripcion" },
    { nombre: "Prueba categoria", descripcion: "Prueba descripcion" },
  ]);

  return (
    <div className="container-list-categoria">
      <h1>Lista de categorías</h1>
      <ul>
        {categoriaList.map((categoria, i) => (
          <li key={i} className="data-list">
            <div className="data">
              <div className="data-item">
                <p>Nombre:</p>
                <p className="data-prin">{categoria.nombre}</p>
              </div>
              <div className="data-item">
                <p>Descripcion:</p>
                <p className="data-prin">{categoria.descripcion}</p>
              </div>
            </div>

            <button className="btn-detalles">Detalles</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
