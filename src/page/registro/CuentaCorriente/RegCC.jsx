import { useEffect, useState } from "react";
import Buscador from "../../../components/buscadorProductos/Buscador";
import ListData from "../../../components/ListData/ListData";
import { useCliente } from "../../../context/ClienteContext";
import ListProdCC from "./listaProdCC/ListProdCC";

export default function RegCC() {
  const nameTabSearch = "Cliente";
  const [resultSearch, setResultSearch] = useState([]);
  const [inputSearch, setInputSearch] = useState("");

  const [clienteList, setClienteList] = useState([]);
  const [idClientSelect, setIdClientSelect] = useState("");

  const [openCloseListProd, setOpenCloseListProd] = useState(false);

  const { allClienteAct } = useCliente();

  useEffect(() => {
    const listarClienteAct = async () => {
      const res = await allClienteAct();
      setClienteList(res);
    };
    listarClienteAct();
  }, []);

  useEffect(() => {
    if (idClientSelect > 0) {
      setOpenCloseListProd(!openCloseListProd);
    }
  }, [idClientSelect > 0]);

  return (
    <>
      {openCloseListProd ? (
        <div className="container-form">
          <ListProdCC
            idClientSelect={idClientSelect}
            openCloseListProd={setOpenCloseListProd}
            setIdClientSelect={setIdClientSelect}
          />
        </div>
      ) : (
        <div className="container-form">
          <h1>Registro de cuenta corriente.</h1>
          <Buscador
            search={setResultSearch}
            placeholder={"Buscar por nombre de cliente"}
            nameTabSearch={nameTabSearch}
            value={inputSearch}
            onChange={setInputSearch}
            status={true}
          />
          <ListData
            listItems={clienteList}
            listSearch={resultSearch}
            detail={setIdClientSelect}
          />
        </div>
      )}
    </>
  );
}
