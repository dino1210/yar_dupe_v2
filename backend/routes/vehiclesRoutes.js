const express = require("express");
const router = express.Router();
const { getAllVehicles } = require("../controllers/vehiclesController");

//GET all vehicles
router.get("/", getAllVehicles)

module.exports = router;