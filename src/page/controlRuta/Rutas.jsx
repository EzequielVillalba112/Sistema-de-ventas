import './rutas.css'
import { Outlet } from "react-router-dom";
import Menu from "../../components/menu/Menu";
import FeHr from '../../components/fechaHora/FeHr';


export default function Rutas() {
    return (
        <main className="app-main">
            <Menu />
            <div className='container-app'>
                <FeHr />
                <div className='outlet'>
                    {/*se utiliza dentro de un componente de ruta padre para indicar dónde deben renderizarse los componentes secundarios asociados con rutas hijas*/}
                    <Outlet />
                </div>
            </div>
        </main>
    )
}
