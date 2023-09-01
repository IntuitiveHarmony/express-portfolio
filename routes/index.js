const express = require("express");
const router = express.Router();

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("home", {
    title: "Portfolio",
    description: "Who is Intuitive Harmony?",
    isAdmin: req.session.admin,
  });
});

// Log out
router.get("/logout", (req, res) => {
  req.session.destroy();
  res.redirect("/");
});

module.exports = router;
