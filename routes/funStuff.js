const express = require("express");
const router = express.Router();

router.get("/", async (req, res) => {
  res.render("funStuff", {
    title: "Fun Stuff",
    isAdmin: req.session.admin,
  });
});

router.get("/clock", async (req, res) => {
  res.render("funStuff", {
    title: "Clock",
    isAdmin: req.session.admin,
  });
});

module.exports = router;
