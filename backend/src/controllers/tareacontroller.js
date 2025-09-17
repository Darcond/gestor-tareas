const Tarea = require("../models/Tarea");

// Crear tarea
exports.crearTarea = async (req, res) => {
  const { titulo, descripcion, prioridad, estado } = req.body;

  // Validación del título
  if (!titulo || titulo.trim() === "") {
    return res.status(400).json({ msg: "El título es obligatorio" });
  }

  try {
    const tarea = new Tarea({
      titulo,
      descripcion,
      prioridad,
      estado,
      creador: req.usuario.id // asegúrate de usar el ID correcto
    });

    await tarea.save();
    res.status(201).json(tarea);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Error al crear la tarea" });
  }
};

// Obtener tareas (con filtros opcionales)
exports.obtenerTareas = async (req, res) => {
  const { estado, prioridad } = req.query;
  const filtros = { creador: req.usuario.id };
  if (estado) filtros.estado = estado;
  if (prioridad) filtros.prioridad = prioridad;

  try {
    const tareas = await Tarea.find(filtros);
    res.json(tareas);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

// Actualizar tarea
exports.actualizarTarea = async (req, res) => {
  try {
    const tarea = await Tarea.findOneAndUpdate(
      { _id: req.params.id, creador: req.usuario.id },
      req.body,
      { new: true }
    );
    if (!tarea) return res.status(404).json({ msg: "Tarea no encontrada" });
    res.json(tarea);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

// Eliminar tarea
exports.eliminarTarea = async (req, res) => {
  try {
    const tarea = await Tarea.findOneAndDelete({ _id: req.params.id, creador: req.usuario.id });
    if (!tarea) return res.status(404).json({ msg: "Tarea no encontrada" });
    res.json({ msg: "Tarea eliminada" });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};
