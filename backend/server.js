const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const path = require("path");

const db = require("./config/db");

// Route Imports
const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const toolsRoutes = require("./routes/toolsRoutes");
const consumablesRoutes = require("./routes/consumablesRoutes");
const vehiclesRoutes = require("./routes/vehiclesRoutes");
const categoriesRoutes = require("./routes/categoriesRoutes");
const consumablesLogsRoutes = require("./routes/consumablesLogsRoutes");
const projectsRoutes = require("./routes/projectsRoutes"); // ✅ PROJECTS

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

// Static Files
app.use("/assets", express.static(path.join(__dirname, "public/assets")));

// Auth Routes
app.use("/auth", authRoutes);
app.use("/api", userRoutes);
app.use("/api/user", userRoutes);

// Resources
app.use("/api/tools", toolsRoutes);
app.use("/api/consumables", consumablesRoutes);
app.use("/api/vehicles", vehiclesRoutes);

// Categories
app.use("/api/categories", categoriesRoutes);

// Logs
app.use("/api/consumables-logs", consumablesLogsRoutes);

// ✅ Projects Route
app.use("/api/projects", projectsRoutes);

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, "0.0.0.0", () => console.log(`Server running on port ${PORT}`));
