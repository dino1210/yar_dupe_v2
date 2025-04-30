const express = require("express");
const router = express.Router();
const {
  addVehicle,
  deleteVehicle,
  updateVehicle,
  getAllVehicles,
  getVehicleById,
} = require("../controllers/vehiclesController");
const upload = require("../middleware/uploadVehicle");
const db = require("../config/db");

// ✅ Upload Image and Add Vehicle
router.post("/", upload.single("picture"), addVehicle);

// ✅ Update Vehicle Info
router.put("/:id", upload.single("picture"), updateVehicle);
 
// ✅ Delete Vehicle
router.delete("/:id", deleteVehicle);

// ✅ Select Available Vehicles only (for Add Project Modal)
router.get("/select/all", async (req, res) => {
  try {
    const [rows] = await db.query(
      'SELECT name FROM vehicles WHERE status = "Available"'
    );
    res.json(rows);
  } catch (err) {
    console.error("Error fetching available vehicles:", err.message);
    res.status(500).json({ error: "Server error" });
  }
});

// ✅ Get All Vehicles (Full List)
router.get("/", async (req, res) => {
  try {
    const [rows] = await db.query("SELECT * FROM vehicles");
    res.json({ vehicles: rows }); // <-- IMPORTANT: wrap into { vehicles: [...] }
  } catch (err) {
    console.error("Error fetching vehicles:", err.message);
    res.status(500).json({ error: "Server error" });
  }
});

// ✅ Get Single Vehicle by ID
router.get("/:id", getVehicleById);

module.exports = router;