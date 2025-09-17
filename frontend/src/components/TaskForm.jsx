import { useState } from "react";
import API from "../api/api";

export default function TaskForm({ onTaskAdded }) {
  const [titulo, setTitulo] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [prioridad, setPrioridad] = useState("media");
  const [error, setError] = useState("");

  // Validación en tiempo real del título
  const handleTituloChange = (e) => {
    const value = e.target.value;
    setTitulo(value);

    if (value.trim().length < 3) {
      setError("El título debe tener al menos 3 caracteres");
    } else {
      setError("");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (error) return; // no enviar si hay error
    try {
      const res = await API.post("/tareas", { titulo, descripcion, prioridad });
      onTaskAdded(res.data);
      setTitulo("");
      setDescripcion("");
      setPrioridad("media");
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.msg || "Error al crear tarea");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3>Agregar Tarea</h3>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <input
        type="text"
        placeholder="Título"
        value={titulo}
        onChange={handleTituloChange}
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
      <button type="submit">Agregar</button>
    </form>
  );
}
