import { useState } from "react";
import API from "../api/api";
import "../styles/TaskList.css";

export default function TaskList({ tasks, setTasks }) {
    const [editingTaskId, setEditingTaskId] = useState(null);
    const [formValues, setFormValues] = useState({ titulo: "", descripcion: "", prioridad: "", estado: "" });
    const [errors, setErrors] = useState({ titulo: "" });

    const startEdit = (task) => {
        setEditingTaskId(task._id);
        setFormValues({
            titulo: task.titulo,
            descripcion: task.descripcion,
            prioridad: task.prioridad,
            estado: task.estado,
        });
        setErrors({ titulo: "" });
    };

    const cancelEdit = () => {
        setEditingTaskId(null);
        setFormValues({ titulo: "", descripcion: "", prioridad: "", estado: "" });
        setErrors({ titulo: "" });
    };

    const handleTituloChange = (value) => {
        setFormValues((prev) => ({ ...prev, titulo: value }));
        if (!value.trim() || value.trim().length < 3) {
            setErrors({ titulo: "El título debe tener al menos 3 caracteres" });
        } else {
            setErrors({ titulo: "" });
        }
    };

    const saveEdit = async (taskId) => {
        if (errors.titulo) return; // No permitir guardar si hay error
        try {
            const res = await API.put(`/tareas/${taskId}`, formValues);
            setTasks((prev) => prev.map((t) => (t._id === taskId ? res.data : t)));
            cancelEdit();
        } catch (err) {
            console.error(err);
            alert("Error al actualizar la tarea");
        }
    };

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
                            {editingTaskId === t._id ? (
                                <>
                                    <td>
                                        <input
                                            value={formValues.titulo}
                                            onChange={(e) => handleTituloChange(e.target.value)}
                                        />
                                        {errors.titulo && <small style={{ color: "red" }}>{errors.titulo}</small>}
                                    </td>
                                    <td>
                                        <input
                                            value={formValues.descripcion}
                                            onChange={(e) => setFormValues({ ...formValues, descripcion: e.target.value })}
                                        />
                                    </td>
                                    <td>
                                        <select
                                            value={formValues.prioridad}
                                            onChange={(e) => setFormValues({ ...formValues, prioridad: e.target.value })}
                                        >
                                            <option value="baja">Baja</option>
                                            <option value="media">Media</option>
                                            <option value="alta">Alta</option>
                                        </select>
                                    </td>
                                    <td>
                                        <select
                                            value={formValues.estado}
                                            onChange={(e) => setFormValues({ ...formValues, estado: e.target.value })}
                                        >
                                            <option value="pendiente">Pendiente</option>
                                            <option value="en progreso">En progreso</option>
                                            <option value="completada">Completada</option>
                                        </select>
                                    </td>
                                    <td>
                                        <button onClick={() => saveEdit(t._id)} disabled={!!errors.titulo}>
                                            Guardar
                                        </button>
                                        <button onClick={cancelEdit}>Cancelar</button>
                                    </td>
                                </>
                            ) : (
                                <>
                                    <td>{t.titulo}</td>
                                    <td>{t.descripcion}</td>
                                    <td>{t.prioridad}</td>
                                    <td>{t.estado}</td>
                                    <td>
                                        <button className="pendiente" onClick={() => actualizarEstado(t._id, "pendiente")}>
                                            Pendiente
                                        </button>
                                        <button className="en-progreso" onClick={() => actualizarEstado(t._id, "en progreso")}>
                                            En progreso
                                        </button>
                                        <button className="completada" onClick={() => actualizarEstado(t._id, "completada")}>
                                            Completada
                                        </button>
                                        <button className="eliminar" onClick={() => eliminarTarea(t._id)}>
                                            Eliminar
                                        </button>
                                        <button className="editar" onClick={() => startEdit(t)}>
                                            Editar
                                        </button>
                                    </td>
                                </>
                            )}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
