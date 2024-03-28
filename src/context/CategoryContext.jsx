import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { addCategory, listCategory } from "../api/category";

const CategoriContext = React.createContext();

export const useCategory = () => {
  const context = React.useContext(CategoriContext);
  if (!context) {
    throw new Error("useContexr debe usarse dentro de un CategoryProvider");
  }
  return context;
};

export function CategoryProvider({ children }) {
    //Guarda la lista de categorias
    const [listaCategory, setListaCategory] = useState([]);

    const listarCategoria = async () =>{
        try {
            const res = await listCategory();

            if(res.statusText === "OK"){
                setListaCategory(res.data);
            }else{
                return false;
            }
        } catch (error) {
            console.error("Error al listar categoria: ", error);
            return false;
        }
    }

    const addCategoria = async (categoria) =>{
        try {
            const res = await addCategory(categoria);
            if (res.statusText == "OK") {
                return true;
            }else{
                return false;
            }
        } catch (error) {
            console.error("Error al agregar categoria: ", error);
            return false;
        }
    }

    useEffect(()=>{
        listarCategoria();
    },[])
    return(
        <CategoriContext.Provider 
            value={{
                listaCategory,
                addCategoria,
                listarCategoria
            }}
        >
            {children}
        </CategoriContext.Provider>
    )
}

CategoryProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
