import './rutas.css'
import { Outlet } from "react-router-dom";
import Menu from "../../components/menu/Menu";

export default function Rutas() {
    return (
        <main className="app-main">
            <Menu />
            <Outlet/>
        </main>
    )
}
