const express = require("express");
const router = express.Router();
const Project = require("../models/project");

/* GET users listing. */
router.get("/", function (req, res, next) {
  res.render("projects", { title: "Projects", isAdmin: req.session.admin });
});

// Create a new project
router.post("/", async (req, res) => {
  try {
    const project = new Project(req.body);
    await project.save();
    res.redirect("admin/dashboard");
  } catch (error) {
    console.error("Error creating project:", error);
    res.status(500).send("Error creating project");
  }
});

// Delete a project
router.post("/:id", async (req, res) => {
  try {
    const project = await Project.findByIdAndDelete(req.params.id);
    if (!project) {
      return res.status(404).send("Project not found");
    }
    res.redirect("../admin/dashboard");
  } catch (error) {
    console.error("Error deleting project:", error);
    res.status(500).send("Error deleting project");
  }
});

module.exports = router;
