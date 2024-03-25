import { useEffect, useState } from "react";
import "./listaproductos.css";
import ProductoActDesc from "../../../components/producto/listar-producto/ProductoActDesc";
import Buscador from "../../../components/buscadorProductos/Buscador";
import { useProductos } from "../../../context/ProductoContext";
import ListaProducto from "../../../components/producto/lista/ListaProducto";
import Loader from "../../../components/loader/Loader";
import ModificarProducto from "../modificarProducto/ModificarProducto";

export default function ListaProductos() {
  const nameTabSearch = "Producto";

  const [resultSearch, setResultSearch] = useState([]);
  
  const [productActDesc, setProductActDesc] = useState(true);

  const {
    listProductActivos,
    listProductAct,
    listProductDesactivos,
    listProductDesac,
    modificarProductInterfaz,
    modifiProductInterfaz,
    setModifiProductInterfaz,
  } = useProductos();

  const submitAct = (data) => {
    setProductActDesc(data);
    setResultSearch([]);
  };

  //Dependiendeo del valor de productActDesc muestra una lista o otra.
  useEffect(() => {
    listProductActivos();
  }, [productActDesc == true]);

  useEffect(() => {
    listProductDesactivos();
  }, [productActDesc === false]);
  //
  return (
    <div className="container-lista-productos">

      {/*Verifica si el el usuario preciono la opcion de modificar producto en la lista, si preciono renderiza
      la interfaz de modificar caso contrario muestra la lista de productos*/}
      {modifiProductInterfaz ? (
        <ModificarProducto closed={setModifiProductInterfaz} />
      ) : (
        <>
          <h1>Lista de Productos</h1>
          <Buscador
            search={setResultSearch}
            placeholder={"Buscar por nombre de producto o cod. barra"}
            status={productActDesc}
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
                listSearch={resultSearch}
                detail={modificarProductInterfaz}
              />
            )}
          </div>
        </>
      )}
    </div>
  );
}
