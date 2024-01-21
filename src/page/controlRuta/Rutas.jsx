import { Outlet } from "react-router-dom";
import Menu from "../../components/menu/Menu";

export default function Rutas() {
    return (
        <>
            <h1>ru</h1>

            <Menu />
            <Outlet/>
        </>
    )
}
