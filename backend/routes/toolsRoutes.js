const express = require("express");
const router = express.Router();
const {
    addTool,
    deleteTool,
    updateTool,
    getAllTools,
    getToolById
} = require("../controllers/toolsController");

const upload = require("../middleware/uploadTool");

// Accept image uploads in POST and PUT
router.post("/", upload.single("picture"), addTool);
router.put("/:id", upload.single("picture"), updateTool);

router.delete("/:id", deleteTool);
router.get("/", getAllTools);
router.get("/:id", getToolById);

module.exports = router;
