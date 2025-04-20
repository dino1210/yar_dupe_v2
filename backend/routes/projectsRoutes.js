const express = require("express");
const router = express.Router();
const projectController = require("../controllers/projectsController");

// GET all projects
router.get("/", projectController.getAllProjects);

module.exports = router;
