import { useEffect, useState } from "react";
import { useRegVentas } from "../../../context/RegVentasContext";
import ListaRegVentas from "./listaRegVentas/ListaRegVentas";
import BusquedaRegVentas from "./busquedaRegVentas/BusquedaRegVentas";
import DetalleVenta from "./detalleVenta/DetalleVenta";

export default function RegVentas() {
  const { allRegVentas } = useRegVentas();
  const [regVentas, setRegVentas] = useState([]);
  const [regVentasSearch, setRegVentasSearch] = useState([]);
  const [idDetail, setIdDetail] = useState("");
  const [openClose, setOpenClose] = useState(false);

  useEffect(() => {
    const allVentas = async () => {
      const res = await allRegVentas();
      setRegVentas(res);
    };
    allVentas();
  }, []);

  return (
    <>
      {openClose ? (
        <div className="container-form">
          <DetalleVenta idDetail={idDetail} setOpenClose={setOpenClose} />
        </div>
      ) : (
        <div className="container-form">
          <h1>Registro de ventas.</h1>
          <BusquedaRegVentas
            regVentas={regVentas}
            setRegVentasSearch={setRegVentasSearch}
          />
          <ListaRegVentas
            regVentas={regVentasSearch.length > 0 ? regVentasSearch : regVentas}
            idDetail={setIdDetail}
            setOpenClose={setOpenClose}
          />
        </div>
      )}
    </>
  );
}
