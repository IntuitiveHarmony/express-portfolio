require("dotenv").config();
// connect to the database with AFTER the config vars are processed
require("./config/database");

const createError = require("http-errors");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const favicon = require("serve-favicon");
const session = require("express-session");

const indexRouter = require("./routes/index");
const projectsRouter = require("./routes/projects");
const funStuffRouter = require("./routes/funStuff");
const adminRouter = require("./routes/admin");
const contactRouter = require("./routes/contact");

const app = express();

const http = require("http");

// This keeps the app awake on the heroku server
setInterval(() => {
  http.get("https://express-portfolio-jason-19a706a4ebda.herokuapp.com/");
}, 25 * 60 * 1000); // call every 25 minutes

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

// Set the path to the favicon.ico file
const faviconPath = path.join(__dirname, "public", "images", "favicon.ico");
// Serve the favicon
app.use(favicon(faviconPath));

// Configure session middleware
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
  })
);

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/projects", projectsRouter);
app.use("/funStuff", funStuffRouter);
app.use("/admin", adminRouter);
app.use("/contact", contactRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
