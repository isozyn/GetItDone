const express = require('express');
const router = express.Router();
const jobController = require('../controllers/jobController');
const auth = require('../middleware/auth');

// Get jobs (personalized for logged-in user)
router.get('/', auth, jobController.getJobs);

// Get all jobs (with optional filters)
router.get('/all', jobController.getAllJobs);

// Create a new job (admin or employer only)
router.post('/', auth, jobController.createJob);

module.exports = router;
