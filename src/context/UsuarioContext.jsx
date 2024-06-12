import React from "react";
import { allRange } from "../api/usuarios";

const UsuarioContext = React.createContext();

export const useUsuario = () => {
  const context = React.useContext(UsuarioContext);
  if (!context) {
    throw new Error("useUsuario debe usarse dentro de un UsuarioProvider");
  }
  return context;
};

export function UsuarioProvider({ children }) {

    const allRangeUser = async () =>{
        try {
            return await allRange();
        } catch (error) {
            console.error("Error al traer la lista: ", error);
        }
    }

  return (
    <UsuarioContext.Provider 
        value={{
            allRangeUser,
        }}
    >
        {children}
    </UsuarioContext.Provider>
  );
}
