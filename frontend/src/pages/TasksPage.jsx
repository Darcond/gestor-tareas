import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import TaskForm from "../components/TaskForm";
import TaskList from "../components/TaskList";
import "../styles/TasksPage.css";

export default function TasksPage({ setIsLoggedIn }) {
  const navigate = useNavigate();
  const [tasks, setTasks] = useState([]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    navigate("/login");
  };

  const handleTaskAdded = (newTask) => {
    setTasks(prev => [...prev, newTask]); // agrega tarea sin recargar
  };

  return (
    <div className="tasks-container">
      <div className="tasks-header">
        <h2>Página de Tareas</h2>
        <button className="logout-button" onClick={handleLogout}>
          Cerrar Sesión
        </button>
      </div>

      <TaskForm onTaskAdded={handleTaskAdded} />
      <TaskList tasks={tasks} setTasks={setTasks} />
    </div>
  );
}
