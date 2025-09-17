import API from "../api/api";

export default function TaskList({ tasks, setTasks }) {

  const actualizarEstado = async (id, nuevoEstado) => {
    try {
      const res = await API.put(`/tareas/${id}`, { estado: nuevoEstado });
      setTasks((prev) => prev.map((t) => (t._id === id ? res.data : t)));
    } catch (err) {
      console.error(err);
      alert("Error al actualizar el estado");
    }
  };

  const eliminarTarea = async (id) => {
    if (!window.confirm("¿Eliminar esta tarea?")) return;
    try {
      await API.delete(`/tareas/${id}`);
      setTasks((prev) => prev.filter((t) => t._id !== id));
    } catch (err) {
      console.error(err);
      alert("Error al eliminar tarea");
    }
  };

  return (
    <ul>
      {tasks.map((t) => (
        <li key={t._id}>
          <strong>{t.titulo}</strong> [{t.prioridad}] - {t.estado}
          <button onClick={() => actualizarEstado(t._id, "pendiente")}>Pendiente</button>
          <button onClick={() => actualizarEstado(t._id, "en progreso")}>En progreso</button>
          <button onClick={() => actualizarEstado(t._id, "completada")}>Completada</button>
          <button onClick={() => eliminarTarea(t._id)}>Eliminar</button>
        </li>
      ))}
    </ul>
  );
}
