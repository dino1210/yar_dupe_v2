const db = require("../config/db");

// ADD
const addVehicle = async (VehicleData) => {
    const { picture, name, brand, plate_no, category, fuel_type, location, acquisition_date, status, remarks, maintenance_due, assigned_driver, qr } = vehicleData;
    const query = `INSERT INTO vehicles (picture, name, brand, plate_no, category, fuel_type, location, acquisition_date, status, remarks, maintenance_due, assigned_driver, qr) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

    try {
        const [result] = await db.query(query, [picture, name, brand, plate_no, category, fuel_type, location, acquisition_date, status, remarks, maintenance_due, assigned_driver, qr]);
        return result;
    } catch (err) {
        throw new Error('Error adding vehicle: ' + err.message);
    }
};

// DELETE
const deleteVehicle = async (vehicleID) => {
    const query = `DELETE FROM vehicles WHERE id = ?`;

    try {
        const [result] = await db.query(query, [vehicleID]);
        return result;
    } catch (err) {
        throw new Error('Error deleting vehicle: ' + err.message);
    }
};

// UPDATE
const updateVehicle = async (vehicleData) => {
    const { picture, name, brand, plate_no, category, fuel_type, location, acquisition_date, status, remarks, maintenance_due, assigned_driver, qr } = toolData;
    const query = `UPDATE vehicles SET picture = ?, name = ?, brand = ?, plate_no = ?, category = ?, fuel_type = ?, location = ?, acquisition_date = ?, status = ?, remarks = ?, maintenance_due = ?, assigned_driver = ?, qr = ?`;

    try {
        const [result] = await db.query(query, [picture, name, brand, plate_no, category, fuel_type, location, acquisition_date, status, remarks, maintenance_due, assigned_driver, qr, id]);
        return result;
    } catch (err) {
        throw new Error('Error updating vehicle: ' + err.message);
    }
};

// GET ALL TOOLS
const getAllVehicles = async () => {
    const query = `SELECT * FROM vehicle`;

    try {
        const [results] = await db.query(query);
        return results;
    } catch (err) {
        throw new Error('Error fetching vehicles: ' + err.message);
    }
};

// GET SINGLE TOOL BY ID
const getVehicleById = async (toolId) => {
    const query = `SELECT * FROM vehicles WHERE id = ?`;

    try {
        const [results] = await db.query(query, [vehicleId]);
        return results[0]; // Return the first tool, or undefined if not found
    } catch (err) {
        throw new Error('Error fetching vehicle by ID: ' + err.message);
    }
};

module.exports = { addVehicle, deleteVehicle, updateVehicle, getAllVehicles, getVehicleById };
