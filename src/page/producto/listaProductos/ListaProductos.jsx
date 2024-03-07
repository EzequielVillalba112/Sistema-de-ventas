import { useEffect, useState } from "react";
import "./listaproductos.css";
import ProductoActDesc from "../../../components/producto/listar-producto/ProductoActDesc";
import Buscador from "../../../components/buscadorProductos/Buscador";
import { useProductos } from "../../../context/ProductoContext";
import ListaProducto from "../../../components/producto/lista/ListaProducto";
import Loader from "../../../components/loader/Loader";

export default function ListaProductos() {
  const nameTabSearch = "Producto";

  const [resultSearch, setResultSearch] = useState("");
  const [productActDesc, setProductActDesc] = useState(true);

  const {
    listProductActivos,
    listProductAct,
    listProductDesactivos,
    listProductDesac,
  } = useProductos();

  const submitAct = (data) => {
    setProductActDesc(data);
  };

  useEffect(() => {
    listProductActivos();
  }, []);

  useEffect(() => {
    listProductDesactivos();
  }, [productActDesc === false]);

  return (
    <div className="container-lista-productos">
      <h1>Lista de Productos</h1>
      <Buscador
        search={setResultSearch}
        placeholder={"Buscar por nombre de producto o cod. barra"}
        nameTabSearch={nameTabSearch}
      />
      <ProductoActDesc submit={submitAct} name={nameTabSearch} />
      <div className="lista-productos">
      {listProductAct == "" ? (
          <Loader />
        ) : (
          <ListaProducto
            productList={
              productActDesc == true ? listProductAct : listProductDesac
            }
          />
        )}
      </div>
    </div>
  );
}
