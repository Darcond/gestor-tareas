import { useState } from "react";
import API from "../api/api";

export default function TaskForm({ onTaskAdded }) {
  const [titulo, setTitulo] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [prioridad, setPrioridad] = useState("media");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!titulo.trim()) return alert("El título es obligatorio");

    try {
      const res = await API.post("/tareas", { titulo, descripcion, prioridad });
      onTaskAdded(res.data);
      setTitulo("");
      setDescripcion("");
      setPrioridad("media");
    } catch (err) {
      console.error(err);
      alert("Error al crear tarea");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Título"
        value={titulo}
        onChange={(e) => setTitulo(e.target.value)}
        required
      />
      <input
        type="text"
        placeholder="Descripción"
        value={descripcion}
        onChange={(e) => setDescripcion(e.target.value)}
      />
      <select value={prioridad} onChange={(e) => setPrioridad(e.target.value)}>
        <option value="baja">Baja</option>
        <option value="media">Media</option>
        <option value="alta">Alta</option>
      </select>
      <button type="submit">Agregar Tarea</button>
    </form>
  );
}
