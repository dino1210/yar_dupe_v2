const express = require("express");
const router = express.Router();
const { addConsumable, deleteConsumable, updateConsumable, getAllConsumables, getConsumableById } = require("../controllers/consumablesController"); 

router.post("/", addConsumable);
router.delete("/:id", deleteConsumable);
router.put("/:id", updateConsumable);
router.get("/", getAllConsumables);
router.get("/:id", getConsumableById);

module.exports = router;