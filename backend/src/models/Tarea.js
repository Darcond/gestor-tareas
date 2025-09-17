const mongoose = require("mongoose");

const TareaSchema = new mongoose.Schema({
  titulo: {
    type: String,
    required: [true, "El título es obligatorio"],
    trim: true,
    minlength: [3, "El título debe tener al menos 3 caracteres"],
    maxlength: [100, "El título no puede superar 100 caracteres"]
  },
  descripcion: {
    type: String,
    trim: true,
    maxlength: [500, "La descripción no puede superar 500 caracteres"]
  },
  prioridad: {
    type: String,
    enum: {
      values: ["baja", "media", "alta"],
      message: "Prioridad inválida"
    },
    default: "media"
  },
  estado: {
    type: String,
    enum: {
      values: ["pendiente", "en progreso", "completada"],
      message: "Estado inválido"
    },
    default: "pendiente"
  },
  creador: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Usuario",
    required: [true, "El creador es obligatorio"]
  }
}, { timestamps: true });

module.exports = mongoose.model("Tarea", TareaSchema);
