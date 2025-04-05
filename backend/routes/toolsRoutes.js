const express = require("express");
const router = express.Router();
const { getAllTools } = require("../controllers/toolsController");

//GET all tools

router.get("/", getAllTools);

module.exports = router;