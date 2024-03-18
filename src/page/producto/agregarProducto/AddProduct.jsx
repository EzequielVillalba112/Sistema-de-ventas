import { useState } from "react";
import FormInputs from "../../../components/FormInputs/FormINputs";
import { useProductos } from "../../../context/ProductoContext";
import { validFormProduct } from "../../../validation/formProducto/formProductoVal";
import { notError, notSuccess } from "../../../components/alert/alert.jsx";

export default function AddProduct() {
  const nameForm = "Agregar Producto";

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

  const { createProducto } = useProductos();

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
          disabled:false
        },
        {
          nameInput: "PrecioProducto",
          type: "number",
          placeholder: "Precio",
          onchange: setPrecioProd,
          value: precioProd,
          onKeyDown: "",
          disabled:false
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
          disabled:false
        },
        {
          nameInput: "Stock",
          type: "number",
          placeholder: "Stock",
          onchange: setStockProd,
          value: stockProd,
          onKeyDown: "",
          disabled:false
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
          disabled:false
        },
        {
          nameInput: "DescripcionProducto",
          type: "text",
          placeholder: "Descripcion",
          onchange: setDescripcionProd,
          value: descripcionProd,
          onKeyDown: "",
          disabled:false
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
          disabled:false
        },
      ],
    },
    {
      class: "button-grup",
      inputs: [
        {
          className: "btn btn-guardar",
          type: "submit",
          text: "Guardar"
        }
      ]
    }
  ];

  const guardarProdu = async () => {
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

      if (img) {
        formData.append("file", img);
      }
      formData.append("nombre", nombreProd);
      formData.append("precio", precioProd);
      formData.append("categoria", categoriaProd);
      formData.append("stock", stockProd);
      formData.append("codBarra", codBarProd);
      formData.append("descripcion", descripcionProd);

      try {
        const response = await createProducto({ body: formData });
        if (response) {
          clear();
          notSuccess("Producto agregado");
        }
      } catch (error) {
        console.error("Error al crear producto:", error);
      }
    } else {
      notError(validationForm);
    }
  };

  const clear = () => {
    setCategoria(["Categoria", "Lacteos", "Alcohol", "Higiene", "Prueba"]);
    setNombreProd("");
    setPrecioProd("");
    setStockProd("");
    setCodBarProd("");
    setDescripcionProd("");
  };

  return (
    <div className="container-form">
      <FormInputs
        nameForm={nameForm}
        formItems={formItemsProduc}
        saved={guardarProdu}
      />
    </div>
  );
}
