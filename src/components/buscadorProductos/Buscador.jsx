import "./buscador.css";
import PropTypes from "prop-types";

export default function Buscador({search = "", placeholder, nameTabSearch}) {


  return (
    <div className="buscador-productos">
      <input
        type="text"
        placeholder={placeholder}
      />
      <button>Buscar</button>
    </div>
  );
}

Buscador.propTypes = {
  search: PropTypes.func.isRequired,
  placeholder: PropTypes.string.isRequired,
  nameTabSearch: PropTypes.string.isRequired,
};
