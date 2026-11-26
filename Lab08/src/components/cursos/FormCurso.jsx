function FormCurso({ form, onChange, onSubmit, onCancel }) {
  return (
    <form onSubmit={onSubmit}>
      <div style={{ display: "grid", gap: "10px", marginBottom: "20px" }}>
        <input
          type="text"
          name="nombre"
          placeholder="Nombre del curso"
          value={form.nombre}
          onChange={onChange}
        />
        <input
          type="number"
          name="creditos"
          placeholder="Créditos"
          min="0"
          value={form.creditos}
          onChange={onChange}
        />
      </div>

      <div style={{ display: "flex", gap: "10px", marginBottom: "20px" }}>
        <button type="submit">{form.id ? "Actualizar" : "Agregar"}</button>
        <button type="button" onClick={onCancel}>Cancelar</button>
      </div>
    </form>
  );
}

export default FormCurso;