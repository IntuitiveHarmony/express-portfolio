const express = require("express");
const router = express.Router();
const Project = require("../models/project");

/* GET users listing. */
router.get("/", async (req, res) => {
  const projects = await Project.find({});
  res.render("projects", {
    title: "Projects",
    isAdmin: req.session.admin,
    projects: projects,
  });
});

// Create a new project
router.post("/", async (req, res) => {
  console.log(req.body);
  try {
    const project = new Project(req.body);
    await project.save();
    res.redirect("admin/dashboard");
  } catch (error) {
    console.error("Error creating project:", error);
    res.status(500).send("Error creating project");
  }
});

// Update Project form
router.get("/:id/edit", async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    res.render("edit", {
      project: project,
      isAdmin: req.session.admin,
      title: `Edit ${project.name}`,
    });
  } catch (error) {
    console.error("Error updating project:", error);
    res.status(500).send("Error deleting project");
  }
});

// Update a project in DB
router.post("/:id/edit", async (req, res) => {
  try {
    const project = await Project.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!project) {
      return res.status(404).send("Project not found");
    }
    res.redirect("../../admin/dashboard");
  } catch (error) {
    console.error("Error updating project:", error);
    res.status(500).send("Error updating project");
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
