import { useEffect, useState } from "react";
import { useRegVentas } from "../../../context/RegVentasContext";
import ListaRegVentas from "./listaRegVentas/ListaRegVentas";
import BusquedaRegVentas from "./busquedaRegVentas/BusquedaRegVentas";

export default function RegVentas() {
  const { allRegVentas } = useRegVentas();
  const [regVentas, setRegVentas] = useState([]);
  const [regVentasSearch, setRegVentasSearch] = useState([]);

  useEffect(() => {
    const allVentas = async () => {
      const res = await allRegVentas();
      setRegVentas(res);
    };
    allVentas();
  }, []);

  return (
    <div className="container-form">
      <h1>Registro de ventas.</h1>
      <BusquedaRegVentas regVentas={regVentas} setRegVentasSearch={setRegVentasSearch}/>
      <ListaRegVentas regVentas={regVentasSearch.length > 0 ? regVentasSearch : regVentas}/>
    </div>
  );
}
