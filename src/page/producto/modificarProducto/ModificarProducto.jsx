import PropTypes from "prop-types";
import { useProductos } from "../../../context/ProductoContext";
import { useState } from "react";
import FormInputs from "../../../components/FormInputs/FormINputs";
import "./modificarProducto.css";

export default function ModificarProducto({ closed }) {
  const nameForm = "Modificar Producto";

  const [categoria, setCategoria] = useState([
    "Categoria",
    "Lacteos",
    "Alcohol",
    "Higiene",
    "Prueba",
  ]);
  const [nombreProd, setNombreProd] = useState("");
  const [precioProd, setPrecioProd] = useState("");
  const [categoriaProd, setCategoriaProd] = useState("");
  const [stockProd, setStockProd] = useState("");
  const [codBarProd, setCodBarProd] = useState("");
  const [descripcionProd, setDescripcionProd] = useState("");
  const [img, setImg] = useState(null);

  console.log(descripcionProd);

  const formItemsProduc = [
    {
      class: "input-grup",
      inputs: [
        {
          nameInput: "NombreProducto",
          type: "text",
          placeholder: "Nombre de Producto",
          onchange: setNombreProd,
          value: nombreProd,
          onKeyDown: "",
        },
        {
          nameInput: "PrecioProducto",
          type: "number",
          placeholder: "Precio",
          onchange: setPrecioProd,
          value: precioProd,
          onKeyDown: "",
        },
      ],
    },

    {
      class: "input-grup",
      inputs: [
        {
          nameInput: "Categoria",
          type: "select",
          option: categoria,
          onchange: setCategoriaProd,
          value: categoriaProd,
          onKeyDown: "",
        },
        {
          nameInput: "Stock",
          type: "number",
          placeholder: "Stock",
          onchange: setStockProd,
          value: stockProd,
          onKeyDown: "",
        },
      ],
    },

    {
      class: "input-grup",
      inputs: [
        {
          nameInput: "CodBarra",
          type: "number",
          placeholder: "Cod. Barra",
          onchange: setCodBarProd,
          value: codBarProd,
          onKeyDown: true,
        },
        {
          nameInput: "DescripcionProducto",
          type: "text",
          placeholder: "Descripcion",
          onchange: setDescripcionProd,
          value: descripcionProd,
          onKeyDown: "",
        },
      ],
    },
    {
      class: "input-grup",
      inputs: [
        {
          nameInput: "addImg",
          type: "file",
          placeholder: "Ingrese Una imagen",
          onchange: setImg,
          className: "file-select",
          onKeyDown: "",
        },
      ],
    },
  ];

  const saved = () => {
    alert(saved);
  };

  return (
    <div className="container-modificar-producto">
      <button
        onClick={() => {
          closed(false);
        }}
      >
        Cerrar
      </button>
      <FormInputs nameForm={nameForm} formItems={formItemsProduc} />
      <div className="continer-buttons-modific">
        <button className="btn btn-guardar">Guardar</button>
        <button className="btn btn-editar">Editar</button>
        <button className="btn btn-eliminar">Elimnar</button>
      </div>
    </div>
  );
}

ModificarProducto.propTypes = {
  closed: PropTypes.func.isRequired,
};
