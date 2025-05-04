const express = require("express");
const router = express.Router();
const db = require("../config/db");
const { getMetrics } = require("../controllers/metricsController");

// Route for summary metrics
router.get("/", getMetrics);

// Route for recently added tools, consumables, and vehicles
router.get("/recent-additions", async (req, res) => {
  try {
    const [tools] = await db.query(`
      SELECT id, name AS item, tag AS tag, added_by AS added_by, created_at AS date, picture AS image, 'Tool' AS type
      FROM tools
      ORDER BY created_at DESC
      LIMIT 3
    `);

    const [consumables] = await db.query(`
      SELECT id, name AS item, tag AS tag, added_by AS added_by, created_at AS date, picture AS image, 'Consumable' AS type
      FROM consumables
      ORDER BY created_at DESC
      LIMIT 3
    `);

    const [vehicles] = await db.query(`
      SELECT id, name AS item, tag AS tag, added_by AS added_by, created_at AS date, picture AS image, 'Vehicle' AS type
      FROM vehicles
      ORDER BY created_at DESC
      LIMIT 3
    `);

    const all = [...tools, ...consumables, ...vehicles]
      .sort((a, b) => new Date(b.date) - new Date(a.date))
      .slice(0, 5);

      console.log("FINAL JSON:", all);

    res.json(all);
  } catch (err) {
    console.error("Error fetching recent additions:", err.message);
    res.status(500).json({ message: "Server error" });
  }
});



module.exports = router;
