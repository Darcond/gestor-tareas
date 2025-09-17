import { useState, useEffect } from "react";
import TaskForm from "../components/TaskForm";
import TaskList from "../components/TaskList";
import LogoutButton from "../components/LogoutButton";
import API from "../api/api";
import "../styles/TasksPage.css";

export default function TasksPage({ setIsLoggedIn }) {
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

  useEffect(() => { fetchTasks(); }, [filtroEstado, filtroPrioridad]);

  const handleTaskAdded = (nuevaTarea) => setTasks((prev) => [...prev, nuevaTarea]);
  const handleLogout = () => { localStorage.removeItem("token"); setIsLoggedIn(false); };

  return (
    <div>
      <header className="tasks-header">
        <LogoutButton onLogout={handleLogout} />
        <h2>Mis Tareas</h2>
      </header>

      <div className="filters">
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
      </div>

      <TaskForm onTaskAdded={handleTaskAdded} />
      <TaskList tasks={tasks} setTasks={setTasks} />
    </div>
  );
}
