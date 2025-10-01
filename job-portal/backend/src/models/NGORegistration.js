const mongoose = require('mongoose');

const ngoRegistrationSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  address: {
    type: String,
    required: true,
  },
  idNumber: {
    type: String,
    required: true,
    unique: true,
  },
  idDocument: String,
  proofOfAddress: String,
  isSkilled: {
    type: Boolean,
    required: true,
  },
  // For skilled workers
  skills: String,
  yearsExperience: Number,
  qualifications: String,
  references: String,
  // For unskilled workers
  preferredSectors: [String],
  additionalInfo: String,
  // Registration status
  status: {
    type: String,
    enum: ['pending', 'approved', 'rejected'],
    default: 'pending',
  },
  rejectionReason: String,
  completionStatus: {
    personalInfo: { type: Boolean, default: true },
    verification: { type: Boolean, default: true },
    skills: { type: Boolean, default: true },
    backgroundCheck: { type: Boolean, default: false },
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  reviewedAt: Date,
  reviewedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  passwordSetupToken: String,
  passwordSetupExpires: Date,
});

module.exports = mongoose.model('NGORegistration', ngoRegistrationSchema);
