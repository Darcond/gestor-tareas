/**
 * server.js
 * Punto de entrada de la aplicación
 * - Conecta a MongoDB usando config/db.js
 * - Inicializa el servidor Express
 */

const app = require("./src/app");
const connectDB = require("./src/config/db");

const PORT = process.env.PORT || 4000;

// Conexión a MongoDB y arranque del servidor
connectDB().then(() => {
  app.listen(PORT, () => console.log(`🚀 Servidor corriendo en puerto ${PORT}`));
});
