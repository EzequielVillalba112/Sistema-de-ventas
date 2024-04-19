import "./fehr.css";
import moment from "moment";
import "moment/locale/es";
import { useEffect, useState } from "react";
import { IoMdCart } from "react-icons/io";
import Carrito from "../../page/carrito/Carrito";
import { useCarrito } from "../../context/CarritoContext";

export default function FeHr() {
  const [fechaActual, setFechaActual] = useState(
    moment().format("YYYY-MM-DD HH:mm")
  );

  const { actCarrito, setActCarrito, setFechaVenta, productCarrito } =
    useCarrito();

  useEffect(() => {
    const intervalId = setInterval(() => {
      setFechaActual(moment().format("YYYY-MM-DD HH:mm"));
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    setFechaVenta(fechaActual);
  }, [fechaActual]);

  return (
    <>
      <div className="container-date-carrito">
        <div className="container-date-hr-dt">
          <input type="text" value={fechaActual} disabled />
        </div>
        <div className="carrito" onClick={() => setActCarrito(!actCarrito)}>
          <div className="cant-carrito">
            <p>{productCarrito.length}</p>
          </div>
          <IoMdCart size="4rem" color="#ffff" />
        </div>
      </div>

      {actCarrito && <Carrito />}
    </>
  );
}
