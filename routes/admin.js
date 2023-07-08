const express = require("express");
const router = express.Router();
const adminCtrl = require("../controllers/admin");

/* GET users listing. */
router.get("/", function (req, res, next) {
  res.render("admin", { title: "ADMIN" });
});

router.post;

module.exports = router;
