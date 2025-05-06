const express = require("express");
const router = express.Router();
const projectController = require("../controllers/projectsController");

// GET all
router.get("/", projectController.getAllProjects);

//Project History
router.get("/history", projectController.getProjectHistory);

// GET project stats
router.get("/stats", projectController.getProjectStats);

// POST new project
router.post("/", projectController.createProject);

// PUT to issue resources
router.put("/issue-resources", projectController.issueResources);

// PUT to return resources
router.put("/return-resources", projectController.returnResources);

// PUT to update project by ID
router.put("/:id", projectController.updateProject);

module.exports = router;
