const express = require('express');
const { body } = require('express-validator');
const authController = require('../controllers/authController');
const authMiddleware = require('../middleware/auth');

const router = express.Router();

router.post(
  '/register',
  [
    body('idNumber').notEmpty().withMessage('ID number is required'),
    body('email').isEmail().withMessage('Please enter a valid email'),
    body('firstName').notEmpty().withMessage('First name is required'),
    body('lastName').notEmpty().withMessage('Last name is required'),
    body('phone').notEmpty().withMessage('Phone number is required'),
  ],
  authController.register
);

router.get('/verify/:token', authController.verifyEmail);
router.post('/login', authController.login);
router.post('/setup-password/:token', authController.setupPassword);
router.post('/change-password', authMiddleware, authController.changePassword);


// Get current user info for frontend auth
const User = require('../models/User');
router.get('/me', authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.user.userId).select('-password');
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json({
      user: {
        id: user._id,
        idNumber: user.idNumber,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        experienceLevel: user.experienceLevel,
        skills: user.skills,
        isVerified: user.isVerified,
        isAdmin: user.isAdmin,
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;