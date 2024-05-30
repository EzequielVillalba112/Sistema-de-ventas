import { useEffect, useState } from "react";
import { useRegVentas } from "../../../../context/RegVentasContext";
import { IoCloseSharp } from "react-icons/io5";

export default function DetalleVenta({ idDetail, setOpenClose }) {
  const { detailSaleAll } = useRegVentas();

  const [listDetailSale, setListDetailSale] = useState([]);
  const [totalDetail, setTotalDetail] = useState(0);

  useEffect(() => {
    const detailSl = async () => {
      const res = await detailSaleAll(idDetail);
      setListDetailSale(res);
    };
    detailSl();
  }, []);

  const totalSale = () => {
    let total = 0;
    listDetailSale.forEach((detail) => {
      total += detail.total_producto;
    });
    return total;
  };

  useEffect(() => {
    setTotalDetail(totalSale());
  }, [listDetailSale.length > 0]);

  return (
    <>
      <div className="container-list_cc reg_venta">
        <button
          className="btn-cerrar_cc"
          onClick={() => {
            setOpenClose(false);
          }}
        >
          <IoCloseSharp color="#ffff" size="1.5rem" />
        </button>
        <h1>Detalle de venta.</h1>

        {listDetailSale.length > 0 ? (
          <ul>
            {listDetailSale.map((detail, i) => (
              <li key={i} className="list-cc_item">
                <div className="data-list_cc">
                  <div className="data-item_cc">
                    <p>Producto:</p>
                    <p className="data-prin_cc">{detail.nombre_prod}</p>
                  </div>
                  <div className="data-item_cc">
                    <p>Cantidad:</p>
                    <p className="data-prin_cc">{detail.cantidad_producto}</p>
                  </div>
                  <div className="data-item_cc">
                    <p>Total:</p>
                    <p className="data-prin_cc">{detail.total_producto}</p>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <h1>No hay registro de Ventas</h1>
        )}
      </div>
      <div className="container-cierre-total_cc detail_sale">
        <div className="container_cierre">
          <p className="cierre_p">Total: </p>
          <p className="total-prin_cc">$ {totalDetail}</p>
        </div>
      </div>
    </>
  );
}
