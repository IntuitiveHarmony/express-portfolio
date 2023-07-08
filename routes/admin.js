const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const Admin = require("../models/admin");
const Project = require("../models/project");
// const adminCtrl = require("../controllers/admin");

/* GET users listing. */
router.get("/", function (req, res, next) {
  res.render("admin", { title: "ADMIN", isAdmin: req.session.admin });
});

// Register new admin (uncomment to use)
// router.post("/register", async (req, res) => {
//   const { username, password } = req.body;
//   const hashedPassword = await bcrypt.hash(password, 10);

//   const user = new Admin({
//     username,
//     password: hashedPassword,
//   });
//   await user.save();
//   res.send("Admin registered successfully!");
// });

// Log in as an admin
router.post("/login", async (req, res) => {
  const { username, password } = req.body;

  const user = await Admin.findOne({ username });

  if (!user) {
    res.status(401).send("Invalid username or password");
    return;
  }
  console.log(password, user.password);
  const validPassword = await bcrypt.compare(password, user.password);

  if (!validPassword) {
    res.status(401).send("Invalid username or password");
    return;
  }

  req.session.admin = true;
  res.redirect("dashboard");
});

// once logged in this route is available
router.get("/dashboard", async (req, res) => {
  if (req.session.admin) {
    try {
      const projects = await Project.find({});
      res.render("dashboard", {
        title: "DASHBOARD",
        isAdmin: req.session.admin,
        projects: projects,
      });
    } catch (err) {
      res.status(500).send("Error getting projects");
    }
  }
});

module.exports = router;
