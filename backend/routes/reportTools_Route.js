const express = require("express");
const router = express.Router();
const reportToolsController = require("../controllers/reportTools_Cont");

router.get("/tools-report", reportToolsController.getAllToolsReport);

module.exports = router;
