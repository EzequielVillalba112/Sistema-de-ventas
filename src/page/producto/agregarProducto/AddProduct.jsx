import { useState } from "react";
import FormInputs from "../../../components/FormInputs/FormINputs";
import { useProductos } from "../../../context/ProductoContext";

export default function AddProduct() {
  const nameForm = "Producto";

  const [categoria, setCategoria] = useState([
    "Lacteos",
    "Alcohol",
    "Higiene",
    "Prueba",
  ]);

  const [nombreProd, setNombreProd] = useState();
  const [precioProd, setPrecioProd] = useState();
  const [categoriaProd, setCategoriaProd] = useState();
  const [stockProd, setStockProd] = useState();
  const [codBarProd, setCodBarProd] = useState();
  const [descripcionProd, setDescripcionProd] = useState();
  const [img, setImg] = useState({});

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
        },
        {
          nameInput: "PrecioProducto",
          type: "number",
          placeholder: "Precio",
          onchange: setPrecioProd,
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
        },
        {
          nameInput: "Stock",
          type: "number",
          placeholder: "Stock",
          onchange: setStockProd,
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
        },
        {
          nameInput: "DescripcionProducto",
          type: "text",
          placeholder: "Descripcion",
          onchange: setDescripcionProd,
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
        },
      ],
    },
  ];

  const guardarProdu = () => {
    const formData = new FormData();

    formData.append("img", img);
    formData.append("nombre", nombreProd);
    formData.append("precio", precioProd);
    formData.append("categoria", categoriaProd);
    formData.append("stock", stockProd);
    formData.append("codBarra", codBarProd);
    formData.append("descripcion", descripcionProd);
    

    createProducto({
      method: 'POST',
      body: formData
    });
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
