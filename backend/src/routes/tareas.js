const express = require("express");
const router = express.Router();
const auth = require("../middleware/authMiddleware");
const { crearTarea, obtenerTareas, actualizarTarea, eliminarTarea } = require("../controllers/tareacontroller");

// CRUD protegido por JWT
router.post("/", auth, crearTarea);
router.get("/", auth, obtenerTareas);
router.put("/:id", auth, actualizarTarea);
router.delete("/:id", auth, eliminarTarea);

module.exports = router;
