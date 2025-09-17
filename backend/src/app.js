const express = require("express");
const cors = require("cors");
require("dotenv").config();
require("./config/db"); // Conexión a MongoDB
const authRoutes = require("./routes/auth");
const tareasRoutes = require("./routes/tareas");

const app = express();
app.use(cors());
app.use(express.json());

app.use("/auth", authRoutes);
app.use("/tareas", tareasRoutes);

module.exports = app;
