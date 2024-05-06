import { useCarrito } from "../../context/CarritoContext";
import "./btnVenta.css";

export default function BtnVenta() {
    const {clearCarrito, vender} = useCarrito();
  return (
    <div className="container-boton-carrito">
      <div className="container-btn_venta">
        <button className="btn_venta clear-carrito" onClick={clearCarrito}>Limpiar Carrito</button>
        <button className="btn_venta vender" onClick={vender}>Vender</button>
      </div>
    </div>
  );
}
