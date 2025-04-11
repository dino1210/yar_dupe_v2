    const express = require("express");
    const router = express.Router();
    const { addTool, deleteTool, updateTool, getAllTools, getToolById } = require("../controllers/toolsController"); 

    router.post("/", addTool);
    router.delete("/:id", deleteTool);
    router.put("/:id", updateTool);
    router.get("/", getAllTools);
    router.get("/:id", getToolById);

    module.exports = router;