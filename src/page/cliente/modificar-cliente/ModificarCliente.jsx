import { useEffect, useState } from "react";
import FormModificar from "../../../components/formModificar/FormModificar";
import PropTypes from "prop-types";
import { useCliente } from "../../../context/ClienteContext";
import { validCliente } from "../../../validation/formCliente/formClienteVal";
import { notError, notSuccess } from "../../../components/alert/alert";
import Swal from "sweetalert2";

export default function ModificarCliente({ closed }) {
  const nameForm = "Modificar Cliente ";

  const {dataClienteModif, updateClienteData, idCliente, eliminarCliente, desacCliente} = useCliente();

  const [nombreCliente, setNombreCliente] = useState("");
  const [apellidoCliente, setApellidoCliente] = useState("");
  const [limitCc, setLimitCc] = useState("");
  const [telefono, setTelefono] = useState("");

  const [disabledInput, setDisabledInput] = useState(true);

  useEffect(()=>{
    setNombreCliente(dataClienteModif.nombre_cliente || "")
    setApellidoCliente(dataClienteModif.apellido_cliente || "")
    setLimitCc(dataClienteModif.limite_cc || "")
    setTelefono(dataClienteModif.numero_telefono || "")
  },[dataClienteModif])

  const formItemsClient = [
    {
      class: "input-grup",
      inputs: [
        {
          nameInput: "NombreCliente",
          type: "text",
          placeholder: "Nombre de Cliente",
          onchange: setNombreCliente,
          value: nombreCliente,
          disabled: disabledInput,
        },
        {
          nameInput: "ApellidoCliente",
          type: "text",
          placeholder: "Apellido Cliente",
          onchange: setApellidoCliente,
          value: apellidoCliente,
          disabled: disabledInput,
        },
      ],
    },
    {
      class: "input-grup",
      inputs: [
        {
          nameInput: "LimiteCC",
          type: "number",
          placeholder: "Limite de CC.",
          onchange: setLimitCc,
          value: limitCc,
          disabled: disabledInput,
        },
        {
          nameInput: "NumeroTelefono",
          type: "number",
          placeholder: "Numero de Telefono",
          onchange: setTelefono,
          value: telefono,
          disabled: disabledInput,
        },
      ],
    },
  ];

  const modificarCliente = async () => {
    const validForm = validCliente(nombreCliente, apellidoCliente, limitCc);

    if(validForm == null){
      try {
        const res = await updateClienteData({
          nombreCliente: nombreCliente,
          apellidoCliente: apellidoCliente,
          limitCc: limitCc,
          telefono: telefono,
          idCliente: idCliente
        });

        if(res){
          notSuccess("Cliente Modificado");
          closed(false);
        }
      } catch (error) {
        console.error("Error al modificar cliente:", error);
      }
    }else{
      notError(validForm);
    }
  };

  const elimiCliente = () => {
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
          const resultado = await eliminarCliente(idCliente);

          if (resultado === "Cliente eliminado") {
            Swal.fire({
              title: "Cliente Eliminado Correctamente",
              icon: "success",
              confirmButtonColor: "#29C716",
            }).then((result) => {
              if (result.isConfirmed) {
                window.location.reload();
              }
            });

            closed(false);
          } else {
            if (resultado != "") {
              Swal.fire({
                icon: "error",
                title: "¿Desea solo desactivar el cliente?",
                text: resultado.error,
                showDenyButton: true,
                showCancelButton: true,
                confirmButtonText: "Si",
                denyButtonText: `no`,
                confirmButtonColor: "#29C716",
              }).then(async (result) => {
                if (result.isConfirmed) {
                  const res = await desacCliente(idCliente);

                  if (res.status == 200) {
                    Swal.fire({
                      title: "Cliente desactivado Correctamente",
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
                    title: "No se desactivo el Cliente",
                    icon: "info",
                    confirmButtonColor: "#29C716",
                  });
                }
              });
            }
          }
        } else if (result.isDenied) {
          Swal.fire({
            title: "No se elimino ningun Cliente",
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
    <FormModificar
      closed={closed}
      nameForm={nameForm}
      formItems={formItemsClient}
      enableInput={setDisabledInput}
      saved={modificarCliente}
      eliminar={elimiCliente}
      estado={dataClienteModif.estado_cliente}
    />
  );
}

ModificarCliente.propTypes = {
  closed: PropTypes.func.isRequired,
};
