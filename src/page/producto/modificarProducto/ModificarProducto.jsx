import PropTypes from "prop-types";
import { useProductos } from "../../../context/ProductoContext";
import { useEffect, useState } from "react";
import { validFormProduct } from "../../../validation/formProducto/formProductoVal";
import { notError, notSuccess } from "../../../components/alert/alert";
import Swal from "sweetalert2";
import { useCategory } from "../../../context/CategoryContext";
import FormModificar from "../../../components/formModificar/FormModificar";

export default function ModificarProducto({ closed }) {
  const nameForm = "Modificar Producto";

  const {
    dataProductModifi,
    idProductModifi,
    updateProduct,
    deleteProduct,
    desactivateProduct,
    validProductExisting,
  } = useProductos();

  const { listaCategory, listarCategoria } = useCategory();

  const [nombreProd, setNombreProd] = useState("");
  const [precioProd, setPrecioProd] = useState("");
  const [categoriaProd, setCategoriaProd] = useState("");
  const [categoriaOption, setCategoriaOption] = useState([]);
  const [stockProd, setStockProd] = useState("");
  const [codBarProd, setCodBarProd] = useState("");
  const [descripcionProd, setDescripcionProd] = useState("");
  const [img, setImg] = useState(null);
  const [urlImg, setUrlImg] = useState("");
  const [dependencia, setDependencia] = useState("");

  const [disabledInput, setDisabledInput] = useState(true);

  useEffect(() => {
    listarCategoria();
    setCategoriaOption(listaCategory);
  }, []);

  useEffect(() => {
    setNombreProd(dataProductModifi.nombre_prod || "");
    setPrecioProd(dataProductModifi.precio_pro || "");
    setCategoriaProd(dataProductModifi.categoria_pro || "");
    setStockProd(dataProductModifi.stock || "");
    setCodBarProd(dataProductModifi.cod_barra || "");
    setDescripcionProd(dataProductModifi.descripcion_pro || "");
    setUrlImg(dataProductModifi.img_prod || "");
    setDependencia(dataProductModifi.dependencia || "");
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
          option: categoriaOption,
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
        formData.append("id", idProductModifi);
        formData.append("urlImg", urlImg);
        formData.append("dependencia", dependencia);

        try {
          const response = await updateProduct({ body: formData });
          if (response) {
            notSuccess("Producto Modificado");
            closed(false);
          }
        } catch (error) {
          console.error("Error al modificar producto:", error);
        }
      } else {
        notError(resValidExisting.error);
      }
    } else {
      notError(validationForm);
    }
  };

  const eliminarProducto = async () => {
    try {
      Swal.fire({
        title: "Desea eliminar este Producto",
        showDenyButton: true,
        showCancelButton: true,
        confirmButtonText: "Si",
        denyButtonText: `no`,
        confirmButtonColor: "#29C716",
      }).then(async (result) => {
        if (result.isConfirmed) {
          const resultado = await deleteProduct(idProductModifi);

          if (resultado == "Producto eliminado") {
            Swal.fire({
              title: "Producto Eliminado Correctamente",
              icon: "success",
              confirmButtonColor: "#29C716",
            }).then((result) => {
              if (result.isConfirmed) {
                window.location.reload();
              }
            });

            closed(false);
          } else if (resultado != "") {
            Swal.fire({
              icon: "error",
              title: "¿Desea solo desactivar el producto?",
              text: resultado.error,
              showDenyButton: true,
              showCancelButton: true,
              confirmButtonText: "Si",
              denyButtonText: `no`,
              confirmButtonColor: "#29C716",
            }).then(async (result) => {
              if (result.isConfirmed) {
                const res = await desactivateProduct(idProductModifi);

                if (res.status == 200) {
                  Swal.fire({
                    title: "Producto desactivado Correctamente",
                    icon: "success",
                    confirmButtonColor: "#29C716",
                  }).then((result) => {
                    if (result.isConfirmed) {
                      window.location.reload();
                      closed(!closed);
                    }
                  });
                }
              } else if (result.isDenied) {
                Swal.fire({
                  title: "No se desactivo el Producto",
                  icon: "info",
                  confirmButtonColor: "#29C716",
                });
              }
            });
          }
        } else if (result.isDenied) {
          Swal.fire({
            title: "No se elimino ningun Producto",
            icon: "info",
            confirmButtonColor: "#29C716",
          });
        }
      });
    } catch (error) {
      console.error("Error al ejecutar la promesa:", error);
    }
  };

  return (
    <>
      <FormModificar
        closed={closed}
        nameForm={nameForm}
        formItems={formItemsProduc}
        enableInput={setDisabledInput}
        saved={updateProducto}
        eliminar={eliminarProducto}
        estado={dataProductModifi.estado_pro}
      />
    </>
  );
}

ModificarProducto.propTypes = {
  closed: PropTypes.func.isRequired,
};
