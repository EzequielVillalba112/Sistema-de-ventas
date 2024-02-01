import Login from "./page/login/Login";
import "./index.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Rutas from "./page/controlRuta/Rutas";
import Vender from "./page/vender/Vender";
import AddProduct from "./page/producto/agregarProducto/AddProduct";
import ListaProductos from "./page/producto/listaProductos/ListaProductos";
import AgregarCategoria from "./page/categoria/AgregarCategoria";
import AgregarCliente from "./page/cliente/agregar-cliente/AgregarCliente";
import ListarCliente from "./page/cliente/listar-cliente/ListarCliente";
import FormInputs from "./components/FormInputs/FormINputs";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />

          {/*Routes: validar si el usuario inicio secion, en el caso de que no iniciara secion no puede ingresar a la app */}
          <Route path="/rutas" element={<Rutas />}>
            <Route path="vender" element={<Vender />} />

            {/*Productos armar Context */}
            <Route path="agregarProducto" element={<AddProduct />} />
            <Route path="listarProducto" element={<ListaProductos />} />

            {/*Categoria armar Context */}
            <Route path="agregarCategoria" element={<AgregarCategoria />} />

            {/*Cliente armar Context */}
            <Route path="agregarCliente" element={<AgregarCliente />} />
            <Route path="listarCliente" element={<ListarCliente />} />
            
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
