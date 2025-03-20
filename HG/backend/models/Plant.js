const mongoose = require('mongoose');

const plantSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  region: { type: String, required: true },
  images: [{ type: String }], // Array of image URLs
  commonNames: { type: String }, // Add this field
  videoUrl: { type: String }, // Add this field
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Plant', plantSchema);