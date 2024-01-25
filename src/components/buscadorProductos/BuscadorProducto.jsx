import "./buscador.css";

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
