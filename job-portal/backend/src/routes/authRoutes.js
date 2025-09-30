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
router.post('/change-password', authMiddleware, authController.changePassword);

module.exports = router;