import React, { useEffect, useState } from "react";
import ListaUsr from "./ListaUsr";
import { useUsuario } from "../../../context/UsuarioContext";

export default function ListaUsuario() {
  const [users, setUsers] = useState([]);

  const { allUsers } = useUsuario();

  useEffect(() => {
    const allUser = async () => {
      const res = await allUsers();
      setUsers(res);
    };
    allUser();
  }, []);


  return (
    <>
      <div className="container-form">
        <h1>Lista de usuarios</h1>
        <ListaUsr listItems={users} />
      </div>
    </>
  );
}
