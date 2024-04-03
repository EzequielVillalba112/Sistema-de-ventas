import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import {
  addCategory,
  listCategory,
  searchCategory,
  updateCategory,
} from "../api/category";

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
  //
  const [modifiCategoryInterfaz, setModifiCategoryInterfaz] = useState(false);
  const [idCategoryModifi, setIdCategoryModifi] = useState("");
  const [dataCategoryModific, setDataCategoryModific] = useState([]);

  //Carga los datos recibido del back a la variable listaCategory
  const listarCategoria = async () => {
    try {
      const res = await listCategory();

      if (res.statusText === "OK") {
        setListaCategory(res.data);
        return res.statusText;
      } else {
        return false;
      }
    } catch (error) {
      console.error("Error al listar categoria: ", error);
      return false;
    }
  };

  //Resibe un objeto con los datos a agregar en la base de datos
  const addCategoria = async (categoria) => {
    try {
      const res = await addCategory(categoria);
      if (res.statusText == "OK") {
        return true;
      } else {
        return false;
      }
    } catch (error) {
      console.error("Error al agregar categoria: ", error);
      return false;
    }
  };

  const modifiCategoryInterface = (id) => {
    setIdCategoryModifi(id);
    setModifiCategoryInterfaz(true);
  };

  const updateCategoria = async (categoria) => {
    try {
      const res = await updateCategory(categoria.body);
      if (res.statusText === "OK") {
        return true;
      } else {
        return false;
      }
    } catch (error) {
      console.error("Error al modificar categoria:", error);
      return false;
    }
  };

  useEffect(() => {
    setIdCategoryModifi("");
    setDataCategoryModific([]);
  }, [modifiCategoryInterfaz == false]);

  useEffect(() => {
    async function dataCategory() {
      const validCategory = idCategoryModifi !== "" && modifiCategoryInterfaz;

      if (validCategory) {
        try {
          const res = await searchCategory(idCategoryModifi);
          if (res.status === 200) {
            setDataCategoryModific(res.data[0]);
          } else {
            console.error(
              "Error al buscar productos. Código de estado:",
              res.status
            );
          }
        } catch (error) {
          console.error("Error al buscar categoria:", error);
        }
      }
    }
    dataCategory();
  }, [idCategoryModifi, modifiCategoryInterfaz]);

  useEffect(() => {
    listarCategoria();
  }, []);

  return (
    <CategoriContext.Provider
      value={{
        listaCategory,
        addCategoria,
        listarCategoria,
        setIdCategoryModifi,
        modifiCategoryInterfaz,
        setModifiCategoryInterfaz,
        modifiCategoryInterface,
        dataCategoryModific,
        updateCategoria
      }}
    >
      {children}
    </CategoriContext.Provider>
  );
}

CategoryProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
