import { useEffect, useState } from "react";
import Buscador from "../../components/buscadorProductos/Buscador";
import "./vender.css";
import ListaVender from "./lista-vender/ListaVender";
import { useProductos } from "../../context/ProductoContext";

export default function Vender() {
  const nameTabSearch = "Producto";
  const [resultSearch, setResultSearch] = useState([]);
  const {listProductAct, listProductActivos} = useProductos();

  useEffect(()=>{
    listProductActivos();
  },[])

  return (
    <div className="container-vender">
      <h1>Vender</h1>
      <Buscador
        search={setResultSearch}
        placeholder={"Buscar por nombre de producto o cod. barra"}
        status={true}
        nameTabSearch={nameTabSearch}
      />

      <div className="lista-produc_venta">
        <ListaVender
          productList={listProductAct}
          listSearch={resultSearch}
        />
      </div>
    </div>
  );
}
