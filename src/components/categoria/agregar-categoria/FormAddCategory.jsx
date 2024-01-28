import "./addCategory.css";

export default function FormAddCategory() {
  return (
    <>
      <h1>Agregar categoría.</h1>

      <form className="form-agregar-categoria">
        <div className="inputs-form-categoria">
          <input type="text" name="" placeholder="Nombre de categoría" />
          <input type="text" name="" id="" placeholder="Descripción" />
        </div>
        <button className="btn-guardar" type="submit">
          Guardar
        </button>
      </form>
    </>
  );
}
