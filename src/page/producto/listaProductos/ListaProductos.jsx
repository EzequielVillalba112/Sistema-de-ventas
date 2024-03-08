import { useEffect, useState } from "react";
import "./listaproductos.css";
import ProductoActDesc from "../../../components/producto/listar-producto/ProductoActDesc";
import Buscador from "../../../components/buscadorProductos/Buscador";
import { useProductos } from "../../../context/ProductoContext";
import ListaProducto from "../../../components/producto/lista/ListaProducto";
import Loader from "../../../components/loader/Loader";

export default function ListaProductos() {
  const nameTabSearch = "Producto";

  const [resultSearch, setResultSearch] = useState([]);
  const [inputSearch, setInputSearch] = useState("");
  const [productActDesc, setProductActDesc] = useState(true);

  const {
    listProductActivos,
    listProductAct,
    listProductDesactivos,
    listProductDesac,
  } = useProductos();

  const submitAct = (data) => {
    setProductActDesc(data);
    setInputSearch("");
    setResultSearch([])
  };

  useEffect(() => {
    listProductActivos();
  }, []);

  useEffect(() => {
    listProductDesactivos();
  }, [productActDesc === false]);

  const detail = (id)=>{
    alert(id)
  }

  return (
    <div className="container-lista-productos">
      <h1>Lista de Productos</h1>
      <Buscador
        search={setResultSearch}
        placeholder={"Buscar por nombre de producto o cod. barra"}
        status={productActDesc}
        value={inputSearch}
        onChange={setInputSearch}
      />
      <ProductoActDesc submit={submitAct} name={nameTabSearch} />
      <div className="lista-productos">
        {listProductAct == "" ? (
          <Loader />
        ) :  (
          <ListaProducto
            productList={
              productActDesc == true ? listProductAct : listProductDesac
            }
            listSearch ={resultSearch}
            detail = {detail}
          />
        )
        }
      </div>
    </div>
  );
}
