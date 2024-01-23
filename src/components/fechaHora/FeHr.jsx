import './fehr.css';
import moment from 'moment';
import 'moment/locale/es';
import { useEffect, useState } from 'react';

export default function FeHr() {

    const [fechaActual, setFechaActual] = useState(moment().format('YYYY-MM-DD HH:mm:ss'));


    useEffect(() => {
        const intervalId = setInterval(() => {
            setFechaActual(moment().format('YYYY-MM-DD HH:mm:ss'));
        }, 1000);

        return () => clearInterval(intervalId);
    }, []);

    return (
        <div className="container-date">
            <div className="container-date-hr-dt">
                <input type="text" value={fechaActual} disabled/>
            </div>
        </div>
    )
}
