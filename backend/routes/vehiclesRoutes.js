const express = require("express");
const router = express.Router();
const { addVehicle, deleteVehicle, updateVehicle, getAllVehicles, getVehicleById } = require("../controllers/vehiclesController"); 

router.post("/", addVehicle);
router.delete("/:id", deleteVehicle);
router.put("/:id", updateVehicle);
router.get("/", getAllVehicles);
router.get("/:id", getVehicleById);

module.exports = router;