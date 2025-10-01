const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');

// Get user profile
router.get('/profile', auth, async (req, res) => {
  try {
    const User = require('../models/User');
    const user = await User.findById(req.user.userId).select('-password');
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Update user profile
router.put('/profile', auth, async (req, res) => {
  try {
    const User = require('../models/User');
    const { name, email, skills, experienceLevel } = req.body;
    
    const user = await User.findByIdAndUpdate(
      req.user.userId,
      { name, email, skills, experienceLevel },
      { new: true }
    ).select('-password');
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    res.json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});


// Get user's job history
router.get('/job-history', auth, async (req, res) => {
  try {
    const User = require('../models/User');
  const Job = require('../models/job');
    const user = await User.findById(req.user.userId).populate('preferredJobs');
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    // Assuming preferredJobs is an array of job IDs the user applied to
    res.json(user.preferredJobs || []);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
