// importamos el cliente de Supabase para interactuar con la base de datos
// este cliente ya está configurado con la URL y la clave de acceso a nuestra instancia de Supabase
import { supabase } from "./supabase.js";

// 1.Ekementos DOM
// 2.Eventos
// 3.Funciones



//****************************************
// Referencias a elementos del DOM
//****************************************
// Botones
const btnClear = document.getElementById("btnClear");
const btnAdd = document.getElementById("btnAdd");
const btnCancel = document.getElementById("btnCancel");
const btnLoad = document.getElementById("btnLoad");
// Campo de búsqueda
const txtSearch = document.getElementById("txtSearch");

//Formulario
const txtId = document.getElementById("txtId");
const txtNombre = document.getElementById("txtNombre");
const txtApellido = document.getElementById("txtApellido");
const txtCorreo = document.getElementById("txtCorreo");
const txtCarrera = document.getElementById("txtCarrera");
const txtFechaNac = document.getElementById("txtFechaNac");

// Tabla
const tbody = document.getElementById("tbodyStudents");
const tituloForm = document.getElementById("tituloForm");

//Consultar estudiantes al cargar la página
window.onload = () => {
  consultarEstudiantes();
};
//****************************************
//Eventos
//****************************************
btnLoad.addEventListener("click", async () => consultarEstudiantes());
btnAdd.addEventListener("click", async () => guardarEstudiante());
btnClear.addEventListener("click", async () => {
  txtSearch.value = "";

  await consultarEstudiantes();
});
btnCancel.addEventListener("click", async () => limpiarFormulario());

tbody.addEventListener("click", async (event) => {
  const target = event.target;
  if (!target.classList.contains("btnEliminar")) return;

  const id = target.getAttribute("data-id");

  await eliminarEstudiante(id);
});

// Editar - consulto por el id -
// lleno el formulario con los datos del estudiante -
// cambio el botón de agregar a actualizar -
// al hacer click en actualizar, actualizo el estudiante en la base de datos
tbody.addEventListener("click", async (event) => {
  const target = event.target;
  if (!target.classList.contains("btnEditar")) return;

  const id = target.getAttribute("data-id");

  // 1. Consultar el estudiante por su id
  const { data, error } = await supabase.from("estudiantes").select("id,nombre,apellido,correo,carrera,fechaNac").eq("id", id).single();

  if (error) {
    console.error(error);
    Swal.fire({ icon: "error", title: "Error", text: "No se pudo cargar el estudiante: " + error.message });

    return;
  }
  // 2. Llenar el formulario con los datos del estudiante
  txtId.value = data.id;
  txtNombre.value = data.nombre;
  txtApellido.value = data.apellido;
  txtCorreo.value = data.correo ?? "";
  txtCarrera.value = data.carrera ?? "";
  txtFechaNac.value = data.fechaNac ?? ""; // formato YYYY-MM-DD
  // 3. Cambiar el botón de agregar a actualizar
  btnAdd.textContent = "Actualizar";
  tituloForm.textContent = "Editar Estudiante";
});

/*
// funcion de flecha
// // Convierte YYYY-MM-DD a DD/MM/YYYY sin problemas de zona horaria
const formatearFecha = (fecha) => {
  if (!fecha) return "";
  const [y, m, d] = fecha.split("-");
  return `${d}/${m}/${y}`;
};

const consultarEstudiantes = async () => {};
// funcion tradicional
// function consultarEstudiantes() {}

// let y const
// let x = 10;
// x = 20;
// const y = 30;
// y = 40; // error, no se puede reasignar una constante
// var z = 50;
// var z = 60; // no error, var permite redeclarar la misma variable
*/

