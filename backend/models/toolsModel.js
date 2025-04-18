const db = require("../config/db");
const QRCode = require("qrcode");

// ADD
const addTool = async (toolData) => {
    const { picture, name, brand, category, tag, description, purchase_date, warranty, status = "Available", remarks } = toolData;

    const insertQuery = `
        INSERT INTO tools (picture, name, brand, category, tag, description, purchase_date, warranty, status, remarks)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

    try {
        const [result] = await db.query(insertQuery, [
            picture, name, brand, category, tag,
            description, purchase_date, warranty,
            status, remarks
        ]);

        const toolId = result.insertId;
        const qrContent = `tool-${toolId}`; // This will be scanned
        const qrImage = await QRCode.toDataURL(qrContent); // base64 image

        // Update tool with QR code
        const updateQuery = `UPDATE tools SET qr = ? WHERE id = ?`;
        await db.query(updateQuery, [qrImage, toolId]);

        return { id: toolId, qr: qrImage };
    } catch (err) {
        throw new Error('Error adding tool: ' + err.message);
    }
};

// DELETE
const deleteTool = async (toolID) => {
    const query = `DELETE FROM tools WHERE id = ?`;

    try {
        const [result] = await db.query(query, [toolID]);
        return result;
    } catch (err) {
        throw new Error('Error deleting tool: ' + err.message);
    }
};

// UPDATE
const updateTool = async (toolData) => {
    const {
        picture, name, brand, category, tag,
        description, purchase_date, warranty,
        status, remarks, id
    } = toolData;

    const query = `
        UPDATE tools SET picture = ?, name = ?, brand = ?, category = ?, tag = ?,
        description = ?, purchase_date = ?, warranty = ?, status = ?, remarks = ?
        WHERE id = ?
    `;

    try {
        const [result] = await db.query(query, [
            picture, name, brand, category, tag,
            description, purchase_date, warranty,
            status, remarks, id
        ]);

        return result;
    } catch (err) {
        throw new Error('Error updating tool: ' + err.message);
    }
};

// GET ALL TOOLS
const getAllTools = async () => {
    const query = `SELECT * FROM tools`;

    try {
        const [results] = await db.query(query);
        return results;
    } catch (err) {
        throw new Error('Error fetching tools: ' + err.message);
    }
};

// GET SINGLE TOOL BY ID
const getToolById = async (toolId) => {
    const query = `SELECT * FROM tools WHERE id = ?`;

    try {
        const [results] = await db.query(query, [toolId]);
        return results[0]; // Return the first tool, or undefined if not found
    } catch (err) {
        throw new Error('Error fetching tool by ID: ' + err.message);
    }
};

module.exports = {
    addTool,
    deleteTool,
    updateTool,
    getAllTools,
    getToolById
};
