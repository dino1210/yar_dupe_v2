const express = require("express");
const router = express.Router();
const { getAllConsumables } = require("../controllers/consumablesController");

//GET all consumables
router.get("/", getAllConsumables);

module.exports = router;