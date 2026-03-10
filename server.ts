import express from "express";
import { createServer as createViteServer } from "vite";
import mysql from "mysql2/promise";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // Database Connection Pool
  // We use a pool for better performance and automatic reconnection
  const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: parseInt(process.env.DB_PORT || "3306"),
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
  });

  // Test Database Connection
  try {
    const connection = await pool.getConnection();
    console.log("✅ Connected to MySQL database successfully");
    connection.release();
  } catch (error) {
    console.error("❌ Database connection failed:", error);
    console.log("⚠️  Please ensure your DB_HOST, DB_USER, DB_PASSWORD, and DB_NAME are correctly set in the Secrets panel.");
  }

  // API Routes
  
  // Example: Get all leads
  app.get("/api/leads", async (req, res) => {
    try {
      const [rows] = await pool.query("SELECT * FROM leads ORDER BY created_at DESC");
      res.json(rows);
    } catch (error) {
      console.error("Error fetching leads:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  });

  // Example: Add a new lead
  app.post("/api/leads", async (req, res) => {
    const { name, email, phone, service, value } = req.body;
    try {
      const [result] = await pool.query(
        "INSERT INTO leads (id, name, email, phone, service, value, status) VALUES (UUID(), ?, ?, ?, ?, ?, 'New')",
        [name, email, phone, service, value]
      );
      res.status(201).json({ message: "Lead created successfully", id: (result as any).insertId });
    } catch (error) {
      console.error("Error creating lead:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  });

  // Health check
  app.get("/api/health", (req, res) => {
    res.json({ status: "ok", database: "connected" });
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    // Serve static files in production
    app.use(express.static(path.join(__dirname, "dist")));
    app.get("*", (req, res) => {
      res.sendFile(path.join(__dirname, "dist", "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
  });
}

startServer().catch((err) => {
  console.error("Failed to start server:", err);
});
