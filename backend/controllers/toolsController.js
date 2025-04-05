const db = require("../config/db");

const getAllTools = async (req, res) => {
    try {
        const [rows] = await db.query("SELECT * FROM tools");
        res.status(200).json(rows);
    } catch (error) {
        res.status(500).json({ message: "Error fetching tool", error })
    }
};

module.exports = { getAllTools };