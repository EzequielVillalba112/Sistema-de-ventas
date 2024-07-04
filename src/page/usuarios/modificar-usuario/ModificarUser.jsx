import React, { useEffect, useState } from "react";
import { useUsuario } from "../../../context/UsuarioContext";
import FormModificar from "../../../components/formModificar/FormModificar";

export default function ModificarUser({ closed }) {
  const nameForm = "Modificar Usuario";

  const [nameUser, setNameUser] = useState("");
  const [passUser, setPassUser] = useState("");
  const [telefUser, setTelefUser] = useState("");
  const [rangoUser, setRangoUser] = useState([]);
  const [rango, setRango] = useState("");

  const [disabledInput, setDisabledInput] = useState(true);

  const { dataUser, allRangeUser, allRangeData } = useUsuario();

  useEffect(() => {
    allRangeUser();
    setRangoUser(allRangeData);
  }, [allRangeData.length > 0 ]);

  useEffect(() => {
    setNameUser(dataUser.nombre_usuario || "");
    setPassUser(dataUser.password || "");
    setTelefUser(dataUser.telefono || "");
    setRango(dataUser.rango || "");
  }, [dataUser]);

  const formItemsUser = [
    {
      class: "input-grup",
      inputs: [
        {
          nameInput: "NombreUser",
          type: "text",
          placeholder: "Nombre de usuario",
          onchange: setNameUser,
          value: nameUser,
          disabled: disabledInput,
        },
        {
          nameInput: "ContraseniaUser",
          type: "password",
          placeholder: "Contraseña",
          value: passUser,
          onchange: setPassUser,
          disabled: disabledInput,
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
          value: telefUser,
          onchange: setTelefUser,
          disabled: disabledInput,
        },
        {
          nameInput: "Usuario",
          type: "select",
          option: rangoUser,
          onchange: setRango,
          value: rango,
          onKeyDown: "",
          disabled: disabledInput,
        },
      ],
    },
  ];

  const modifyUser = () => {
    console.log("modificar");
  };

  const deleteUser = () => {
    console.log("eliminar");
  };

  return (
    <FormModificar
      closed={closed}
      nameForm={nameForm}
      formItems={formItemsUser}
      enableInput={setDisabledInput}
      saved={modifyUser}
      eliminar={deleteUser}
      estado={0}
    />
  );
}
