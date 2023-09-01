require("dotenv").config();

const express = require("express");
const router = express.Router();

router.post("/contact", (req, res) => {
  const USER = process.env.USER;
  const PASS = process.env.PASS;
  const { email, subject, message } = req.body;
  // Create a nodemailer transporter
  const transporter = nodemailer.createTransport({
    service: "Gmail", // e.g., 'Gmail' for Gmail
    auth: {
      user: USER,
      pass: PASS,
    },
  });

  // Email options
  const mailOptions = {
    from: email,
    to: USER,
    subject: subject,
    text: message,
  };

  // Send email
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error(error);
      res.status(500).send("An error occurred while sending your message.");
    } else {
      console.log("Email sent: " + info.response);
      res.send("Your message has been sent successfully!");
    }
  });
});

module.exports = router;
