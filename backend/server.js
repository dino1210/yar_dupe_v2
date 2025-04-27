const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const db = require("./config/db");

const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");

const toolsRoutes = require("./routes/toolsRoutes");
const consumablesRoutes = require("./routes/consumablesRoutes");
const vehiclesRoutes = require("./routes/vehiclesRoutes");

const categoriesRoutes = require("./routes/categoriesRoutes");

const consumablesLogsRoutes = require("./routes/consumablesLogsRoutes");

const metricsRoutes = require("./routes/metricsRoutes");

const projectsRoutes = require("./routes/projectsRoutes");

//reports
const reportConsumablesRoutes = require("./routes/reportConsumable_Route");
const reportToolsRoutes = require("./routes/reportTools_Route");
const reportVehiclesRoutes = require("./routes/reportVehicles_Route");

const path = require("path");

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

// Auth
app.use("/auth", authRoutes);
app.use("/api", userRoutes);

app.use("/api/users", userRoutes);

// Resources
app.use("/api/tools", toolsRoutes);
app.use("/api/consumables", consumablesRoutes);
app.use("/api/vehicles", vehiclesRoutes);

app.use("/api/user", userRoutes);

// Category
app.use("/api/categories", categoriesRoutes);

// Logs
app.use("/api/consumables-logs", consumablesLogsRoutes);

// Metrics
app.use("/api/metrics", metricsRoutes);

app.use("/api/projects", projectsRoutes);

// Reports
app.use("/api/report-consumables", reportConsumablesRoutes);
app.use("/api/report-tools", reportToolsRoutes);
app.use("/api/reports", reportVehiclesRoutes);

app.use("/assets", express.static(path.join(__dirname, "public/assets")));

const PORT = process.env.PORT;
app.listen(PORT, "0.0.0.0", () =>
  console.log(`Server running on port ${PORT}`)
);
