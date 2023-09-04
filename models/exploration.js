const mongoose = require("mongoose");

const explorationSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    img: { type: String },
    liveLink: { type: String },
    headline: { type: String },
    description: { type: String },
    bulletPoints: [{ type: String }],
    techUsed: [{ type: String }],
    githubLink: { type: String },
    priority: { type: Number },
    display: { type: Number },
  },
  { timestamps: true }
);

const Exploration = mongoose.model("Exploration", explorationSchema);

module.exports = Exploration;