//****************************************
//Funciones
//****************************************
const consultarEstudiantes = async () => {
  // usamos el cliente de Supabase para hacer una consulta a la tabla "estudiantes"
  // json: { "data": [], "error": null }
  const search = txtSearch.value.trim() || ""; // si el valor es vacío, se asigna una cadena vacía
  const query = supabase.from("estudiantes").select("id,nombre,apellido,correo,carrera,fechaNac");

  // filtros
  if (search.length > 0) {
    // query.ilike("nombre", `%${search}%`);
    query.or(`nombre.ilike.%${search}%,apellido.ilike.%${search}%`);
  }
  const { data, error } = await query;

  if (error) {
    console.error(error);
    Swal.fire({ icon: "error", title: "Error cargando estudiantes", text: error.message });
    return;
  }

  // Limpiando y llenando la tabla con los datos obtenidos
  tbody.innerHTML = "";

  // data es un arreglo de objetos, cada objeto representa un estudiante
  data.forEach((r) => {
    const tr = document.createElement("tr"); //<tr></tr>
    tr.setAttribute("data-id", r.id);
    //<td>${r.id ?? ""}</td>
    tr.innerHTML = `
        <td>${r.nombre ?? ""}</td>
        <td>${r.apellido ?? ""}</td>
        <td>${r.correo ?? ""}</td>
        <td>${r.carrera ?? ""}</td>
        <td>${formatearFecha(r.fechaNac)}</td>
        <td>
          <button class="btnEditar" data-id="${r.id}">Editar</button>
          <button class="btnEliminar" data-id="${r.id}">Eliminar</button>
        </td>
      `;

    tbody.appendChild(tr);
  });
};

const guardarEstudiante = async () => {
  const estudiante = {
    nombre: txtNombre.value.trim(),
    apellido: txtApellido.value.trim(),
    correo: txtCorreo.value.trim(),
    carrera: txtCarrera.value.trim(),
    fechaNac: txtFechaNac.value || null,
  };

  if (!estudiante.nombre || !estudiante.apellido || !estudiante.correo || !estudiante.carrera || !estudiante.fechaNac) {
    Swal.fire({ icon: "warning", title: "Campos incompletos", text: "Por favor, complete todos los campos" });
    return;
  }

  if (txtId.value) {
    // Actualizar estudiante existente
    const { error } = await supabase.from("estudiantes").update(estudiante).eq("id", txtId.value);

    if (error) {
      console.error(error);
      Swal.fire({ icon: "error", title: "Error actualizando estudiante", text: error.message });
      return;
    }
  } else {
    // Agregar nuevo estudiante
    const { error } = await supabase.from("estudiantes").insert([estudiante]);

    if (error) {
      console.error(error);
      Swal.fire({ icon: "error", title: "Error guardando estudiante", text: error.message });
      return;
    }
  }

  Swal.fire({
    icon: "success",
    title: "¡Listo!",
    text: txtId.value ? "Estudiante actualizado exitosamente" : "Estudiante guardado exitosamente",
    timer: 2000,
    showConfirmButton: false,
  });
  limpiarFormulario();
  consultarEstudiantes();
};

const eliminarEstudiante = async (id) => {
  const confirmacion = await Swal.fire({
    icon: "question",
    title: "¿Eliminar estudiante?",
    text: "Esta acción no se puede deshacer",
    showCancelButton: true,
    confirmButtonText: "Sí, eliminar",
    cancelButtonText: "Cancelar",
    confirmButtonColor: "#EB6763",
  });
  if (!confirmacion.isConfirmed) return;

  const { error } = await supabase.from("estudiantes").delete().eq("id", id);

  if (error) {
    console.error(error);
    Swal.fire({ icon: "error", title: "Error al eliminar", text: error.message });
  } else {
    Swal.fire({ icon: "success", title: "Estudiante eliminado", timer: 1500, showConfirmButton: false });
    consultarEstudiantes();
  }
};

// CRUD: Create, Read, Update, Delete

const limpiarFormulario = () => {
  txtId.value = "";
  txtNombre.value = "";
  txtApellido.value = "";
  txtCorreo.value = "";
  txtCarrera.value = "";
  txtFechaNac.value = "";
  btnAdd.textContent = "Agregar";
  tituloForm.textContent = "Agregar Estudiantes";
};

/*
Tarea
Publicar el proyecto en git con la supabase conectada
1.Completar el campo de fecha de nacimiento en el formulario y mostrarlo en la tabla
2.Agregar en base de datos el campo fechaNac y actualizar el código para guardar y mostrar esta información
2.Usar SweetAlert2 para mostrar mensajes de confirmación y error
*/