import PropTypes from "prop-types";
export default function CierreTotalCC({totalist, setEntrega, vuelto}) {
  return (
    <>
      <div className="container-cierre-total_cc">
        <div className="container_cierre">
          <p className="cierre_p">Total: </p>
          <p className="total-prin_cc">$ {totalist}</p>
        </div>
        <div className="container_cierre">
          <p className="cierre_p">Entregar: </p>
          <input
            type="number"
            className="total-prin_cc"
            onChange={(e) => setEntrega(e.target.value)}
          />
        </div>
        <div className="container_cierre">
          <p className="cierre_p">Vuelto: </p>
          <p className="total-prin_cc">$ {vuelto}</p>
        </div>
      </div>
    </>
  );
}


CierreTotalCC.propTypes = {
    totalist: PropTypes.number.isRequired,
    setEntrega: PropTypes.func.isRequired,
    vuelto: PropTypes.number.isRequired,
  };
  