import { useEffect, useState } from "react";
import { notError } from "../../../../components/alert/alert";
import "./busqueda.css";
export default function BusquedaRegVentas({ regVentas, setRegVentasSearch }) {
  const [desde, setDesde] = useState("");
  const [hasta, setHasta] = useState("");

  const filtrarVentas = () => {
    const desdeFecha = new Date(desde);
    const hastaFecha = new Date(hasta);

    if (!desde || !hasta) {
      notError("Ambas fechas deben estar seleccionadas.");
      return;
    }
    if (desdeFecha > hastaFecha) {
      notError("La fecha 'Desde' no puede ser mayor que la fecha 'Hasta'.");
      return;
    }

    const filtradas = regVentas.filter((venta) => {
      const fechaVenta = new Date(venta.fecha_venta);
      return fechaVenta >= desdeFecha && fechaVenta <= hastaFecha;
    });

    if (filtradas.length > 0){
      setRegVentasSearch(filtradas);
    }else{
      notError("No se encontraron ventas en esta fecha");
    }
    
  };

  useEffect(() => {
    setRegVentasSearch([]);
  }, [desde === "", hasta === ""]);

  return (
    <div className="container_search_date">
      <div className="search_date">
        <div className="input_date">
          <label>Desde: </label>
          <input
            type="date"
            value={desde}
            onChange={(e) => setDesde(e.target.value)}
          />
        </div>
        <div className="input_date">
          <label>Hasta: </label>
          <input
            type="date"
            value={hasta}
            onChange={(e) => setHasta(e.target.value)}
          />
        </div>
        <button onClick={filtrarVentas} className="btn-buscar_date">
          Buscar
        </button>
      </div>
    </div>
  );
}
