import { useState, useEffect } from "react";
import API from "../api/api";

export default function TaskList() {
  const [tasks, setTasks] = useState([]);
  const [filtroEstado, setFiltroEstado] = useState("");
  const [filtroPrioridad, setFiltroPrioridad] = useState("");
  const [editTaskId, setEditTaskId] = useState(null);
  const [editTitulo, setEditTitulo] = useState("");
  const [editDescripcion, setEditDescripcion] = useState("");
  const [editPrioridad, setEditPrioridad] = useState("");
  const [tituloValido, setTituloValido] = useState(true); // validación en tiempo real

  const fetchTasks = async () => {
    try {
      const res = await API.get("/tareas", { params: { estado: filtroEstado, prioridad: filtroPrioridad } });
      setTasks(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => { fetchTasks(); }, [filtroEstado, filtroPrioridad]);

  const eliminarTarea = async (id) => {
    if (!window.confirm("¿Eliminar esta tarea?")) return;
    try {
      await API.delete(`/tareas/${id}`);
      fetchTasks();
    } catch (err) { console.error(err); }
  };

  const actualizarEstado = async (id, nuevoEstado) => {
    try {
      await API.put(`/tareas/${id}`, { estado: nuevoEstado });
      fetchTasks();
    } catch (err) { console.error(err); }
  };

  const iniciarEdicion = (task) => {
    setEditTaskId(task._id);
    setEditTitulo(task.titulo);
    setEditDescripcion(task.descripcion);
    setEditPrioridad(task.prioridad);
    setTituloValido(true);
  };

  const guardarEdicion = async (id) => {
    if (!tituloValido) return;
    try {
      await API.put(`/tareas/${id}`, {
        titulo: editTitulo,
        descripcion: editDescripcion,
        prioridad: editPrioridad,
      });
      setEditTaskId(null);
      fetchTasks();
    } catch (err) {
      console.error(err);
      alert("Error al actualizar tarea");
    }
  };

  const cancelarEdicion = () => {
    setEditTaskId(null);
  };

  const validarTitulo = (titulo) => {
    // Ejemplo: no vacío y máximo 100 caracteres
    const valido = titulo.trim().length >= 3 && titulo.length <= 100;
    setTituloValido(valido);
  };

  return (
    <div>
      <h2>Tareas</h2>

      <label>Filtrar por estado:</label>
      <select onChange={e => setFiltroEstado(e.target.value)}>
        <option value="">Todos</option>
        <option value="pendiente">Pendiente</option>
        <option value="en progreso">En progreso</option>
        <option value="completada">Completada</option>
      </select>

      <label>Filtrar por prioridad:</label>
      <select onChange={e => setFiltroPrioridad(e.target.value)}>
        <option value="">Todos</option>
        <option value="baja">Baja</option>
        <option value="media">Media</option>
        <option value="alta">Alta</option>
      </select>

      <ul>
        {tasks.map(t => (
          <li key={t._id}>
            {editTaskId === t._id ? (
              <>
                <input
                  value={editTitulo}
                  onChange={e => {
                    setEditTitulo(e.target.value);
                    validarTitulo(e.target.value);
                  }}
                  placeholder="Título"
                />
                {!tituloValido && <span style={{color:"red"}}>Debe contener al menos 3 caracteres</span>}
                <input
                  value={editDescripcion}
                  onChange={e => setEditDescripcion(e.target.value)}
                  placeholder="Descripción"
                />
                <select value={editPrioridad} onChange={e => setEditPrioridad(e.target.value)}>
                  <option value="baja">Baja</option>
                  <option value="media">Media</option>
                  <option value="alta">Alta</option>
                </select>
                <button onClick={() => guardarEdicion(t._id)} disabled={!tituloValido}>Guardar</button>
                <button onClick={cancelarEdicion}>Cancelar</button>
              </>
            ) : (
              <>
                <strong>{t.titulo}</strong> [{t.prioridad}] - {t.estado}
                <button onClick={() => actualizarEstado(t._id, "pendiente")}>Pendiente</button>
                <button onClick={() => actualizarEstado(t._id, "en progreso")}>En progreso</button>
                <button onClick={() => actualizarEstado(t._id, "completada")}>Completada</button>
                <button onClick={() => iniciarEdicion(t)}>Editar</button>
                <button onClick={() => eliminarTarea(t._id)}>Eliminar</button>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
