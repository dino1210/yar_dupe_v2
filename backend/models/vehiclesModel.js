const db = require("../config/db");
const QRCode = require("qrcode");
const path = require("path");
const fs = require("fs");
const { v4: uuidv4 } = require("uuid");

// ADD
const addVehicle = async (vehicleData) => {
  const {
    picture,
    name,
    brand,
    plate_no,
    category,
    fuel_type,
    location,
    acquisition_date,
    status = "Available",
    remarks,
    warranty,
    maintenance_due,
    assigned_driver,
  } = vehicleData;

  // Generate unique QR code ID
  const qrCodeId = `VEHICLE-${uuidv4()}`;

  // Define file path for the QR image
  const fileName = `${qrCodeId}.png`;
  const qrFolderPath = path.join(__dirname, "..", "public/assets/qr/vehicles");
  const qrFilePath = path.join(qrFolderPath, fileName);
  const qrPublicPath = `${fileName}`;

  // Ensure QR folder exists
  if (!fs.existsSync(qrFolderPath)) {
    fs.mkdirSync(qrFolderPath, { recursive: true });
  }

  const insertQuery = `INSERT INTO vehicles (picture, name, brand, plate_no, category, fuel_type, location, acquisition_date, status, remarks, maintenance_due, warranty, assigned_driver, qr_code_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

  try {
    const [result] = await db.query(insertQuery, [
      picture,
      name,
      brand,
      plate_no,
      category,
      fuel_type,
      location,
      acquisition_date,
      status,
      remarks,
      maintenance_due,
      warranty,
      assigned_driver,
      qrCodeId,
    ]);

    const vehicleId = result.insertId;

    // Generate and save QR image to disk
    await QRCode.toFile(qrFilePath, qrCodeId);

    // Save public path to image in DB
    const updateQuery = `UPDATE vehicles SET qr = ? WHERE id = ?`;
    await db.query(updateQuery, [qrPublicPath, vehicleId]);

    return {
      id: vehicleId,
      qr_code_id: qrCodeId,
      qr: qrPublicPath,
    };
  } catch (err) {
    throw new Error("Error adding vehicle: " + err.message);
  }
};

// UPDATE
const updateVehicle = async (vehicleData) => {
  const {
    id,
    picture,
    name,
    brand,
    plate_no,
    category,
    fuel_type,
    location,
    acquisition_date,
    status,
    remarks,
    maintenance_due,
    assigned_driver,
    qr,
  } = vehicleData;

  const query = `
        UPDATE vehicles SET picture = ?, name = ?, brand = ?, plate_no = ?, category = ?, 
        fuel_type = ?, location = ?, acquisition_date = ?, status = ?, remarks = ?, maintenance_due = ?, 
        assigned_driver = ?, qr = ?, qr_code_id
        WHERE id = ?
    `;

  try {
    const [result] = await db.query(query, [
      picture,
      name,
      brand,
      plate_no,
      category,
      fuel_type,
      location,
      acquisition_date,
      status,
      remarks,
      maintenance_due,
      assigned_driver,
      qr,
      id,
    ]);

    return result;
  } catch (err) {
    throw new Error("Error updating vehicle: " + err.message);
  }
};

// DELETE
const deleteVehicle = async (vehicleID) => {
  const query = `DELETE FROM vehicles WHERE id = ?`;

  try {
    const [result] = await db.query(query, [vehicleID]);
    return result;
  } catch (err) {
    throw new Error("Error deleting vehicle: " + err.message);
  }
};

// GET ALL TOOLS
const getAllVehicles = async () => {
  const query = `SELECT * FROM vehicles`;

  try {
    const [results] = await db.query(query);
    return results;
  } catch (err) {
    throw new Error("Error fetching vehicles: " + err.message);
  }
};

// GET SINGLE TOOL BY ID
const getVehicleById = async (vehicleId) => {
  const query = `SELECT * FROM vehicles WHERE id = ?`;

  try {
    const [results] = await db.query(query, [vehicleId]);
    return results[0]; // Return the first tool, or undefined if not found
  } catch (err) {
    throw new Error("Error fetching vehicle by ID: " + err.message);
  }
};

module.exports = {
  addVehicle,
  deleteVehicle,
  updateVehicle,
  getAllVehicles,
  getVehicleById,
};
