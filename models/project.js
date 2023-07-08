const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema({
  name: { type: String, required: true },
  img: { type: String },
  liveLink: { type: String },
  description: { type: String },
  githubLink: { type: String },
  display: { type: Boolean, default: true },
});

const Project = mongoose.model("Project", projectSchema);

module.exports = Project;
