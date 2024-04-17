import './fehr.css';
import moment from 'moment';
import 'moment/locale/es';
import { useEffect, useState } from 'react';
import { IoMdCart } from "react-icons/io";
import { Link } from "react-router-dom";
import Carrito from '../../page/carrito/Carrito';

export default function FeHr() {

    const [fechaActual, setFechaActual] = useState(moment().format('YYYY-MM-DD HH:mm:ss'));
    const [productCarrito, setProductCarrito] = useState(2);
    const [actCarrito, setActCarrito] = useState(false);

    useEffect(() => {
        const intervalId = setInterval(() => {
            setFechaActual(moment().format('YYYY-MM-DD HH:mm:ss'));
        }, 1000);

        return () => clearInterval(intervalId);
    }, []);

    return (
        <>
            <div className="container-date-carrito">
                <div className="container-date-hr-dt">
                    <input type="text" value={fechaActual} disabled />
                </div>
                <div className="carrito" onClick={() => setActCarrito(!actCarrito)}>
                    <div className="cant-carrito">
                        <p>{productCarrito}</p>
                    </div>
                    <IoMdCart size='4rem' color='#ffff'/>
                </div>
            </div>

            {
                actCarrito && <Carrito/>
            }
        </>
    )
}
