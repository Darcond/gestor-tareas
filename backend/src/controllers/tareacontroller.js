const Tarea = require("../models/Tarea");

// Crear tarea
exports.crearTarea = async (req, res) => {
    const { titulo, descripcion, prioridad, estado } = req.body;

    if (!titulo || titulo.trim() === "") {
        return res.status(400).json({ msg: "El título es obligatorio" });
    }

    try {
        const tarea = new Tarea({
            titulo,
            descripcion,
            prioridad,
            estado,
            creador: req.usuario.usuarioId // <--- usar ID del token
        });
        await tarea.save();
        res.status(201).json(tarea);
    } catch (err) {
        res.status(500).json({ msg: err.message });
    }
};

// Obtener tareas del usuario
exports.obtenerTareas = async (req, res) => {
    const { estado, prioridad } = req.query;
    const filtros = { creador: req.usuario.usuarioId };
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
            { _id: req.params.id, creador: req.usuario.usuarioId },
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
        const tarea = await Tarea.findOneAndDelete({
            _id: req.params.id,
            creador: req.usuario.usuarioId,
        });
        if (!tarea) return res.status(404).json({ msg: "Tarea no encontrada" });
        res.json({ msg: "Tarea eliminada" });
    } catch (err) {
        res.status(500).json({ msg: err.message });
    }
};
