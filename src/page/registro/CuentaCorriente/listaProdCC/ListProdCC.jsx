import PropTypes from "prop-types";
import "./listProdCC.css";
import { useEffect, useState } from "react";
import { useCuentaCC } from "../../../../context/CuentaCorriente";
import { IoCloseSharp } from "react-icons/io5";
import CierreTotalCC from "../../../../components/cierreTotalCc/CierreTotalCC";
export default function ListProdCC({
  idClientSelect,
  openCloseListProd,
  setIdClientSelect,
}) {
  const [listProductClient, setListProductClient] = useState([]);
  const [totalist, setTotalist] = useState(0);
  const [vuelto, setVuelto] = useState(0);
  const [entrega, setEntrega] = useState(0);
  const { listarCuentaCC, saldarCuentaCC } = useCuentaCC();

  useEffect(() => {
    const listProduct = async () => {
      const res = await listarCuentaCC(idClientSelect);
      setListProductClient(res);
    };

    listProduct();
  }, []);

  useEffect(() => {
    let suma = 0;
    for (let key in listProductClient) {
      suma += listProductClient[key].total_producto;
    }
    setTotalist(suma);
  }, [listProductClient]);

  useEffect(() => {
    setVuelto(entrega > totalist ? Math.abs(totalist - entrega) : 0);
  }, [entrega]);

  
  return (
    <>
      <button
        className="btn-cerrar_cc"
        onClick={() => {
          openCloseListProd(false);
          setIdClientSelect("");
        }}
      >
        <IoCloseSharp color="#ffff" size="1.5rem" />
      </button>
      <ul className="container-list_cc">
       {
        listProductClient.length > 0 ? (
          <>
            {listProductClient.map((product, i) => (
            <li key={i} className="list-cc_item">
              <div className="data-list_cc">
                <div className="data-item_cc">
                  <p>Producto: </p>
                  <p className="data-prin_cc">{product.nombre_prod == null ? "Saldo" : product.nombre_prod}</p>
                </div>
                <div className="data-item_cc">
                  <p>Cantidad: </p>
                  <p className="data-prin_cc">{product.cantidad_producto}</p>
                </div>
                <div className="data-item_cc">
                  <p>Total: </p>
                  <p className="data-prin_cc">{product.total_producto}</p>
                </div>
                <div className="data-item_cc">
                  <p>Fecha: </p>
                  <p className="data-prin_cc">{product.fecha_venta}</p>
                </div>
              </div>
            </li>
          ))}
          </>
        ) : (
          <h1 className="no_data_prod">No hay productos</h1>
        )
       }
      </ul>
      <CierreTotalCC
        totalist={totalist}
        setEntrega={setEntrega}
        vuelto={vuelto}
      />

      <div className="container_saldar">
        <button
          className="btn btn-editar"
          onClick={() => {
            saldarCuentaCC({entrega, totalist, vuelto, idClientSelect});
          }}
        >
          Saldar
        </button>
      </div>
    </>
  );
}

ListProdCC.propTypes = {
  idClientSelect: PropTypes.number.isRequired,
  openCloseListProd: PropTypes.func.isRequired,
  setIdClientSelect: PropTypes.func.isRequired,
};
