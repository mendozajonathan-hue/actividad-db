import pkg from "pg";
const { Pool } = pkg;
import dotenv from "dotenv";

// 🔹 Cargar variables de entorno desde .env (solo en local)
dotenv.config();

// 🔹 Crear conexión con Postgres (Render + local)
const pool = new Pool({
  connectionString: process.env.DATABASE_URL, // Render te da esta variable
  ssl: process.env.NODE_ENV === "production" ? { rejectUnauthorized: false } : false
});

// 🔹 Crear tabla si no existe
(async () => {
  try {
    await pool.query(`
      CREATE TABLE IF NOT EXISTS tasks (
        id SERIAL PRIMARY KEY,
        title TEXT NOT NULL,
        completed BOOLEAN DEFAULT false
      )
    `);
    console.log("✅ Tabla 'tasks' lista");
  } catch (err) {
    console.error("❌ Error creando tabla:", err);
  }
})();

export default pool;
