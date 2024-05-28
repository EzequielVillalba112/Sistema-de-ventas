import "./listaRegVentas.css";

export default function ListaRegVentas({ regVentas }) {
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

              <button className="btn-detalles"onClick={() => {console.log(regVenta.id_venta);}}>Detalles</button>
            </li>
          ))}
        </ul>
      ) : (
        <h1>Noy registro de Ventas</h1>
      )}
    </div>
  );
}
