import "./buscador.css";
import PropTypes from "prop-types";

export default function BuscadorProducto({search = ""}) {


  return (
    <div className="buscador-productos">
      <input
        type="text"
        placeholder="Buscar por nombre de producto o cod. barra"
      />
      <button>Buscar</button>
    </div>
  );
}

BuscadorProducto.propTypes = {
  search: PropTypes.string.isRequired,
};
