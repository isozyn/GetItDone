const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const User = require('../models/User');

// Get all users (admin only)
router.get('/users', auth, async (req, res) => {
  try {
    // Only allow admins
    const currentUser = await User.findById(req.user.userId);
    if (!currentUser || !currentUser.isAdmin) {
      return res.status(403).json({ message: 'Access denied' });
    }
    const users = await User.find().select('-password');
    res.json({ users });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
// Add user to a skill class
router.post('/users/:userId/add-class', auth, async (req, res) => {
  try {
    const currentUser = await User.findById(req.user.userId);
    if (!currentUser || !currentUser.isAdmin) {
      return res.status(403).json({ message: 'Access denied' });
    }
    const { skill } = req.body;
    if (!skill) {
      return res.status(400).json({ message: 'Skill is required' });
    }
    const user = await User.findByIdAndUpdate(
      req.params.userId,
      { $addToSet: { skills: skill } },
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

// Remove user from a skill class
router.post('/users/:userId/remove-class', auth, async (req, res) => {
  try {
    const currentUser = await User.findById(req.user.userId);
    if (!currentUser || !currentUser.isAdmin) {
      return res.status(403).json({ message: 'Access denied' });
    }
    const { skill } = req.body;
    if (!skill) {
      return res.status(400).json({ message: 'Skill is required' });
    }
    const user = await User.findByIdAndUpdate(
      req.params.userId,
      { $pull: { skills: skill } },
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
