const express = require("express");
const router = express.Router();
const Project = require("../models/project");

/* GET users listing. */
router.get("/", async (req, res) => {
  const projects = await Project.find({ display: 1 }).sort({ priority: 1 });
  res.render("projects", {
    title: "Projects",
    isAdmin: req.session.admin,
    projects: projects,
  });
});

// Create a new project
router.post("/", async (req, res) => {
  if (req.session.admin) {
    try {
      const project = new Project(req.body);
      await project.save();
      res.redirect("admin/dashboard");
    } catch (error) {
      console.error("Error creating project:", error);
      res.status(500).send("Error creating project");
    }
  } else {
    res.status(500).send("Not Authorized");
  }
});

// Update Project form
router.get("/:id/edit", async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    console.log(project);
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
// Show Route
router.get("/:id", async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    res.render("show", {
      project: project,
      isAdmin: req.session.admin,
      title: `${project.name} Details`,
    });
  } catch (error) {
    console.error("Error finding project:", error);
    res.status(404).send("Cannot find project");
  }
});
// Update a project in DB
router.post("/:id/edit", async (req, res) => {
  if (req.session.admin) {
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
  } else {
    res.status(500).send("Not Authorized");
  }
});

// Delete a project
router.post("/:id", async (req, res) => {
  if (req.session.admin) {
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
  } else {
    res.status(500).send("Not Authorized");
  }
});

module.exports = router;
