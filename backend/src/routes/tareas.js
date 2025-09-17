const express = require("express");
const router = express.Router();
const tareasController = require("../controllers/tareasController");
const auth = require("../middleware/authMiddleware");

router.get("/", auth, tareasController.obtenerTareas);
router.post("/", auth, tareasController.crearTarea);
router.put("/:id", auth, tareasController.actualizarTarea);
router.delete("/:id", auth, tareasController.eliminarTarea);

module.exports = router;
