const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    img: { type: String },
    liveLink: { type: String },
    description: { type: String },
    bulletPoints: [{ type: String }],
    githubLink: { type: String },
    priority: { type: Number },
    display: { type: Boolean },
  },
  { timestamps: true }
);

const Project = mongoose.model("Project", projectSchema);

module.exports = Project;
