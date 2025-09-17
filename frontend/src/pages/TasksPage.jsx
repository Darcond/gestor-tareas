import { useState, useEffect } from "react";
import TaskForm from "../components/TaskForm";
import TaskList from "../components/TaskList";
import API from "../api/api";

export default function TasksPage() {
  const [tasks, setTasks] = useState([]);
  const [filtroEstado, setFiltroEstado] = useState("");
  const [filtroPrioridad, setFiltroPrioridad] = useState("");

  const fetchTasks = async () => {
    try {
      const res = await API.get("/tareas", {
        params: { estado: filtroEstado, prioridad: filtroPrioridad },
      });
      setTasks(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, [filtroEstado, filtroPrioridad]);

  const handleTaskAdded = (nuevaTarea) => {
    setTasks((prev) => [...prev, nuevaTarea]);
  };

  return (
    <div>
      <h2>Mis Tareas</h2>

      <label>Filtrar por estado:</label>
      <select value={filtroEstado} onChange={(e) => setFiltroEstado(e.target.value)}>
        <option value="">Todos</option>
        <option value="pendiente">Pendiente</option>
        <option value="en progreso">En progreso</option>
        <option value="completada">Completada</option>
      </select>

      <label>Filtrar por prioridad:</label>
      <select value={filtroPrioridad} onChange={(e) => setFiltroPrioridad(e.target.value)}>
        <option value="">Todos</option>
        <option value="baja">Baja</option>
        <option value="media">Media</option>
        <option value="alta">Alta</option>
      </select>

      <TaskForm onTaskAdded={handleTaskAdded} />
      <TaskList tasks={tasks} setTasks={setTasks} />
    </div>
  );
}
