import FormAddCategory from "../../components/categoria/agregar-categoria/FormAddCategory";
import ListaCategoria from "../../components/categoria/listar-categoria/ListaCategoria";
import "./agregarCategoria.css";

export default function AgregarCategoria() {
  return (
    <>
      <div className="container-categoria">
        <FormAddCategory />
      </div>

      <div className="container-categoria">
        <ListaCategoria />
      </div>
    </>
  );
}
