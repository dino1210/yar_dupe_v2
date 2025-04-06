const db = require("../config/db")

const getAllVehicles = async (req, res) => {
    try {
        const [rows] = await db.query("SELECT * FROM vehicles");
        res.status(200).json(rows);
    } catch (error) {
        res.status(500).json({ message: "Error fetching vehicles", error })
    }
}

module.exports = { getAllVehicles };