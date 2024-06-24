import React from 'react'

export default function ListaUsr({listItems}) {
  return (
    <div className="container-list-items">
      <ul>
        {listItems.map((listItem, i) => (
          <li key={i} className="list-items">
            <div className="list-items-cont">

              <div className="data-list-con">
                <p>Nombre: </p>
                <p className="data-item-list">{listItem.nombre_usuario}</p>
              </div>

              <div className="data-list-con">
                <p>Rango: </p>
                <p className="data-item-list">{listItem.rango}</p>
              </div>

              <div className="data-list-con">
                <p>Telefono: </p>
                <p className="data-item-list">{listItem.telefono}</p>
              </div>

            </div>

            <button className="btn btn-detail" onClick={()=>{
              detail(listItem.id_usuario)
            }}>Detalles</button>
          </li>
        ))}
      </ul>
    </div>
  )
}
