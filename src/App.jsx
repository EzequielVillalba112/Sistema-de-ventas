import Login from "./page/login/Login";
import "./index.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Rutas from "./page/controlRuta/Rutas";
import Vender from "./page/vender/Vender";
import AddProduct from "./page/agregarProducto/AddProduct";
import ListaProductos from "./page/listaProductos/ListaProductos";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />

          {/*Routes: validar si el usuario inicio secion, en el caso de que no iniciara secion no puede ingresar a la app */}
          <Route path="/rutas" element={<Rutas />}>
            <Route path="vender" element={<Vender />} />
            <Route path="agregarProducto" element={<AddProduct />} />
            <Route path="listarProducto" element={<ListaProductos />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
