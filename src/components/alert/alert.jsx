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
  notificacion
    .fire({
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

  export const limitStock = () =>
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
    title: "No hay suficiente stock!",
  });

  export const addCarrito = () =>
  Swal.mixin({
    toast: true,
    position: "top-end",
    showConfirmButton: false,
    timer: 900,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.onmouseenter = Swal.stopTimer;
      toast.onmouseleave = Swal.resumeTimer;
    },
  }).fire({
    icon: "success",
    title: "Producto agregado al carrito!",
  });


export const notCancel = (closed) => {
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
      if (result.value) {
        closed(false);
      }
    });
};

export const notEliminar = (message) => {
  return new Promise((resolve, reject) => {
    Swal.fire({
      title: "Desea eliminar este " + message + " ?",
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: "Si",
      denyButtonText: `no`,
      confirmButtonColor: "#29C716",
    })
      .then((result) => {
        if (result.isConfirmed) {
          Swal.fire({
            title: message + " Eliminado",
            icon: "success",
            confirmButtonColor: "#29C716",
          });
          resolve(true);
        } else if (result.isDenied) {
          Swal.fire({
            title: "No se elimino ningun " + message,
            icon: "info",
            confirmButtonColor: "#29C716",
          });
          resolve(false);
        } else {
          resolve(false); // En caso de que se cierre la ventana de diálogo sin hacer clic en ningún botón
        }
      })
      .catch((error) => {
        reject(error); // Manejar cualquier error que pueda ocurrir durante la ejecución
      });
  });
};

export const deleteProductCarrito = (funcDelete, message) => {
  Swal.fire({
    title:message,
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Si",
  }).then((result) => {
    if (result.isConfirmed) {
      funcDelete();
      Swal.fire({
        title: "Eliminado!",
        text: "Su archivo ha sido eliminado.",
        icon: "success",
      });
    }
  });
}
