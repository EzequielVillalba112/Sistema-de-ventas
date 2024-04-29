import { useEffect, useState } from "react";
import FormInputs from "../../../components/FormInputs/FormINputs";
import { useProductos } from "../../../context/ProductoContext";
import { validFormProduct } from "../../../validation/formProducto/formProductoVal";
import { notError, notSuccess } from "../../../components/alert/alert.jsx";
import { useCategory } from "../../../context/CategoryContext.jsx";

export default function AddProduct() {
  const { createProducto, validProductExisting } = useProductos();
  const { listarCategoria } = useCategory();

  const nameForm = "Agregar Producto";

  const [categoria, setCategoria] = useState([]);
  const [nombreProd, setNombreProd] = useState("");
  const [precioProd, setPrecioProd] = useState("");
  const [categoriaProd, setCategoriaProd] = useState("");
  const [stockProd, setStockProd] = useState("");
  const [codBarProd, setCodBarProd] = useState("");
  const [descripcionProd, setDescripcionProd] = useState("");
  const [img, setImg] = useState(null);

  useEffect(() => {
    const listCategory = async () => {
      const res = await listarCategoria();
      setCategoria(res);
    };

    listCategory();
  }, [categoria.length == 0]);

  //Es un objeto con los datos necesario para renderizar la interfaz de los formularios
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
          disabled: false,
        },
        {
          nameInput: "PrecioProducto",
          type: "number",
          placeholder: "Precio",
          onchange: setPrecioProd,
          value: precioProd,
          onKeyDown: "",
          disabled: false,
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
          disabled: false,
        },
        {
          nameInput: "Stock",
          type: "number",
          placeholder: "Stock",
          onchange: setStockProd,
          value: stockProd,
          onKeyDown: "",
          disabled: false,
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
          disabled: false,
        },
        {
          nameInput: "DescripcionProducto",
          type: "text",
          placeholder: "Descripcion",
          onchange: setDescripcionProd,
          value: descripcionProd,
          onKeyDown: "",
          disabled: false,
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
          disabled: false,
        },
      ],
    },
    {
      class: "button-grup",
      inputs: [
        {
          className: "btn btn-guardar",
          type: "submit",
          text: "Guardar",
        },
      ],
    },
  ];

  const guardarProdu = async () => {
    //Valida que todos los campos necesarios no esten vacios
    const validationForm = validFormProduct(
      nombreProd,
      precioProd,
      categoriaProd,
      stockProd,
      codBarProd,
      descripcionProd
    );

    if (validationForm === null) {
      //Valida que el nombre o cod_barra del producto no existan
      const resValidExisting = await validProductExisting({
        nombreProd,
        codBarProd,
      });

      if (resValidExisting.status == 200) {
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
          //llama la funcion de agregar producto del context, este envia un objetos con los datos
          const response = await createProducto({ body: formData });
          if (response) {
            clear();
            notSuccess("Producto agregado");
          }
        } catch (error) {
          console.error("Error al crear producto:", error);
        }
      } else {
        notError(resValidExisting.error);
      }
    } else {
      notError(validationForm);
    }
  };

  //limpia los input una vez realizada la accion
  const clear = () => {
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
