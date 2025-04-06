const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const db = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const toolsRoutes = require("./routes/toolsRoutes");
const consumablesRoutes = require("./routes/consumablesRoutes");
const vehiclesRoutes = require("./routes/vehiclesRoutes")
const path = require("path");

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

// Routes
app.use("/auth", authRoutes);
app.use("/api", userRoutes);
app.use("/api/tools/", toolsRoutes);
app.use("/api/consumables/", consumablesRoutes)
app.use("/api/user", userRoutes);
app.use("/api/vehicles", vehiclesRoutes);


app.use("/assets", express.static(path.join(__dirname, "public/assets")));

const PORT = process.env.PORT;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
