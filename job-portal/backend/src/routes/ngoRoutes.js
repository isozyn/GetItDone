const express = require('express');
const router = express.Router();
const NGORegistration = require('../models/NGORegistration');
const auth = require('../middleware/auth');
const User = require('../models/User');

// Submit NGO Registration
router.post('/register', async (req, res) => {
  try {
    const registrationData = req.body;
    
    // Check if user already registered
    const existing = await NGORegistration.findOne({ 
      $or: [{ email: registrationData.email }, { idNumber: registrationData.idNumber }]
    });
    
    if (existing) {
      return res.status(400).json({ 
        message: 'Registration already exists with this email or ID number' 
      });
    }
    
    const registration = new NGORegistration(registrationData);
    await registration.save();
    
    res.status(201).json({
      success: true,
      message: 'Registration submitted successfully! You will be notified once verified.',
      registration: {
        id: registration._id,
        status: registration.status,
        email: registration.email
      }
    });
  } catch (error) {
    console.error('NGO Registration error:', error);
    res.status(500).json({ 
      success: false,
      message: error.message || 'Registration failed. Please try again.' 
    });
  }
});

// Get registration status by email
router.get('/status/:email', async (req, res) => {
  try {
    const registration = await NGORegistration.findOne({ email: req.params.email });
    
    if (!registration) {
      return res.status(404).json({ message: 'Registration not found' });
    }
    
    res.json({
      status: registration.status,
      completionStatus: registration.completionStatus,
      rejectionReason: registration.rejectionReason,
      createdAt: registration.createdAt,
      reviewedAt: registration.reviewedAt,
      passwordSetupToken: registration.status === 'approved' ? registration.passwordSetupToken : undefined,
      passwordSetupExpires: registration.status === 'approved' ? registration.passwordSetupExpires : undefined
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Admin: Get all registrations
router.get('/registrations', auth, async (req, res) => {
  try {
    const { status } = req.query;
    const query = status ? { status } : {};
    
    const registrations = await NGORegistration.find(query)
      .sort({ createdAt: -1 });
    
    res.json(registrations);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Admin: Approve registration
router.put('/registrations/:id/approve', auth, async (req, res) => {
  try {
    const registration = await NGORegistration.findById(req.params.id);
    
    if (!registration) {
      return res.status(404).json({ message: 'Registration not found' });
    }
    
    registration.status = 'approved';
    registration.reviewedAt = new Date();
    registration.reviewedBy = req.user.userId;
    registration.completionStatus.backgroundCheck = true;
    
    // Generate password setup token
    const crypto = require('crypto');
    const passwordSetupToken = crypto.randomBytes(32).toString('hex');
    registration.passwordSetupToken = passwordSetupToken;
    registration.passwordSetupExpires = Date.now() + 24 * 60 * 60 * 1000; // 24 hours
    
    await registration.save();
    
    // Check if user already exists
    let user = await User.findOne({ email: registration.email });
    
    if (!user) {
      // Create user account (inactive until password is set)
      const tempPassword = crypto.randomBytes(16).toString('hex');
      user = new User({
        idNumber: registration.idNumber,
        email: registration.email,
        password: tempPassword,
        firstName: registration.fullName.split(' ')[0] || registration.fullName,
        lastName: registration.fullName.split(' ').slice(1).join(' ') || 'User',
        phone: registration.phone,
        isVerified: false, // Will be true after password setup
        passwordSetupToken: passwordSetupToken,
        passwordSetupExpires: registration.passwordSetupExpires,
        experienceLevel: registration.isSkilled ? 'intermediate' : 'entry'
      });
      
      await user.save();
    } else {
      // Update existing user with password setup token
      user.passwordSetupToken = passwordSetupToken;
      user.passwordSetupExpires = registration.passwordSetupExpires;
      await user.save();
    }
    
    // Password setup link
    const setupLink = `${process.env.FRONTEND_URL || 'http://localhost:3000'}/setup-password/${passwordSetupToken}`;
    console.log(`Password setup link for ${registration.email}: ${setupLink}`);
    
    res.json({ 
      message: 'Registration approved! User will receive password setup instructions.',
      registration,
      setupLink: setupLink // For testing - remove in production
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Admin: Reject registration
router.put('/registrations/:id/reject', auth, async (req, res) => {
  try {
    const { reason } = req.body;
    
    const registration = await NGORegistration.findById(req.params.id);
    
    if (!registration) {
      return res.status(404).json({ message: 'Registration not found' });
    }
    
    registration.status = 'rejected';
    registration.rejectionReason = reason;
    registration.reviewedAt = new Date();
    registration.reviewedBy = req.user.userId;
    await registration.save();
    
    res.json({ 
      message: 'Registration rejected',
      registration 
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Admin: Get registration statistics
router.get('/stats', auth, async (req, res) => {
  try {
    const total = await NGORegistration.countDocuments();
    const pending = await NGORegistration.countDocuments({ status: 'pending' });
    const approved = await NGORegistration.countDocuments({ status: 'approved' });
    const rejected = await NGORegistration.countDocuments({ status: 'rejected' });
    const skilled = await NGORegistration.countDocuments({ isSkilled: true });
    const unskilled = await NGORegistration.countDocuments({ isSkilled: false });
    
    res.json({
      total,
      pending,
      approved,
      rejected,
      skilled,
      unskilled
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
