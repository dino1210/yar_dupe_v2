// server.js
const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const path = require("path");

// Load environment variables
dotenv.config();

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

//  Route Imports
const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const toolsRoutes = require("./routes/toolsRoutes");
const consumablesRoutes = require("./routes/consumablesRoutes");
const vehiclesRoutes = require("./routes/vehiclesRoutes");
const categoriesRoutes = require("./routes/categoriesRoutes");
const consumablesLogsRoutes = require("./routes/consumablesLogsRoutes");
const vehiclesLogsRoutes = require("./routes/vehiclesLogsRoutes"); // 
const metricsRoutes = require("./routes/metricsRoutes");
const projectsRoutes = require("./routes/projectsRoutes");

//  Reports
const reportConsumablesRoutes = require("./routes/reportConsumable_Route");
const reportToolsRoutes = require("./routes/reportTools_Route");
const reportVehiclesRoutes = require("./routes/reportVehicles_Route");

//  Static public folder (uploads, images, etc.)
app.use("/assets", express.static(path.join(__dirname, "public/assets")));

//  API ROUTES

// Authentication
app.use("/auth", authRoutes);

// User Management
app.use("/api/users", userRoutes);

app.use("/api/projects", require("./routes/projectsRoutes"));


// Resource Management
app.use("/api/tools", toolsRoutes);
app.use("/api/consumables", consumablesRoutes);
app.use("/api/vehicles", vehiclesRoutes);

// Categories and Logs
app.use("/api/categories", categoriesRoutes);
app.use("/api/consumables-logs", consumablesLogsRoutes);
app.use("/api/vehicles-logs", vehiclesLogsRoutes); // 

// Projects and Dashboard
app.use("/api/projects", projectsRoutes);
app.use("/api/metrics", metricsRoutes);

// Reports
app.use("/api/report-consumables", reportConsumablesRoutes);
app.use("/api/report-tools", reportToolsRoutes);
app.use("/api/report-vehicles", reportVehiclesRoutes);

//  Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, "0.0.0.0", () =>
  console.log(` Server running on port ${PORT}`)
);
