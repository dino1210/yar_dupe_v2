const express = require("express");
const router = express.Router();
const {
  addConsumable,
  deleteConsumable,
  updateConsumable,
  getAllConsumables,
  getConsumableById,
  getAvailableConsumables,
  getLowStockConsumables,
} = require("../controllers/consumablesController");
const upload = require("../middleware/uploadConsumable");
const db = require("../config/db");

//  Upload Image for consumable
router.post("/", upload.single("picture"), addConsumable);

//  Update Consumable
router.put("/:id", upload.single("picture"), updateConsumable);

//  Delete consumable
router.delete("/:id", deleteConsumable);

//  Select consumables (names only, for dropdown)
router.get("/select/all", async (req, res) => {
  try {
    const [rows] = await db.query(
      'SELECT name FROM consumables WHERE quantity > 0'
    );
    res.json(rows);
  } catch (err) {
    console.error("Error fetching available consumables:", err);
    res.status(500).send("Server error");
  }
});

// Select consumables (names only, by status)
router.get("/select/available", async (req, res) => {
  try {
    const [rows] = await db.query(
      'SELECT name FROM consumables WHERE status = "Available"'
    );
    res.json(rows);
  } catch (err) {
    console.error("Error fetching available consumables:", err.message);
    res.status(500).json({ error: "Server error" });
  }
});

//  Low and No Stock (MUST be above `/:id`)
router.get("/status/low-and-no-stock", async (req, res) => {
  try {
    const [rows] = await db.query(`
      SELECT name, tag, category, quantity 
      FROM consumables 
      WHERE quantity = 0 OR (quantity > 0 AND quantity <= 5)
    `);
    res.json({ consumables: rows });
  } catch (err) {
    console.error("Error fetching low/no stock items:", err);
    res.status(500).send("Server error");
  }
});


// For searchable table - full detail
router.get("/select/details", getAvailableConsumables);

//  Get Low Stock only (<= 4)
router.get("/lowstock", getLowStockConsumables);

//  Get ALL consumables
router.get("/", getAllConsumables);

// 
router.post("/issue", async (req, res) => {
  const { id, issuedQuantity } = req.body;
  try {
    await db.query(
      `UPDATE consumables SET quantity = quantity - ? WHERE id = ? AND quantity >= ?`,
      [issuedQuantity, id, issuedQuantity]
    );
    res.status(200).json({ message: "Consumable issued successfully" });
  } catch (err) {
    res.status(500).json({ message: "Error issuing consumable", error: err.message });
  }
});

// 
router.post("/return", async (req, res) => {
  const { id, returnedQuantity } = req.body;
  try {
    await db.query(
      `UPDATE consumables SET quantity = quantity + ? WHERE id = ?`,
      [returnedQuantity, id]
    );
    res.status(200).json({ message: "Consumable returned successfully" });
  } catch (err) {
    res.status(500).json({ message: "Error returning consumable", error: err.message });
  }
});


// Get single consumable by ID — must be LAST
router.get("/:id", getConsumableById);

module.exports = router;
