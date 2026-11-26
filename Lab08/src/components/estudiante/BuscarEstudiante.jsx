import TablaEstudiante from "./TablaEstudiante";

function BuscarEstudiante({
  search,
  setSearch,
  handleSearch,
  handleClearSearch,
  loading,
  students,
  handleEdit,
  handleDelete,
}) {
  return (
    <div>
      <h2>Consulta de estudiantes</h2>

      <div style={{ display: "flex", gap: "10px", marginBottom: "20px" }}>
        <input
          type="text"
          placeholder="Buscar por nombre o apellido"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSearch()}
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

export default BuscarEstudiante;