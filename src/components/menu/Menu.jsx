import "./menu.css";
import ProductoImg from "../../img/producto.png";
import CategoriaImg from "../../img/categoria.png";
import ClientesImg from "../../img/clientes.png";
import VenderImg from "../../img/caja_registradora.png";
import RegistrosImg from "../../img/lista_venta.png";
import UsuariosImg from "../../img/perfiles_de_usuario.png";
import Logo from "../../img/logo.png";
import { FaArrowDown, FaUserTie } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useState } from "react";

export default function Menu() {
  const [menus, setMenus] = useState({
    producto: false,
    categoria: false,
    cliente: false,
    registro: false,
    usuario: false,
  });

  const toggleMenu = (menuKey) => {
    setMenus((prevMenus) => ({ // Actualiza el estado de 'menus' utilizando una función de actualización del estado
      ...prevMenus, // Copia el estado anterior 'prevMenus'
      [menuKey]: !prevMenus[menuKey] // Actualiza la clave 'menuKey' en el estado copiado y asigna su valor negado
    }));
    
  };

  //Datos necesarios para renderizar el menu
  const menuItems = [
    {
      img: ProductoImg,
      key: "producto",
      label: "Productos",
      links: [
        { name: "Agregar Producto", url: "/rutas/agregarProducto" },
        { name: "Listar Producto", url: "/rutas/listarProducto" },
      ],
    },
    {
      img: CategoriaImg,
      key: "categoria",
      label: "Categorias",
      links: [{ name: "Agregar Categoria", url: "/rutas/agregarCategoria" }],
    },
    {
      img: ClientesImg,
      key: "cliente",
      label: "Clientes",
      links: [
        { name: "Agregar Cliente", url: "/rutas/agregarCliente" },
        { name: "Listar Cliente", url: "/rutas/listarCliente" },
      ],
    },
    {
      img: RegistrosImg,
      key: "registro",
      label: "Registros",
      links: [
        { name: "Ventas", url: "" },
        { name: "Cuenta Corriente", url: "/rutas/regCuentaCorriente" },
      ],
    },
    {
      img: UsuariosImg,
      key: "usuario",
      label: "Usuarios",
      links: [
        { name: "Agregar Usuario", url: "/rutas/agregarUsuario" },
        { name: "Listar Usuario", url: "" },
      ],
    },
  ];

  return (
    <div className="container-menu">
      <div className="logo-menu">
        <img src={Logo} alt="Logo" />
        <h1>
          El rojo<div className="punto"></div>
        </h1>
      </div>

      <div className="container-items_menu">
        {menuItems.map(({ img, key, label, links }) => (
          <div
            key={key}
            className="item-list-menu"
            onClick={() => toggleMenu(key)}
          >
            <div className="item-menu">
              <img src={img} alt={label} />
              <h2>{label}</h2>
              <FaArrowDown className="arrow-item" />
            </div>
            <div className={menus[key] ? "lista-option active" : "desact"}>
              <ul>
                {links.map((link, index) => (
                  <li key={index}>
                    <Link to={link.url}>{link.name}</Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
        <div className="item-menu item-vender">
          <img src={VenderImg} />
          <Link to="/rutas/vender">Vender</Link>
        </div>
      </div>
      <div className="user">
        <FaUserTie size="2rem" color="#FF0000" className="iconLogin" />
        <h2>Admin.</h2>
      </div>
    </div>
  );
}
