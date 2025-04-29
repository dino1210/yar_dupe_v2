const express = require("express");
const router = express.Router();
const {
  addConsumable,
  deleteConsumable,
  updateConsumable,
  getAllConsumables,
  getConsumableById,
} = require("../controllers/consumablesController");
const upload = require("../middleware/uploadConsumable");
const db = require("../config/db");

// ✅ Upload Image for consumable
router.post("/", upload.single("picture"), addConsumable);

// ✅ Update Consumable
router.put("/:id", upload.single("picture"), updateConsumable);

// ✅ Delete consumable
router.delete("/:id", deleteConsumable);

// ✅ Select only consumables with quantity > 0 (for Add Project Modal)
router.get("/select/all", async (req, res) => {
  try {
    const [rows] = await db.query('SELECT name FROM consumables WHERE quantity > 0');
    res.json(rows); // <-- FIXED
  } catch (err) {
    console.error("Error fetching available consumables:", err);
    res.status(500).send("Server error");
  }
});

// ✅ Select consumables with status = Available (optional kung needed mo rin)
router.get("/select/available", async (req, res) => {
  try {
    const [rows] = await db.query('SELECT name FROM consumables WHERE status = "Available"');
    res.json(rows);
  } catch (err) {
    console.error("Error fetching available consumables:", err.message);
    res.status(500).json({ error: "Server error" });
  }
});

// ✅ Get ALL consumables (for full Resource Table)
router.get("/", async (req, res) => {
  try {
    const [rows] = await db.query("SELECT * FROM consumables");
    res.json({ consumables: rows }); // <-- dito lang nakabalot
  } catch (err) {
    console.error("Error fetching all consumables:", err.message);
    res.status(500).json({ error: "Server error" });
  }
});

// ✅ Get single consumable by ID
router.get("/:id", getConsumableById);

module.exports = router;
