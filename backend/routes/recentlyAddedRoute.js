const express = require("express");
const router = express.Router();
const db = require("../config/db");

router.get("/", async (req, res) => {
  try {
    const [tools] = await db.query(`
      SELECT name AS item, tag AS tag, added_by AS added_by, created_at AS date
      FROM tools
      ORDER BY created_at DESC
      LIMIT 8
    `);

    const [consumables] = await db.query(`
      SELECT name AS item, tag AS tag, added_by AS added_by, created_at AS date
      FROM consumables
      ORDER BY created_at DESC
      LIMIT 8
    `);

    const [vehicles] = await db.query(`
      SELECT name AS item, tag AS tag, added_by AS added_by, created_at AS date
      FROM vehicles
      ORDER BY created_at DESC
      LIMIT 8
    `);

    const combined = [...tools, ...consumables, ...vehicles].sort(
      (a, b) => new Date(b.date) - new Date(a.date)
    );

    res.json(combined); 
  } catch (err) {
    console.error("Error fetching recently added items:", err.message);
    res.status(500).send("Server error");
  }
});

module.exports = router;
