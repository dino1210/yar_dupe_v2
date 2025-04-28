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

// Upload Image for tool
router.post("/", upload.single("picture"), addTool);
router.put("/:id", upload.single("picture"), updateTool);

// Delete tool
router.delete("/:id", deleteTool);

// Get tool by QR code
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

/// ✅ Select only available tools (for Add Project Modal)
router.get("/select/all", async (req, res) => {
  try {
    const [rows] = await db.query('SELECT name FROM tools WHERE status = "Available"');
    res.json(rows);
  } catch (err) {
    console.error("Error fetching available tools:", err);
    res.status(500).send("Server error");
  }
});

// Get all tools and tool by id
router.get("/", getAllTools);
router.get("/:id", getToolById);

module.exports = router;
