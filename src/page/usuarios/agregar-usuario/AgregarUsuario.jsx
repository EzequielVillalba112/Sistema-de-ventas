import { useState } from "react";
import FormInputs from "../../../components/FormInputs/FormInputs";

export default function AgregarUsuario() {

    const nameForm = "Usuario";

    const [nameUser, setNameUser] = useState("");
    const [passUser, setPassUser] = useState("");
    const [telefUser, setTelefUser] = useState("");
    const [rangoUser, setRangoUser] = useState("");

    const formItemsUser = [
        {
          class: "input-grup",
          inputs: [
            {
              nameInput: "NombreUser",
              type: "text",
              placeholder: "Nombre de usuario",
              onchange: setNameUser,
            },
            {
              nameInput: "ContraseniaUser",
              type: "password",
              placeholder: "Contraseña",
              onchange: setPassUser,
            },
          ],
        },

        {
            class: "input-grup",
            inputs: [
              {
                nameInput: "TeledUser",
                type: "number",
                placeholder: "Telefono de usuario",
                onchange: setTelefUser,
              },
              {
                nameInput: "RangoUser",
                type: "text",
                placeholder: "Rango de Usuario",
                onchange: setRangoUser,
              },
            ],
          },
      ];

  return (
    <div className="container-form">
      <FormInputs  nameForm={nameForm}
          formItems={formItemsUser}/>
    </div>
  )
}
