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

// Upload Image for consumable
router.post("/", upload.single("picture"), addConsumable);
router.put("/:id", upload.single("picture"), updateConsumable);

// Delete consumable
router.delete("/:id", deleteConsumable);

//  Select only available consumables (for Add Project Modal)
router.get("/select/all", async (req, res) => {
  try {
    const [rows] = await db.query('SELECT name FROM consumables WHERE status = "In Stock"');
    res.json(rows);
  } catch (err) {
    console.error("Error fetching available consumables:", err);
    res.status(500).send("Server error");
  }
});




// Get all consumables and consumable by id
router.get("/", getAllConsumables);
router.get("/:id", getConsumableById);

module.exports = router;
