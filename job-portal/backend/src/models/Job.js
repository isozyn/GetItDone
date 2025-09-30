const mongoose = require('mongoose');

const jobSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  company: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  salary: {
    type: String,
  },
  jobType: {
    type: String,
    enum: ['full-time', 'part-time', 'contract', 'temporary'],
    default: 'full-time'
  },
  skillLevel: {
    type: String,
    enum: ['low', 'medium', 'high'],
    required: true,
  },
  requiredSkills: [{
    type: String
  }],
  category: {
    type: String,
    enum: ['housekeeping', 'gardening', 'laundry', 'construction', 'office', 'retail', 'hospitality', 'other'],
    required: true,
  },
  isActive: {
    type: Boolean,
    default: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  }
});

module.exports = mongoose.model('Job', jobSchema);