const User = require('../models/User');
const jwt = require('jsonwebtoken');
const { validationResult } = require('express-validator');
const nodemailer = require('nodemailer');
const crypto = require('crypto');

// Configure email transporter
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// Generate random password
function generatePassword() {
  return Math.random().toString(36).slice(-8);
}

// Generate verification token
function generateVerificationToken() {
  return crypto.randomBytes(32).toString('hex');
}

exports.register = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { idNumber, email, firstName, lastName, phone } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ $or: [{ idNumber }, { email }] });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists with this ID or email' });
    }

    // Generate random password and verification token
    const password = generatePassword();
    const verificationToken = generateVerificationToken();

    // Create new user
    const user = new User({
      idNumber,
      email,
      password,
      firstName,
      lastName,
      phone,
      verificationToken,
    });

    await user.save();

    // Send verification email
    const verificationUrl = `${process.env.FRONTEND_URL}/verify/${verificationToken}`;
    
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'Verify Your Account - Job Portal',
      html: `
        <h2>Welcome to Job Portal!</h2>
        <p>Your account has been created successfully.</p>
        <p><strong>Your temporary password:</strong> ${password}</p>
        <p>Please click the link below to verify your account:</p>
        <a href="${verificationUrl}">Verify Account</a>
        <p>You can change your password after logging in.</p>
      `,
    };

    await transporter.sendMail(mailOptions);

    res.status(201).json({
      message: 'Registration successful. Please check your email for verification.',
      userId: user._id,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.verifyEmail = async (req, res) => {
  try {
    const { token } = req.params;

    const user = await User.findOne({ verificationToken: token });
    if (!user) {
      return res.status(400).json({ message: 'Invalid verification token' });
    }

    user.isVerified = true;
    user.verificationToken = undefined;
    await user.save();

    res.json({ message: 'Email verified successfully. You can now log in.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.login = async (req, res) => {
  try {
    const { idNumber, password } = req.body;

    const user = await User.findOne({ idNumber });
    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    if (!user.isVerified) {
      return res.status(400).json({ message: 'Please verify your email first' });
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign(
      { userId: user._id, idNumber: user.idNumber },
      process.env.JWT_SECRET || 'your-secret-key',
      { expiresIn: '7d' }
    );

    res.json({
      token,
      user: {
        id: user._id,
        idNumber: user.idNumber,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        experienceLevel: user.experienceLevel,
        skills: user.skills,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.changePassword = async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;
    const userId = req.user.userId;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const isMatch = await user.comparePassword(currentPassword);
    if (!isMatch) {
      return res.status(400).json({ message: 'Current password is incorrect' });
    }

    user.password = newPassword;
    await user.save();

    res.json({ message: 'Password changed successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};