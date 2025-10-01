const Job = require('../models/job');
const User = require('../models/User');

exports.getJobs = async (req, res) => {
  try {
    const user = await User.findById(req.user.userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Get user's experience level and skills
    const userExperience = user.experienceLevel || 'entry';
    const userSkills = user.skills || [];

    // Find matching jobs based on experience level and skills
    let query = { isActive: true };
    
    if (userExperience === 'entry') {
      query.skillLevel = 'low';
    } else if (userExperience === 'intermediate') {
      query.skillLevel = { $in: ['low', 'medium'] };
    } else {
      query.skillLevel = { $in: ['low', 'medium', 'high'] };
    }

    // If user has skills, try to match some required skills
    if (userSkills.length > 0) {
      query.$or = [
        { requiredSkills: { $in: userSkills } },
        { requiredSkills: { $size: 0 } }
      ];
    }

    const jobs = await Job.find(query).sort({ createdAt: -1 });

    res.json(jobs);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.getAllJobs = async (req, res) => {
  try {
    const { category, skillLevel, location } = req.query;
    let query = { isActive: true };

    if (category) query.category = category;
    if (skillLevel) query.skillLevel = skillLevel;
    if (location) query.location = new RegExp(location, 'i');

    const jobs = await Job.find(query).sort({ createdAt: -1 });
    res.json(jobs);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.createJob = async (req, res) => {
  try {
    const jobData = req.body;
    const job = new Job(jobData);
    await job.save();
    res.status(201).json(job);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};