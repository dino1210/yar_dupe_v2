const db = require("../config/db");

const getAllConsumables = async (req, res) => {
    try {
        const [rows] = await db.query("SELECT * FROM consumables");
        res.status(200).json(rows);
    } catch (error) {
        res.status(500).json({ message: "Error fetching consumables", error })
    }
}; 

module.exports = { getAllConsumables };