import Loader from "../../loader/Loader";
import "./listaCategoria.css";
import PropTypes from "prop-types";

export default function ListaCategoria({ ListaCategoria, detail }) {
  return (
    <div className="container-list-categoria">
      <h1>Lista de categorías</h1>

      {ListaCategoria != "" ? (
        <ul>
          {ListaCategoria.map((categoria, i) => (
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

              <button
                className="btn-detalles"
                onClick={() => {
                  detail(categoria.id_categoria);
                }}
              >
                Detalles
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <Loader />
      )}
    </div>
  );
}

ListaCategoria.propTypes = {
  ListaCategoria: PropTypes.array.isRequired,
  detail: PropTypes.func.isRequired,
};
