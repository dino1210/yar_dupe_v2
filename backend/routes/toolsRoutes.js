const express = require("express");
const router = express.Router();
const {
  addTool,
  deleteTool,
  updateTool,
  getAllTools,
  getToolById,
} = require("../controllers/toolsController");
const upload = require("../middleware/uploadTool");
const db = require("../config/db");

// ✅ Upload tool image
router.post("/", upload.single("picture"), addTool);

// ✅ Update tool
router.put("/:id", upload.single("picture"), updateTool);

// ✅ Delete tool
router.delete("/:id", deleteTool);

// ✅ Select only available tools (for Add Project modal)
router.get("/select/all", async (req, res) => {
  try {
    const [rows] = await db.query('SELECT name FROM tools WHERE status = "Available"');
    res.json(rows);
  } catch (err) {
    console.error("Error fetching available tools:", err);
    res.status(500).send("Server error");
  }
});

// ✅ Get tool details by QR code
router.get("/qr/:qr", async (req, res) => {
  const qr = decodeURIComponent(req.params.qr);
  try {
    const [results] = await db.query("SELECT * FROM tools WHERE qr_code_id = ?", [qr]);
    if (results.length > 0) {
      res.json(results[0]);
    } else {
      res.status(404).json({ message: "Tool not found" });
    }
  } catch (error) {
    console.error("QR fetch error:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// ✅ Get tool by ID
router.get("/:id", getToolById);

// ✅ Get all tools (correct structure)
router.get("/", async (req, res) => {
  try {
    const [rows] = await db.query("SELECT * FROM tools");
    res.json({ tools: rows });   // <-- naka { tools: [...] } para safe sa frontend
  } catch (err) {
    console.error("Error fetching tools:", err);
    res.status(500).send("Server error");
  }
});

module.exports = router;
