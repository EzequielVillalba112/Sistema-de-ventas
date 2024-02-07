import { useState } from "react";
import ListData from "../../../components/ListData/ListData";
import Buscador from "../../../components/buscadorProductos/Buscador";
import ProductoActDesc from "../../../components/producto/listar-producto/ProductoActDesc";

export default function ListarCliente() {
  const nameTabSearch = "Cliente";

  const [resultSearch, setResultSearch] = useState("");
  const [clientActDes, setClientActDes] = useState();
  const [clienteList, setClienteList] = useState([
    {
      id: 1,
      nombre: "Prueba Nombre Clien",
      apellido: "Prueba apellido",
      limiteCC: 2000,
      telefono: "00025565666",
    },
    {
      id: 2,
      nombre: "Prueba Nombre Clien",
      apellido: "Prueba apellido",
      limiteCC: 2000,
      telefono: "00025565666",
    },
    {
      id: 3,
      nombre: "Prueba Nombre Clien",
      apellido: "Prueba apellido",
      limiteCC: 2000,
      telefono: "00025565666",
    },
    {
      id: 4,
      nombre: "Prueba Nombre Clien",
      apellido: "Prueba apellido",
      limiteCC: 2000,
      telefono: "00025565666",
    },
    {
      id: 5,
      nombre: "Prueba Nombre Clien",
      apellido: "Prueba apellido",
      limiteCC: 2000,
      telefono: "00025565666",
    },
  ]);

  const submitAct = (data) =>{
    console.log(data);
    setClientActDes(data)
  }

  return (
    <div className="container-form">
      <h1>Lista de Cliente</h1>
      <Buscador
        search={setResultSearch}
        placeholder={"Buscar por nombre de cliente"}
        nameTabSearch={nameTabSearch}
      />
      <ProductoActDesc submit={submitAct} name={nameTabSearch}/>
      <ListData listItems={clienteList} />
    </div>
  );
}
