const mongoose = require('mongoose');

const ExperienceSchema = new mongoose.Schema({
  type: { type: String, enum: ['work', 'education'], required: true },
  year: String,
  title: String,    // e.g., "Digital Specialist Engineer"
  subtitle: String, // e.g., "Infosys"
  description: String,
  tags: [String],   // e.g., ["MERN", "9.24 CGPA"]
  orderIndex: { type: Number, default: 0 }
});

module.exports = mongoose.model('Experience', ExperienceSchema);