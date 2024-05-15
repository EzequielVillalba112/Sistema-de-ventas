import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { useCuentaCC } from "../../../../context/CuentaCorriente";
export default function ListProdCC({
  idClientSelect,
  openCloseListProd,
  setIdClientSelect,
}) {
  const [listProductClient, setListProductClient] = useState([]);
  const { listarCuentaCC } = useCuentaCC();
  useEffect(() => {
    const list = listarCuentaCC(idClientSelect);
    console.log(list);
  }, []);
  return (
    <div>
      <button
        onClick={() => {
          openCloseListProd(false);
          setIdClientSelect("");
        }}
      >
        ce
      </button>
      <h1>{idClientSelect}</h1>
    </div>
  );
}

ListProdCC.propTypes = {
  idClientSelect: PropTypes.number.isRequired,
  openCloseListProd: PropTypes.func.isRequired,
  setIdClientSelect: PropTypes.func.isRequired,
};
