import React from "react";
import { regVentas } from "../api/regVentas";

const RegVentasContext = React.createContext();

export const useRegVentas = () => {
    const context = React.useContext(RegVentasContext);
    if (!context) {
        throw new Error("useContext debe usarse dentro del sistema de venta");
    }
    return context;
}

export function RegVentasProvider({ children }) {

    const allRegVentas =  async () =>{
        try {
            const res = await regVentas();
            return res.data;
        } catch (error) {
            console.error("Error al traer la lista: ", error);
        }
    }

    return (
        <RegVentasContext.Provider value={{
            allRegVentas
        }}>
            {children}
        </RegVentasContext.Provider>
    )
}