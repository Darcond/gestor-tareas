import API from "../api/api";
import "../styles/TaskList.css"; // Asegúrate de que la ruta sea correcta

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
        <div>
            <h3>Lista de Tareas</h3>
            <table className="task-table">
                <thead>
                    <tr>
                        <th>Título</th>
                        <th>Descripción</th>
                        <th>Prioridad</th>
                        <th>Estado</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {tasks.map((t) => (
                        <tr key={t._id}>
                            <td>{t.titulo}</td>
                            <td>{t.descripcion}</td>
                            <td>{t.prioridad}</td>
                            <td>{t.estado}</td>
                            <td>
                                <button className="pendiente" onClick={() => actualizarEstado(t._id, "pendiente")}>Pendiente</button>
                                <button className="en-progreso" onClick={() => actualizarEstado(t._id, "en progreso")}>En progreso</button>
                                <button className="completada" onClick={() => actualizarEstado(t._id, "completada")}>Completada</button>
                                <button className="eliminar" onClick={() => eliminarTarea(t._id)}>Eliminar</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
