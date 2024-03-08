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
    text: message + " agregado correctamente",
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
