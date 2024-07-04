import React, { useEffect, useState } from "react";
import {
  addUserApi,
  allRange,
  allUserApi,
  searchUserIdApi,
  validUserApi,
} from "../api/usuarios";

const UsuarioContext = React.createContext();

export const useUsuario = () => {
  const context = React.useContext(UsuarioContext);
  if (!context) {
    throw new Error("useUsuario debe usarse dentro de un UsuarioProvider");
  }
  return context;
};

export function UsuarioProvider({ children }) {
  const [openModal, setOpenModal] = useState(false);
  const [idDetail, setIdDetail] = useState("");
  const [dataUser, setDataUser] = useState([]);
  const [allRangeData, setAllRangeData] = useState([])

  const allRangeUser = async () => {
    try {
      const RES = await allRange();
      setAllRangeData(RES.data);
    } catch (error) {
      console.error("Error al traer la lista: ", error);
    }
  };

  const modifyUserInterface = (id) => {
    setIdDetail(id);
    setOpenModal(true);
  };

  const addUser = async (user) => {
    try {
      if (user) {
        return await addUserApi(user);
      } else {
        error("Faltan datos");
      }
    } catch (error) {
      console.error("Error al cargar usuario: ", error);
    }
  };

  const validUserExistent = async (user) => {
    try {
      if (user) {
        return await validUserApi(user);
      } else {
        error("Faltan datos");
      }
    } catch (error) {
      console.error("Error al cargar usuario: ", error);
    }
  };

  const allUsers = async () => {
    try {
      const res = await allUserApi();

      if (res.data.length > 0) {
        return res.data;
      } else {
        return "No hay usuarios";
      }
    } catch (error) {
      console.error("Error al traer la lista: ", error);
    }
  };

  const searchUserId = async (idUser) => {
    try {
      if (idUser) {
        const RES = await searchUserIdApi(idUser);
        if (RES.status === 200) {
          setDataUser(RES.data[0]);
        } else {
          console.error(
            "Error al buscar Cliente . Código de estado:",
            RES.status
          );
        }
      } else {
        throw new Error("Faltan datos");
      }
    } catch (error) {
      console.error("Error al traer la lista: ", error);
    }
  };

  useEffect(() => {
    const VALID = idDetail !== "" && openModal;

    if (VALID) {
      searchUserId(idDetail);
    }

  }, [idDetail, openModal])

  return (
    <UsuarioContext.Provider
      value={{
        allRangeUser,
        addUser,
        validUserExistent,
        allUsers,
        modifyUserInterface,
        dataUser,
        setOpenModal,
        openModal,
        allRangeData
      }}
    >
      {children}
    </UsuarioContext.Provider>
  );
}
