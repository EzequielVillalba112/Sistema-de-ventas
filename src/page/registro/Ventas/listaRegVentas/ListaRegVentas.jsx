import { useRegVentas } from "../../../../context/RegVentasContext";
import "./listaRegVentas.css";

export default function ListaRegVentas({ regVentas, idDetail, setOpenClose }) {

  const windowDetail= (id) => {
    setOpenClose(true);
    idDetail(id);
  }

  return (
    <div className="container-list_regVentas">
      {regVentas.length > 0 ? (
        <ul>
          {regVentas.map((regVenta, i) => (
            <li key={i} className="data-list">
              <div className="data">
                <div className="data-item">
                  <p>ID venta:</p>
                  <p className="data-prin">{regVenta.id_venta}</p>
                </div>
                <div className="data-item">
                  <p>Fecha:</p>
                  <p className="data-prin">{regVenta.fecha_venta}</p>
                </div>
                <div className="data-item">
                  <p>Total:</p>
                  <p className="data-prin">{regVenta.total_venta}</p>
                </div>
              </div>

              <button className="btn-detalles"onClick={() => {windowDetail(regVenta.id_venta);}}>Detalles</button>
            </li>
          ))}
        </ul>
      ) : (
        <h1>No hay registro de Ventas</h1>
      )}
    </div>
  );
}
