import { useEffect, useState } from "react";
import {
  obtenerEstudiantes,
  guardarEstudiante,
  eliminarEstudiante,
} from "./estudianteService";
import TablaEstudiante from "./components/estudiante/TablaEstudiante";
import { useEffect, useState } from "react";


/*
  ============================================================
  App.jsx
  ============================================================

  Este componente muestra una versión básica de un CRUD
  de estudiantes usando React + un service separado.

  Aquí React se encarga de:
  - manejar estado
  - capturar eventos
  - renderizar la interfaz

  El service se encarga de:
  - consultar la base de datos
  - insertar
  - actualizar
  - eliminar
*/

const initialForm = {
  id: "",
  nombre: "",
  apellido: "",
  correo: "",
  carrera: "",
  fechaNac: "",
};

function App() {
  // Estado del formulario
  const [form, setForm] = useState(initialForm);

  // Estado de la lista de estudiantes
  const [students, setStudents] = useState([]);

  // Estado del texto de búsqueda
  const [search, setSearch] = useState("");

  // Estado para mostrar carga
  const [loading, setLoading] = useState(false);

  /*
    ------------------------------------------------------------
    Cargar estudiantes
    ------------------------------------------------------------
    Esta función consulta los datos usando el service
    y actualiza el estado students.
  */
  const loadStudents = async (searchText = "") => {
    try {
      setLoading(true);
      const data = await obtenerEstudiantes(searchText);
      setStudents(data);
    } catch (error) {
      console.error(error);
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  /*
    ------------------------------------------------------------
    useEffect
    ------------------------------------------------------------
    Se ejecuta una vez al cargar el componente.
    Lo usamos para traer los estudiantes al inicio.
  */
  useEffect(() => {
    loadStudents();
  }, []);

  /*
    ------------------------------------------------------------
    Manejar cambios del formulario
    ------------------------------------------------------------
    Esta función sirve para todos los inputs.
    Toma el name del control y actualiza esa propiedad.
  */
  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  /*
    ------------------------------------------------------------
    Guardar estudiante
    ------------------------------------------------------------
    Si el formulario tiene id, actualiza.
    Si no tiene id, crea un nuevo registro.

    La decisión la toma saveStudent() en el service.
  */
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (
        !form.nombre.trim() ||
        !form.apellido.trim() ||
        !form.correo.trim() ||
        !form.carrera.trim()
      ) {
        alert("Debe completar nombre, apellido, correo y carrera");
        return;
      }

      await guardarEstudiante(form);
      setForm(initialForm);
      await loadStudents(search);
    } catch (error) {
      console.error(error);
      alert(error.message);
    }
  };

  /*
    ------------------------------------------------------------
    Editar estudiante
    ------------------------------------------------------------
    Carga los datos de la fila seleccionada en el formulario.
  */
  const handleEdit = (student) => {
    setForm({
      id: student.id || "",
      nombre: student.nombre || "",
      apellido: student.apellido || "",
      correo: student.correo || "",
      carrera: student.carrera || "",
      fechaNac: student.fechaNac || "",
    });
  };

  /*
    ------------------------------------------------------------
    Eliminar estudiante
    ------------------------------------------------------------
    Elimina por id y vuelve a cargar la tabla.
  */
  const handleDelete = async (id) => {
    const ok = confirm("¿Desea eliminar este estudiante?");
    if (!ok) return;

    try {
      await eliminarEstudiante(id);
      await loadStudents(search);
    } catch (error) {
      console.error(error);
      alert(error.message);
    }
  };

  /*
    ------------------------------------------------------------
    Limpiar formulario
    ------------------------------------------------------------
    Restablece el formulario a su estado inicial.
  */
  const handleCancel = () => {
    setForm(initialForm);
  };

  /*
    ------------------------------------------------------------
    Buscar estudiantes
    ------------------------------------------------------------
    Ejecuta la consulta usando el texto actual de búsqueda.
  */
  const handleSearch = async () => {
    await loadStudents(search);
  };

  /*
    ------------------------------------------------------------
    Limpiar búsqueda
    ------------------------------------------------------------
    Borra el texto y recarga todos los registros.
  */
  const handleClearSearch = async () => {
    setSearch("");
    await loadStudents("");
  };

  return (
    <div style={{ maxWidth: "1100px", margin: "0 auto", padding: "20px" }}>
      <h1>Laboratorio 7 - React Estudiantes</h1>
      <p>Introducción a React con separación de responsabilidades.</p>

      <hr />

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
          <button type="submit">
            {form.id ? "Actualizar" : "Agregar"}
          </button>
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

export default App;