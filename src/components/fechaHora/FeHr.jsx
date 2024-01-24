import './fehr.css';
import moment from 'moment';
import 'moment/locale/es';
import { useEffect, useState } from 'react';
import { IoMdCart } from "react-icons/io";

export default function FeHr() {

    const [fechaActual, setFechaActual] = useState(moment().format('YYYY-MM-DD HH:mm:ss'));
    const [productCarrito, setProductCarrito] = useState(2);

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
                <div className="carrito">
                    <div className="cant-carrito">
                        <p>{productCarrito}</p>
                    </div>
                    <IoMdCart size='4rem' color='#ffff' />
                </div>
            </div>

        </>
    )
}
