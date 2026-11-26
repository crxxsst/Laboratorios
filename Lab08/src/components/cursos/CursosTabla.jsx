function CursosTabla({ courses, handleEdit, handleDelete }) {
  return (
    <div>
      <h2>Cursos</h2>
      <table
        border="1"
        cellPadding="8"
        style={{ width: "100%", borderCollapse: "collapse" }}
      >
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Créditos</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {courses.length === 0 ? (
            <tr>
              <td colSpan="4">No hay cursos registrados</td>
            </tr>
          ) : (
            courses.map((course) => (
              <tr key={course.id}>
                <td>{course.id}</td>
                <td>{course.nombre}</td>
                <td>{course.creditos}</td>
                <td>
                  <button onClick={() => handleEdit(course)}>Editar</button>{" "}
                  <button onClick={() => handleDelete(course.id)}>
                    Eliminar
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

export default CursosTabla;