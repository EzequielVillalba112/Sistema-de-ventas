import PropTypes from "prop-types";
import { useProductos } from "../../../context/ProductoContext";
import { useEffect, useState } from "react";
import FormInputs from "../../../components/FormInputs/FormINputs";
import "./modificarProducto.css";
import BtnGuardEditElim from "../../../components/btnCrud/BtnGuardEditElim";
import { IoCloseSharp } from "react-icons/io5";

export default function ModificarProducto({ closed }) {
  const nameForm = "Modificar Producto";

  const { dataProductModifi } = useProductos();

  const [nombreProd, setNombreProd] = useState("");
  const [precioProd, setPrecioProd] = useState("");
  const [categoriaProd, setCategoriaProd] = useState("");
  const [stockProd, setStockProd] = useState("");
  const [codBarProd, setCodBarProd] = useState("");
  const [descripcionProd, setDescripcionProd] = useState("");
  const [img, setImg] = useState(null);

  const [disabledInput, setDisabledInput] = useState(true);

  useEffect(() => {
    setNombreProd(dataProductModifi.nombre_prod || "");
    setPrecioProd(dataProductModifi.precio_pro || "");
    setCategoriaProd(dataProductModifi.categoria_pro || "");
    setStockProd(dataProductModifi.stock || "");
    setCodBarProd(dataProductModifi.cod_barra || "");
    setDescripcionProd(dataProductModifi.descripcion_pro || "");
  }, [dataProductModifi]);

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
          disabled: disabledInput,
        },
        {
          nameInput: "PrecioProducto",
          type: "number",
          placeholder: "Precio",
          onchange: setPrecioProd,
          value: precioProd,
          onKeyDown: "",
          disabled: disabledInput,
        },
      ],
    },

    {
      class: "input-grup",
      inputs: [
        {
          nameInput: "Categoria",
          type: "select",
          option: ["Categoria", "Lacteos", "Alcohol", "Higiene", "Prueba"],
          onchange: setCategoriaProd,
          value: categoriaProd,
          onKeyDown: "",
          disabled: disabledInput,
        },
        {
          nameInput: "Stock",
          type: "number",
          placeholder: "Stock",
          onchange: setStockProd,
          value: stockProd,
          onKeyDown: "",
          disabled: disabledInput,
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
          disabled: disabledInput,
        },
        {
          nameInput: "DescripcionProducto",
          type: "text",
          placeholder: "Descripcion",
          onchange: setDescripcionProd,
          value: descripcionProd,
          onKeyDown: "",
          disabled: disabledInput,
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
          value: img,
          className: "file-select",
          onKeyDown: "",
          disabled: disabledInput,
        },
      ],
    },
  ];

  return (
    <div className="container-modificar-producto">
      <button
        className="btn-cerrar-modifi-produ"
        onClick={() => {
          closed(false);
        }}
      >
        <IoCloseSharp color="#ffff" size="1.5rem"/>
      </button>
      <div className="modific-product">
        <FormInputs nameForm={nameForm} formItems={formItemsProduc} />
        <BtnGuardEditElim enableInput={setDisabledInput} closed={closed} />
      </div>
    </div>
  );
}

ModificarProducto.propTypes = {
  closed: PropTypes.func.isRequired,
};
