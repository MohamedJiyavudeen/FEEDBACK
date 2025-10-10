// models/Feedback.js
const mongoose = require('mongoose');

const FeedbackSchema = new mongoose.Schema({
  name: { type: String, trim: true },
  email: { type: String, lowercase: true, trim: true },
  rating: { type: Number, required: true, min: 1, max: 5 },
  message: { type: String, required: true, trim: true },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Feedback', FeedbackSchema);
