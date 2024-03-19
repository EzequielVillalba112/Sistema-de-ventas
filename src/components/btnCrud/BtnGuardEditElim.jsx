import PropTypes from "prop-types";
import { useState } from "react";
import { notCancel } from "../alert/alert";
import Swal from "sweetalert2";
import { useProductos } from "../../context/ProductoContext";

export default function BtnGuardEditElim({
  enableInput,
  closed,
  saved,
  eliminar,
}) {
  const [guardar, setGuardar] = useState(false);
  const [editar, setEditar] = useState(true);

  const { listProductActivos } = useProductos();

  const btnEditar = () => {
    enableInput(!enableInput);
    setGuardar(!guardar);
    setEditar(!editar);
  };

  const btnCancelar = () => {
    notCancel(closed);
  };

  const btnEliminar = () => {
    Swal.fire({
      title: "Desea eliminar este Producto",
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: "Si",
      denyButtonText: `no`,
      confirmButtonColor: "#29C716",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const res = await eliminar();

        if (res === "Producto eliminado") {
          Swal.fire({
            title: "Producto Eliminado Correctamente",
            icon: "success",
            confirmButtonColor: "#29C716",
          });
        
          closed(false);
          
          return await listProductActivos();
        } else {
          if (res != "") {
            Swal.fire({
              title: "No se elimino ningun producto",
              icon: "error",
              text: res,
              confirmButtonColor: "#29C716",
            });
          }
        }
      } else if (result.isDenied) {
        Swal.fire({
          title: "No se elimino ningun Producto",
          icon: "info",
          confirmButtonColor: "#29C716",
        });
      }
    });

    /*
    notEliminar("producto").then(async (resultado) => {
      if (resultado) {
        const res = await eliminar();
      
        if(res.error != ""){
          
        }else{
          closed(false)
        }
        
      } 
    }).catch((error) => {
      console.error("Error al mostrar la alerta:", error);
    });*/
  };

  const save = () => {
    saved();
  };
  return (
    <div className="continer-buttons-modific">
      {guardar == true && (
        <button className="btn btn-guardar" onClick={save}>
          Guardar
        </button>
      )}
      {editar == true ? (
        <button className="btn btn-editar" onClick={btnEditar}>
          Editar
        </button>
      ) : (
        <button className="btn btn-cancelar" onClick={btnCancelar}>
          Cancelar
        </button>
      )}

      <button className="btn btn-eliminar" onClick={btnEliminar}>
        Elimnar
      </button>
    </div>
  );
}
BtnGuardEditElim.propTypes = {
  enableInput: PropTypes.func,
  closed: PropTypes.func,
  saved: PropTypes.func,
  eliminar: PropTypes.func,
};
