const express = require("express");
const router = express.Router();
const Exploration = require("../models/exploration");

/* GET users listing. */
router.get("/", async (req, res) => {
  const explorations = await Exploration.find({ display: 1 }).sort({
    priority: 1,
  });
  res.render("explorations", {
    title: "Explorations",
    isAdmin: req.session.admin,
    explorations: explorations,
  });
});

// Create a new Exploration
router.post("/", async (req, res) => {
  if (req.session.admin) {
    try {
      const exploration = new Exploration(req.body);
      await exploration.save();
      res.redirect("admin/dashboard");
    } catch (error) {
      console.error("Error creating exploration:", error);
      res.status(500).send("Error creating exploration");
    }
  } else {
    res.status(500).send("Not Authorized");
  }
});

// Update Exploration form
router.get("/:id/edit", async (req, res) => {
  try {
    const exploration = await Exploration.findById(req.params.id);
    console.log(exploration);
    exploration;
    res.render("edit", {
      exploration: exploration,
      isAdmin: req.session.admin,
      title: `Edit ${exploration.name}`,
    });
  } catch (error) {
    console.error("Error updating exploration:", error);
    res.status(500).send("Error deleting exploration");
  }
});
// Show Route
router.get("/:id", async (req, res) => {
  try {
    const exploration = await Exploration.findById(req.params.id);
    res.render("show", {
      exploration: exploration,
      isAdmin: req.session.admin,
      title: `${exploration.name} Details`,
    });
  } catch (error) {
    console.error("Error finding exploration:", error);
    res.status(404).send("Cannot find exploration");
  }
});
// Update a Exploration in DB
router.post("/:id/edit", async (req, res) => {
  if (req.session.admin) {
    try {
      const exploration = await Exploration.findByIdAndUpdate(
        req.params.id,
        req.body,
        {
          new: true,
        }
      );
      console.log(req.body);
      if (!exploration) {
        return res.status(404).send("Exploration not found");
      }
      res.redirect("../../admin/dashboard");
    } catch (error) {
      console.error("Error updating exploration:", error);
      res.status(500).send("Error updating exploration");
    }
  } else {
    res.status(500).send("Not Authorized");
  }
});

// Delete a Exploration
router.post("/:id", async (req, res) => {
  if (req.session.admin) {
    try {
      const exploration = await Exploration.findByIdAndDelete(req.params.id);
      if (!exploration) {
        return res.status(404).send("Exploration not found");
      }
      res.redirect("../admin/dashboard");
    } catch (error) {
      console.error("Error deleting exploration:", error);
      res.status(500).send("Error deleting exploration");
    }
  } else {
    res.status(500).send("Not Authorized");
  }
});

module.exports = router;
