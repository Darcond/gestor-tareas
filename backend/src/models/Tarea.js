const mongoose = require("mongoose");

const TareaSchema = new mongoose.Schema({
    titulo: { type: String, required: true, trim: true },
    descripcion: { type: String, trim: true },
    prioridad: { type: String, enum: ["baja", "media", "alta"], default: "media" },
    estado: { type: String, enum: ["pendiente", "en progreso", "completada"], default: "pendiente" },
    creador: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }
}, { timestamps: true });

module.exports = mongoose.model("Tarea", TareaSchema);
