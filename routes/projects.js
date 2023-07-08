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

module.exports = router;
