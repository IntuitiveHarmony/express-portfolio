const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const Admin = require("../models/admin");
// const adminCtrl = require("../controllers/admin");

/* GET users listing. */
router.get("/", function (req, res, next) {
  res.render("admin", { title: "ADMIN" });
});

router.post("/register", async (req, res) => {
  const { username, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);

  const user = new Admin({
    username,
    password: hashedPassword,
  });
  await user.save();
  res.send("Admin registered successfully!");
});

module.exports = router;
