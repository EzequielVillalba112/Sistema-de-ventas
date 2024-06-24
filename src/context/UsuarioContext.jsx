import React from "react";
import { addUserApi, allRange, allUserApi, validUserApi } from "../api/usuarios";

const UsuarioContext = React.createContext();

export const useUsuario = () => {
  const context = React.useContext(UsuarioContext);
  if (!context) {
    throw new Error("useUsuario debe usarse dentro de un UsuarioProvider");
  }
  return context;
};

export function UsuarioProvider({ children }) {
  const allRangeUser = async () => {
    try {
      return await allRange();
    } catch (error) {
      console.error("Error al traer la lista: ", error);
    }
  };

  const addUser = async (user) => {
    try {
      if(user){
        return await addUserApi(user);
      }else{
        error("Faltan datos");
      }
    } catch (error) {
      console.error("Error al cargar usuario: ", error);
    }
  }

  const validUserExistent = async (user) => {
    try {
      if(user){
        return await validUserApi(user);
      }else{
        error("Faltan datos");
      }
    } catch (error) {
      console.error("Error al cargar usuario: ", error);
    }
  }

  const allUsers = async () => {
    try {
      const res = await allUserApi();
      
      if(res.data.length > 0){
        return res.data;
      }else{
        return "No hay usuarios";
      }
    } catch (error) {
      console.error("Error al traer la lista: ", error);
    }
  }

  return (
    <UsuarioContext.Provider
      value={{
        allRangeUser,
        addUser,
        validUserExistent,
        allUsers
      }}
    >
      {children}
    </UsuarioContext.Provider>
  );
}
