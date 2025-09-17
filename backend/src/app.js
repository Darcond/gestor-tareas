/**
 * app.js
 * Configuración principal de la aplicación Express
 * - Middlewares
 * - Rutas
 */

const express = require("express");
const cors = require("cors");

const authRoutes = require("./routes/auth");
const tareasRoutes = require("./routes/tareas"); // Importar rutas de tareas

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Rutas
app.use("/api/auth", authRoutes);
app.use("/api/tareas", tareasRoutes); // Usar rutas de tareas

module.exports = app;
