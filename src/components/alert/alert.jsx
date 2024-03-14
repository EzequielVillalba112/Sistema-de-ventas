import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const notificacion = withReactContent(Swal);

export const notError = (message) => {
  notificacion.fire({
    title: "¡Error!",
    text: message,
    icon: "error",
    confirmButtonText: "Aceptar",
  });
};

export const notSuccess = (message) => {
  notificacion.fire({
    title: "Correcto",
    text: message + " correctamente",
    icon: "success",
    confirmButtonText: "Aceptar",
  });
};

export const notSearchFalse = (message) =>
  Swal.mixin({
    toast: true,
    position: "top-end",
    showConfirmButton: false,
    timer: 2000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.onmouseenter = Swal.stopTimer;
      toast.onmouseleave = Swal.resumeTimer;
    },
  }).fire({
    icon: "error",
    title: `"No se encontró el ${message}"`,
  });

export const notCancel = (closed)=>{
  Swal.mixin({
    position: "center",
    showConfirmButton: true,
    didOpen: (toast) => {
      toast.onmouseenter = Swal.stopTimer;
      toast.onmouseleave = Swal.resumeTimer;
    },
  })
  .fire({
    title: "¿Deséa cancelar la modificacion?",
    showDenyButton: true,
    confirmButtonText: "Si",
    denyButtonText: `no`,
    confirmButtonColor: "#29C716",
  })
  .then((result) => {
    /* Read more about isConfirmed, isDenied below */
    if(result.value){
      closed(false)
    }
  });
}

export const notEliminar = (message) =>{
  notificacion
  .fire({
    title: "Desea eliminar este " + message +" ?",
    showDenyButton: true,
    showCancelButton: true,
    confirmButtonText: "Si",
    denyButtonText: `no`,
    confirmButtonColor: "#29C716",
  })
  .then((result) => {
    /* Read more about isConfirmed, isDenied below */
    if (result.isConfirmed) {
      Swal.fire({
        title: message + " Eliminado",
        icon: "success",
        confirmButtonColor: "#29C716",
      });/*
    Peticion a api
      Axios.delete(`http://localhost:3000/delete/${id}`)
        .then(() => {
          Swal.fire({
            title: "Empleado Eliminado",
            icon: "success",
            background: "#000",
            color: "#fff",
            confirmButtonColor: "#29C716",
          });
        })
        .catch(function (error) {
          notificacion.fire({
            icon: "error",
            title: "Oops...",
            text: "No se pudo eliminar el empleado",
            background: "#000",
            color: "#fff",
          });
        });*/
    } else if (result.isDenied) {
      Swal.fire({
        title: "No se elimino ningun " + message,
        icon: "info",
        confirmButtonColor: "#29C716",
      });
    }
  });
}