import { useEffect, useState } from "react";
import ListData from "../../../components/ListData/ListData";
import Buscador from "../../../components/buscadorProductos/Buscador";
import ProductoActDesc from "../../../components/producto/listar-producto/ProductoActDesc";
import { useCliente } from "../../../context/ClienteContext";
import ModificarCliente from "../modificar-cliente/ModificarCliente";

export default function ListarCliente() {
  const nameTabSearch = "Cliente";

  const {
    allClienteAct,
    allClienteDes,
    modificarClienteInterfaz,
    modfiClienteInterfaz,
    setModfiClienteInterfaz,
  } = useCliente();

  const [resultSearch, setResultSearch] = useState([]);
  const [clientActDes, setClientActDes] = useState(true);
  const [clienteList, setClienteList] = useState([]);

  const [inputSearch, setInputSearch] = useState("");

  const submitAct = (data) => {
    setClientActDes(data);
  };

  useEffect(() => {
    if (clientActDes) {
      const listarClienteAct = async () => {
        const res = await allClienteAct();
        setClienteList(res);
      };
      listarClienteAct();
    } else {
      const listarClienteDesact = async () => {
        const res = await allClienteDes();
        setClienteList(res);
      };
      listarClienteDesact();
    }
  }, [clientActDes]);

  return (
    <>
      {modfiClienteInterfaz ? (
        <div className="container-form">
          <ModificarCliente closed={setModfiClienteInterfaz}/>
        </div>
      ) : (
        <>
          <div className="container-form">
            <h1>Lista de Cliente</h1>
            <Buscador
              search={setResultSearch}
              placeholder={"Buscar por nombre de cliente"}
              nameTabSearch={nameTabSearch}
              value={inputSearch}
              onChange={setInputSearch}
              status={clientActDes}
            />
            <ProductoActDesc submit={submitAct} name={nameTabSearch} />
            <ListData
              listItems={clienteList}
              listSearch={resultSearch}
              detail={modificarClienteInterfaz}
            />
          </div>
        </>
      )}
    </>
  );
}
