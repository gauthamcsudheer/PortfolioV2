const mongoose = require('mongoose');

const ProjectSchema = new mongoose.Schema({
  title: String,
  description: String,
  imgSrc: String,
  link: String,
  tags: [String],
  orderIndex: { type: Number, default: 0 }
});

module.exports = mongoose.model('Project', ProjectSchema);