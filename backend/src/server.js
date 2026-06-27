require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { swaggerUi, specs } = require("./config/swagger");
const authRoutes = require("./routes/auth.routes");
const pool = require("./config/db");

const app = express();

/* ─── Middlewares globales ─── */
app.use(cors());
app.use(express.json());

/* ─── Documentación Swagger ─── */
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));

/* ─── Rutas ─── */
app.use("/api/auth", authRoutes);

/* ─── Inicio del servidor ─── */
const PORT = process.env.PORT || 3001;

app.listen(PORT, async () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
  console.log(`Documentación en   http://localhost:${PORT}/api-docs`);

  try {
    await pool.query("SELECT NOW()");
    console.log("Base de datos conectada correctamente");
  } catch (error) {
    console.error("Error conectando a la base de datos:", error.message);
  }
});
