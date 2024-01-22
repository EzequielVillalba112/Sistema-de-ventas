import './menu.css'
import Logo from '../../img/logo.png'
import ProductoImg from '../../img/producto.png'
import CategoriaImg from '../../img/categoria.png'
import ClientesImg from '../../img/clientes.png'
import VenderImg from '../../img/caja_registradora.png'
import RegistrosImg from '../../img/lista_venta.png'
import UsuariosImg from '../../img/perfiles_de_usuario.png'
import { FaArrowDown } from "react-icons/fa6";
import { FaUserTie } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useState } from 'react'

export default function Menu() {
  const [productoMenu, setProductoMenu] = useState(false);
  const [categoriaMenu, setCategoriaMenu] = useState(false);
  const [clienteMenu, setClienteMenu] = useState(false);
  const [registroMenu, setRegistroMenu] = useState(false);
  const [usuarioMenu, setUsuarioMenu] = useState(false);

  return (
    <div className="container-menu">
      <div className='logo-menu'>
        <img src={Logo} />
        <h1>El rojo<div className='punto'></div></h1>
      </div>

      <div className='container-items_menu'>
        <div className='item-menu' onClick={() => {
          setProductoMenu(!productoMenu)
        }}>
          <img src={ProductoImg} />
          <h2>Productos</h2>
          <FaArrowDown className='arrow-item' />
        </div>
        {/*Opciones de menu de productos */}
        <div className={productoMenu ? 'lista-option active' : 'desact'}>
          <ul>
            <li>
              <Link to='/rutas/agregarProducto'>Agregar Producto</Link>
            </li>
            <li>Lista de Productos</li>
          </ul>
        </div>

        <div className='item-menu' onClick={() => {
          setCategoriaMenu(!categoriaMenu)
        }}>
          <img src={CategoriaImg} />
          <h2>Categorias</h2>
          <FaArrowDown className='arrow-item' />
        </div>
        {/*Opciones de menu de categoria */}
        <div className={categoriaMenu ? 'lista-option active' : 'desact'}>
          <ul>
            <li>Agregar Categoria</li>
            <li>Lista de categorias</li>
          </ul>
        </div>

        <div className='item-menu'  onClick={() => {
          setClienteMenu(!clienteMenu)
        }}>
          <img src={ClientesImg} />
          <h2>Clientes</h2>
          <FaArrowDown className='arrow-item' />
        </div>
        {/*Opciones de menu de Clientes */}
        <div className={clienteMenu ? 'lista-option active' : 'desact'}>
          <ul>
            <li>Agregar Cliente</li>
            <li>Lista de Clientes</li>
          </ul>
        </div>

        <div className='item-menu item-vender'>
          <img src={VenderImg} />
          <Link to='/rutas/vender'>Vender</Link>
        </div>

        <div className='item-menu' onClick={() => {
          setRegistroMenu(!registroMenu)
        }}>
          <img src={RegistrosImg} />
          <h2>Registros</h2>
          <FaArrowDown className='arrow-item' />
        </div>
        <div className={registroMenu ? 'lista-option active' : 'desact'}>
          <ul>
            <li>Ventas</li>
            <li>Cuenta Corriente</li>
          </ul>
        </div>

        <div className='item-menu' onClick={() => {
          setUsuarioMenu(!usuarioMenu)
        }}>
          <img src={UsuariosImg} />
          <h2>Usuarios</h2>
          <FaArrowDown className='arrow-item' />
        </div>
        <div className={usuarioMenu ? 'lista-option active' : 'desact'}>
          <ul>
            <li>Agregar Usuario</li>
            <li>Lista de Usuarios</li>
          </ul>
        </div>

      </div>
      <div className='user'>
        <FaUserTie size='2rem' color='#FF0000' className='iconLogin' />
        <h2>Admin.</h2>
      </div>
    </div>
  )
}
