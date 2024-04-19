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
import AgregarUsuario from "./page/usuarios/agregar-usuario/AgregarUsuario";
import { ProductoProvider } from "./context/ProductoContext";
import { CategoryProvider } from "./context/CategoryContext";
import { ClienteProvider } from "./context/ClienteContext";
import Carrito from "./page/carrito/Carrito";
import { CarritoProvider } from "./context/CarritoContext";

function App() {
  return (
    <>
      <ProductoProvider>
        <CategoryProvider>
          <ClienteProvider>
            <CarritoProvider>
              <BrowserRouter>
                <Routes>
                  <Route path="/" element={<Login />} />

                  {/*Routes: validar si el usuario inicio secion, en el caso de que no iniciara secion no puede ingresar a la app */}
                  <Route path="/rutas" element={<Rutas />}>
                    <Route path="vender" element={<Vender />} />

                    <Route path="agregarProducto" element={<AddProduct />} />
                    <Route path="listarProducto" element={<ListaProductos />} />

                    {/*Categoria armar Context */}
                    <Route
                      path="agregarCategoria"
                      element={<AgregarCategoria />}
                    />

                    {/*Cliente armar Context */}
                    <Route path="agregarCliente" element={<AgregarCliente />} />
                    <Route path="listarCliente" element={<ListarCliente />} />

                    {/*Usuario armar Context */}
                    <Route path="agregarUsuario" element={<AgregarUsuario />} />

                    <Route path="carrito" element={<Carrito />} />
                  </Route>
                </Routes>
              </BrowserRouter>
            </CarritoProvider>
          </ClienteProvider>
        </CategoryProvider>
      </ProductoProvider>
    </>
  );
}

export default App;
