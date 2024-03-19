import PropTypes from "prop-types";
import { useProductos } from "../../../context/ProductoContext";
import { useEffect, useState } from "react";
import FormInputs from "../../../components/FormInputs/FormINputs";
import "./modificarProducto.css";
import BtnGuardEditElim from "../../../components/btnCrud/BtnGuardEditElim";
import { IoCloseSharp } from "react-icons/io5";
import { validFormProduct } from "../../../validation/formProducto/formProductoVal";
import { notError, notSuccess } from "../../../components/alert/alert";

export default function ModificarProducto({ closed }) {
  const nameForm = "Modificar Producto";

  const { dataProductModifi, idProductModifi, updateProduct, deleteProduct } = useProductos();

  const [nombreProd, setNombreProd] = useState("");
  const [precioProd, setPrecioProd] = useState("");
  const [categoriaProd, setCategoriaProd] = useState("");
  const [stockProd, setStockProd] = useState("");
  const [codBarProd, setCodBarProd] = useState("");
  const [descripcionProd, setDescripcionProd] = useState("");
  const [img, setImg] = useState(null);
  const [urlImg, setUrlImg] = useState("")

  const [disabledInput, setDisabledInput] = useState(true);

  useEffect(() => {
    setNombreProd(dataProductModifi.nombre_prod || "");
    setPrecioProd(dataProductModifi.precio_pro || "");
    setCategoriaProd(dataProductModifi.categoria_pro || "");
    setStockProd(dataProductModifi.stock || "");
    setCodBarProd(dataProductModifi.cod_barra || "");
    setDescripcionProd(dataProductModifi.descripcion_pro || "");
    setUrlImg(dataProductModifi.img_prod || "");
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

  const updateProducto = async () => {
    const validationForm = validFormProduct(
      nombreProd,
      precioProd,
      categoriaProd,
      stockProd,
      codBarProd,
      descripcionProd
    );

    if (validationForm === null) {
      const formData = new FormData();
      console.log(img);
      if (img) {
        formData.append("file", img);
      }
      formData.append("nombre", nombreProd);
      formData.append("precio", precioProd);
      formData.append("categoria", categoriaProd);
      formData.append("stock", stockProd);
      formData.append("codBarra", codBarProd);
      formData.append("descripcion", descripcionProd);
      formData.append("id", idProductModifi);
      formData.append("urlImg", urlImg)

      try {
        const response = await updateProduct({ body: formData });
        if (response) {
          notSuccess("Producto Modificado");
          closed(false)
        }
      } catch (error) {
        console.error("Error al crear producto:", error);
      }
    } else {
      notError(validationForm);
    }
  };

  const eliminarProducto = async ()=>{
    try {
      const resultado = await deleteProduct(idProductModifi);

      if(resultado.error){
        return resultado.error;
      }else{
        return resultado;
      }
    } catch (error) {
      console.error("Error al ejecutar la promesa:", error);
    }
  }

  return (
    <div className="container-modificar-producto">
      <button
        className="btn-cerrar-modifi-produ"
        onClick={() => {
          closed(false);
        }}
      >
        <IoCloseSharp color="#ffff" size="1.5rem" />
      </button>
      <div className="modific-product">
        <FormInputs nameForm={nameForm} formItems={formItemsProduc} />
        <BtnGuardEditElim
          enableInput={setDisabledInput}
          closed={closed}
          saved={updateProducto}
          eliminar = {eliminarProducto}
        />
      </div>
    </div>
  );
}

ModificarProducto.propTypes = {
  closed: PropTypes.func.isRequired,
};
