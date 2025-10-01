const mongoose = require('mongoose');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '..', '.env') });

const Job = require('./src/models/job');

// Test jobs data - focused on low-end, quick gig jobs
const testJobs = [
  // Unskilled Jobs - Domestic Work
  {
    title: 'Domestic Worker Needed',
    description: 'Looking for a reliable domestic worker for general housekeeping duties. Responsibilities include cleaning, laundry, and light cooking. 3-4 hours per day, flexible schedule.',
    company: 'Private Residence - Sandton',
    location: 'Sandton, Johannesburg',
    salary: 'R150-200 per day',
    jobType: 'part-time',
    skillLevel: 'low',
    requiredSkills: [],
    category: 'housekeeping',
    isActive: true,
  },
  {
    title: 'Maid/Housekeeper - Urgent',
    description: 'Immediate opening for a trustworthy maid. Duties include cleaning all rooms, doing laundry, ironing, and basic meal preparation. Monday to Friday, 8am-2pm.',
    company: 'Family Home - Rosebank',
    location: 'Rosebank, Johannesburg',
    salary: 'R180 per day',
    jobType: 'part-time',
    skillLevel: 'low',
    requiredSkills: [],
    category: 'housekeeping',
    isActive: true,
  },
  {
    title: 'Weekend House Cleaner',
    description: 'Need someone to clean our home every Saturday. Deep cleaning of kitchen, bathrooms, bedrooms, and living areas. Approximately 5 hours of work.',
    company: 'Private Home - Centurion',
    location: 'Centurion, Pretoria',
    salary: 'R300 per day',
    jobType: 'temporary',
    skillLevel: 'low',
    requiredSkills: [],
    category: 'housekeeping',
    isActive: true,
  },

  // Unskilled Jobs - Gardening
  {
    title: 'Gardener for Weekly Maintenance',
    description: 'Looking for a gardener to maintain our garden. Lawn mowing, weeding, watering plants, and general garden upkeep. Every Wednesday, 4-5 hours.',
    company: 'Residential Property - Pretoria East',
    location: 'Pretoria East',
    salary: 'R250 per session',
    jobType: 'part-time',
    skillLevel: 'low',
    requiredSkills: [],
    category: 'gardening',
    isActive: true,
  },
  {
    title: 'Garden Help Needed - Once Off',
    description: 'One-time job to clean up overgrown garden. Need help with cutting grass, removing weeds, trimming bushes, and general garden cleanup. Full day work.',
    company: 'Private Garden - Midrand',
    location: 'Midrand',
    salary: 'R400 (one-off)',
    jobType: 'temporary',
    skillLevel: 'low',
    requiredSkills: [],
    category: 'gardening',
    isActive: true,
  },
  {
    title: 'Weekend Gardener',
    description: 'Regular weekend gardening work available. Must be able to use lawn mower, do weeding, and general garden maintenance. Saturdays only.',
    company: 'Estate - Fourways',
    location: 'Fourways, Johannesburg',
    salary: 'R300 per day',
    jobType: 'part-time',
    skillLevel: 'low',
    requiredSkills: [],
    category: 'gardening',
    isActive: true,
  },

  // Unskilled Jobs - Laundry
  {
    title: 'Laundry Services Required',
    description: 'Need someone to do washing, ironing, and folding of clothes. Twice a week, Mondays and Thursdays. Must be detail-oriented and careful with delicate items.',
    company: 'Busy Family - Sandton',
    location: 'Sandton, Johannesburg',
    salary: 'R150 per session',
    jobType: 'part-time',
    skillLevel: 'low',
    requiredSkills: [],
    category: 'laundry',
    isActive: true,
  },
  {
    title: 'Ironing Assistant',
    description: 'Looking for someone skilled in ironing. Large family with lots of laundry. Work from our home, use our equipment. Flexible days, approximately 3-4 hours per session.',
    company: 'Residential - Roodepoort',
    location: 'Roodepoort',
    salary: 'R120 per session',
    jobType: 'temporary',
    skillLevel: 'low',
    requiredSkills: [],
    category: 'laundry',
    isActive: true,
  },

  // Skilled Jobs - Plumbing
  {
    title: 'Plumber for Home Repairs',
    description: 'Need an experienced plumber to fix leaking taps, repair toilet, and check water pressure issues. Must bring own tools. Estimated 3-4 hours work.',
    company: 'Homeowner - Pretoria',
    location: 'Pretoria',
    salary: 'R500-700',
    jobType: 'temporary',
    skillLevel: 'medium',
    requiredSkills: ['Plumbing', 'Pipe Repair', 'Leak Detection'],
    category: 'construction',
    isActive: true,
  },
  {
    title: 'Plumbing Assistant Needed',
    description: 'Established plumber looking for an assistant. Will train on the job. Must be reliable, have own transport, and willing to learn. Full-time opportunity.',
    company: 'ABC Plumbing Services',
    location: 'Johannesburg CBD',
    salary: 'R3500-4000 per month',
    jobType: 'full-time',
    skillLevel: 'low',
    requiredSkills: [],
    category: 'construction',
    isActive: true,
  },

  // Skilled Jobs - Electrical
  {
    title: 'Electrician for Wiring Issues',
    description: 'Experienced electrician needed to diagnose and fix electrical problems. Install new light fixtures, fix faulty switches, and check distribution board. Must have certificate of compliance.',
    company: 'Property Owner - Centurion',
    location: 'Centurion',
    salary: 'R800-1000',
    jobType: 'contract',
    skillLevel: 'high',
    requiredSkills: ['Electrical Work', 'Wiring', 'COC Certification'],
    category: 'construction',
    isActive: true,
  },

  // Skilled Jobs - Carpentry
  {
    title: 'Carpenter for Furniture Assembly',
    description: 'Need carpenter to assemble flat-pack furniture and install shelving. Must have experience and own tools. One day job, possibly more work in future.',
    company: 'New Homeowner - Sandton',
    location: 'Sandton',
    salary: 'R600 per day',
    jobType: 'temporary',
    skillLevel: 'medium',
    requiredSkills: ['Carpentry', 'Furniture Assembly'],
    category: 'construction',
    isActive: true,
  },
  {
    title: 'Handyman - General Repairs',
    description: 'Looking for a skilled handyman for various home repairs. Fixing doors, painting, minor carpentry work. Ongoing work available for the right person.',
    company: 'Estate Management - Midrand',
    location: 'Midrand',
    salary: 'R250-300 per hour',
    jobType: 'part-time',
    skillLevel: 'medium',
    requiredSkills: ['General Repairs', 'Painting', 'Basic Carpentry'],
    category: 'construction',
    isActive: true,
  },

  // Hospitality & Retail
  {
    title: 'Kitchen Assistant',
    description: 'Restaurant looking for kitchen assistant. Washing dishes, basic food prep, keeping kitchen clean. No experience required, will train. Weekends only.',
    company: 'Local Restaurant - Rosebank',
    location: 'Rosebank, Johannesburg',
    salary: 'R150 per day + tips',
    jobType: 'part-time',
    skillLevel: 'low',
    requiredSkills: [],
    category: 'hospitality',
    isActive: true,
  },
  {
    title: 'Retail Shop Assistant',
    description: 'Part-time shop assistant needed for small retail store. Customer service, stocking shelves, basic till operation. Flexible hours, ideal for students.',
    company: 'Small Retail Shop - Pretoria',
    location: 'Pretoria CBD',
    salary: 'R120 per day',
    jobType: 'part-time',
    skillLevel: 'low',
    requiredSkills: [],
    category: 'retail',
    isActive: true,
  },

  // Child Care
  {
    title: 'Childminder Needed',
    description: 'Need a reliable childminder for 2 children (ages 3 and 5). Afternoon care, 2pm-6pm, Monday to Friday. Must have references.',
    company: 'Working Parents - Sandton',
    location: 'Sandton',
    salary: 'R2500 per week',
    jobType: 'part-time',
    skillLevel: 'low',
    requiredSkills: [],
    category: 'other',
    isActive: true,
  },

  // Office/Cleaning
  {
    title: 'Office Cleaner - Evening Shift',
    description: 'Cleaner needed for small office building. Empty bins, vacuum, clean bathrooms, and kitchen area. Monday to Friday, 6pm-8pm.',
    company: 'Office Park - Centurion',
    location: 'Centurion',
    salary: 'R140 per day',
    jobType: 'part-time',
    skillLevel: 'low',
    requiredSkills: [],
    category: 'office',
    isActive: true,
  },
  {
    title: 'Building Janitor',
    description: 'Janitor position for apartment complex. General cleaning of common areas, emptying rubbish, basic maintenance tasks. Monday to Friday, morning shift.',
    company: 'Apartment Complex - Randburg',
    location: 'Randburg',
    salary: 'R4500 per month',
    jobType: 'full-time',
    skillLevel: 'low',
    requiredSkills: [],
    category: 'office',
    isActive: true,
  },

  // Moving/Delivery
  {
    title: 'Helper for Moving Day',
    description: 'Need 2-3 people to help with moving furniture and boxes. One day job, heavy lifting required. Saturday, full day (8am-4pm).',
    company: 'Private Individual',
    location: 'Johannesburg North',
    salary: 'R400 for the day',
    jobType: 'temporary',
    skillLevel: 'low',
    requiredSkills: [],
    category: 'other',
    isActive: true,
  },
  {
    title: 'Delivery Driver/Helper',
    description: 'Small business needs delivery helper. Loading/unloading goods, helping with deliveries. Must be physically fit. 3 days a week.',
    company: 'Small Business - Soweto',
    location: 'Soweto',
    salary: 'R180 per day',
    jobType: 'part-time',
    skillLevel: 'low',
    requiredSkills: [],
    category: 'other',
    isActive: true,
  },
];

// Connect to MongoDB and seed the database
const seedDatabase = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/jobportal', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log('Connected to MongoDB');

    // Clear existing jobs
    await Job.deleteMany({});
    console.log('Cleared existing jobs');

    // Insert test jobs
    const result = await Job.insertMany(testJobs);
    console.log(`Successfully added ${result.length} test jobs to the database`);

    // Display summary
    console.log('\nJobs Summary:');
    console.log(`- Unskilled jobs: ${testJobs.filter(j => j.skillLevel === 'low').length}`);
    console.log(`- Medium skill jobs: ${testJobs.filter(j => j.skillLevel === 'medium').length}`);
    console.log(`- High skill jobs: ${testJobs.filter(j => j.skillLevel === 'high').length}`);
    console.log('\nCategories:');
    const categories = {};
    testJobs.forEach(job => {
      categories[job.category] = (categories[job.category] || 0) + 1;
    });
    Object.entries(categories).forEach(([cat, count]) => {
      console.log(`- ${cat}: ${count} jobs`);
    });

    // Close connection
    await mongoose.connection.close();
    console.log('\nDatabase connection closed');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
};

// Run the seed function
seedDatabase();
