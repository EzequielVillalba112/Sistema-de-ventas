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
import RegCC from "./page/registro/CuentaCorriente/RegCC";
import { CuentaCorrienteProvider } from "./context/CuentaCorriente";
import RegVentas from "./page/registro/Ventas/RegVentas";
import { RegVentasProvider } from "./context/RegVentasContext";

function App() {
  return (
    <>
      <ProductoProvider>
        <CategoryProvider>
          <ClienteProvider>
            <CarritoProvider>
              <CuentaCorrienteProvider>
                <RegVentasProvider>
                  <BrowserRouter>
                    <Routes>
                      <Route path="/" element={<Login />} />
                      {/*Routes: validar si el usuario inicio secion, en el caso de que no iniciara secion no puede ingresar a la app */}
                      <Route path="/rutas" element={<Rutas />}>
                        <Route path="vender" element={<Vender />} />
                        <Route
                          path="agregarProducto"
                          element={<AddProduct />}
                        />
                        <Route
                          path="listarProducto"
                          element={<ListaProductos />}
                        />
                        <Route
                          path="agregarCategoria"
                          element={<AgregarCategoria />}
                        />
                        <Route
                          path="agregarCliente"
                          element={<AgregarCliente />}
                        />
                        <Route
                          path="listarCliente"
                          element={<ListarCliente />}
                        />
                        <Route
                          path="agregarUsuario"
                          element={<AgregarUsuario />}
                        />
                        <Route path="carrito" element={<Carrito />} />
                        <Route path="regCuentaCorriente" element={<RegCC />} />
                        <Route path="regVentas" element={<RegVentas />} />
                      </Route>
                    </Routes>
                  </BrowserRouter>
                </RegVentasProvider>
              </CuentaCorrienteProvider>
            </CarritoProvider>
          </ClienteProvider>
        </CategoryProvider>
      </ProductoProvider>
    </>
  );
}

export default App;
