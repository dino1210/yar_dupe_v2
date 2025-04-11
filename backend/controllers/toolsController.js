const Tool = require("../models/toolsModel");

// Controller for ADD
const addTool = async (req, res) => {
    try {
        const result = await Tool.addTool(req.body);
        res.status(201).json({ message: "Tool added successfully", data: result });
    } catch (err) {
        res.status(500).json({ message: "Error adding tool", error: err.message });
    }
};

// Controller for DELETE
const deleteTool = async (req, res) => {
    const toolId = req.params.id;
    try {
        const result = await Tool.deleteTool(toolId);
        res.status(200).json({ message: "Tool deleted successfully" });
    } catch (err) {
        res.status(500).json({ message: "Error deleting tool", error: err.message });
    }
};

// Controller for UPDATE
const updateTool = async (req, res) => {
    const toolId = req.params.id;
    const toolData = req.body;
    toolData.id = toolId;

    try {
        const result = await Tool.updateTool(toolData);
        res.status(200).json({ message: "Tool updated successfully", data: result });
    } catch (err) {
        res.status(500).json({ message: "Error updating tool", error: err.message });
    }
};

// Controller for GET ALL TOOLS
const getAllTools = async (req, res) => {
    try {
        const tools = await Tool.getAllTools();
        res.status(200).json({ tools });
    } catch (err) {
        res.status(500).json({ message: "Error fetching tools", error: err.message });
    }
};

// Controller for GET TOOL BY ID
const getToolById = async (req, res) => {
    const toolId = req.params.id;
    try {
        const tool = await Tool.getToolById(toolId);
        if (!tool) {
            return res.status(404).json({ message: "Tool not found" });
        }
        res.status(200).json({ tool });
    } catch (err) {
        res.status(500).json({ message: "Error fetching tool", error: err.message });
    }
};

module.exports = { addTool, deleteTool, updateTool, getAllTools, getToolById };
