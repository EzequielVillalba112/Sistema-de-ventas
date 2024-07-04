import React, { useEffect, useState } from "react";
import ListaUsr from "./ListaUsr";
import { useUsuario } from "../../../context/UsuarioContext";
import ModificarUser from "../modificar-usuario/ModificarUser";

export default function ListaUsuario() {
  const [users, setUsers] = useState([]);
  

  const { allUsers, setOpenModal, openModal, modifyUserInterface } = useUsuario();

  useEffect(() => {
    const allUser = async () => {
      const res = await allUsers();
      setUsers(res);
    };
    allUser();
  }, []);
;

  return (
    <>
      {openModal ? (
        <div className="container-form">
          <ModificarUser closed={setOpenModal}/>
        </div>
      ) : (
        <>
          <div className="container-form">
            <h1>Lista de usuarios</h1>
            <ListaUsr listItems={users} detail={modifyUserInterface} />
          </div>
        </>
      )}
    </>
  );
}
