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

//  Upload Image for vehicle
router.post("/", upload.single("picture"), addVehicle);
router.put("/:id", upload.single("picture"), updateVehicle);

//  Delete vehicle
router.delete("/:id", deleteVehicle);

//  Select only available vehicles (for Add Project Modal)

router.get("/select/all", async (req, res) => {
  try {
    const [rows] = await db.query('SELECT name FROM vehicles WHERE status = "Available"');
    res.json(rows);
  } catch (err) {
    console.error("Error fetching available vehicles:", err);
    res.status(500).send("Server error");
  }
});


//  Get all vehicles and vehicle by id
router.get("/", getAllVehicles);
router.get("/:id", getVehicleById);

module.exports = router;
