import { useEffect, useState } from "react";
import FormInputs from "../../../components/FormInputs/FormINputs";
import { useUsuario } from "../../../context/UsuarioContext";

export default function AgregarUsuario() {
  const nameForm = "Usuario";

  const [nameUser, setNameUser] = useState("");
  const [passUser, setPassUser] = useState("");
  const [telefUser, setTelefUser] = useState("");
  const [rangoUser, setRangoUser] = useState([]);
  const [rango, setRango] = useState("");


  const { allRangeUser } = useUsuario();

  useEffect(() => {
    const allRange = async () => {
      const res = await allRangeUser();
      setRangoUser(res.data);
    };
    allRange();
  }, [rangoUser.length === 0]);

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
          nameInput: "Usuario",
          type: "select",
          option: rangoUser,
          onchange: setRango,
          value: rango,
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

  return (
    <div className="container-form">
      <FormInputs nameForm={nameForm} formItems={formItemsUser} />
    </div>
  );
}
