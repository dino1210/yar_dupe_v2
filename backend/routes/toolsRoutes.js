// routes/toolsRoutes.js
const express = require("express");
const router = express.Router();
const db = require("../config/db");
const {
  addTool,
  deleteTool,
  updateTool,
  getAllTools,
  getToolById,
} = require("../controllers/toolsController");
const upload = require("../middleware/uploadTool")

router.post("/", upload.single("picture"), addTool);
router.put("/:id", upload.single("picture"), updateTool);

// ✅ GET all tools (for ToolsAndEquipmentsTable fetch)
router.get("/", async (req, res) => {
  try {
    const [tools] = await db.query(`
      SELECT 
        id,
        picture,
        name,
        brand,
        category,
        tag,
        description,
        purchase_date,
        warranty,
        status,
        remarks,
        qr,
        qr_code_id
      FROM tools
    `);
    res.json({ tools }); // return as object for frontend destructuring
  } catch (error) {
    console.error("❌ FETCH ALL TOOLS ERROR:", error); // show actual error
    res.status(500).json({ error: "Failed to fetch tools" });
  }
});

// ✅ GET tools logs (for ToolsAndEquipmentsLogsTable)
router.get("/logs", async (req, res) => {
  try {
    const [logs] = await db.query(`
      SELECT 
        id, 
        tool_name,
        performed_by,
        issued_date,
        status
      FROM tools_logs
      ORDER BY issued_date DESC
    `);
    res.json(logs);
  } catch (error) {
    console.error("❌ FETCH TOOLS LOGS ERROR:", error);
    res.status(500).json({ error: "Failed to fetch tools logs" });
  }
});

// ✅ GET available tools (for Add Project modal)
router.get("/select/all", async (req, res) => {
  try {
    const [tools] = await db.query(`
      SELECT id, name
      FROM tools
      WHERE status = 'Available'
    `);
    res.json(tools);
  } catch (error) {
    console.error("❌ FETCH AVAILABLE TOOLS ERROR:", error);
    res.status(500).json({ error: "Failed to fetch available tools" });
  }
});

router.delete("/:id", deleteTool);
router.get("/", getAllTools);
router.get("/:id", getToolById);

module.exports = router;
