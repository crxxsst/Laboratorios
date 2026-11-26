function FormEstudiante() {
  const handleChange = (e) => {
    const { name, value } = e.target;
    setEstudianteForm((prevEstudiante) => ({
      ...prevEstudiante,
      [name]: value,
    }));
  };

  return (
    <div>
      <h2>{form.id ? "Editar estudiante" : "Agregar estudiante"}</h2>

      <form onSubmit={handleSubmit}>
        <div style={{ display: "grid", gap: "10px", marginBottom: "20px" }}>
          <input
            type="text"
            name="nombre"
            placeholder="Nombre"
            value={form.nombre}
            onChange={handleChange}
          />

          <input
            type="text"
            name="apellido"
            placeholder="Apellido"
            value={form.apellido}
            onChange={handleChange}
          />

          <input
            type="email"
            name="correo"
            placeholder="Correo"
            value={form.correo}
            onChange={handleChange}
          />

          <input
            type="text"
            name="carrera"
            placeholder="Carrera"
            value={form.carrera}
            onChange={handleChange}
          />

          <input
            type="date"
            name="fechaNac"
            value={form.fechaNac}
            onChange={handleChange}
          />
        </div>

        <div style={{ display: "flex", gap: "10px", marginBottom: "20px" }}>
          <button type="submit">{form.id ? "Actualizar" : "Agregar"}</button>
          <button type="button" onClick={handleCancel}>
            Cancelar
          </button>
        </div>
      </form>

      <hr />

      <h2>Consulta de estudiantes</h2>

      <div style={{ display: "flex", gap: "10px", marginBottom: "20px" }}>
        <input
          type="text"
          placeholder="Buscar por nombre o apellido"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <button onClick={handleSearch} className="btn btn-primary">
          Buscar
        </button>
        <button onClick={handleClearSearch} className="btn btn-secondary">
          Limpiar
        </button>
      </div>

      {loading ? (
        <p>Cargando estudiantes...</p>
      ) : (
        <TablaEstudiante
          students={students}
          handleEdit={handleEdit}
          handleDelete={handleDelete}
        />
      )}
    </div>
  );
}

export default FormEstudiante;