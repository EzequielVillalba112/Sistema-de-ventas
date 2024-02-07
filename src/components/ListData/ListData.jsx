import PropTypes from "prop-types";
import "./listData.css";

export default function ListData({ listItems }) {
  return (
    <div className="container-list-items">
      <ul>
        {listItems.map((listItem, i) => (
          <li key={i} className="list-items">
            <div className="list-items-cont">

              <div className="data-list-con">
                <p>{Object.keys(listItem)[1]}: </p>
                <p className="data-item-list">{listItem.nombre}</p>
              </div>

              <div className="data-list-con">
                <p>{Object.keys(listItem)[2]}: </p>
                <p className="data-item-list">{listItem.apellido}</p>
              </div>

              <div className="data-list-con">
                <p>{Object.keys(listItem)[3]}: </p>
                <p className="data-item-list">{listItem.limiteCC}</p>
              </div>

              <div className="data-list-con">
                <p>{Object.keys(listItem)[4]}: </p>
                <p className="data-item-list">{listItem.telefono}</p>
              </div>
            </div>

            <button className="btn btn-detail">Detalles</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

ListData.propTypes = {
  listItems: PropTypes.array.isRequired,
};
