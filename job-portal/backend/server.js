const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '..', '.env') });

const authRoutes = require('./src/routes/authRoutes');
const jobRoutes = require('./src/routes/jobRoutes');
const userRoutes = require('./src/routes/userRoutes');
const ngoRoutes = require('./src/routes/ngoRoutes');
const adminRoutes = require('./src/routes/adminRoutes');
const express = require('express');

const app = express();

// Middleware
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true
}));
app.use(express.json());

// Database connection
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/jobportal', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/jobs', jobRoutes);
app.use('/api/users', userRoutes);
app.use('/api/ngo', ngoRoutes);
app.use('/api/admin', adminRoutes);

// Demo endpoint for class details per user/class
app.get('/api/classes/:className/user/:userId', async (req, res) => {
  // Replace with real DB logic as needed
  const mockData = {
    housekeeping: { times: ['Mon 10:00-12:00', 'Wed 14:00-16:00'], marks: 85 },
    gardening: { times: ['Tue 09:00-11:00', 'Thu 13:00-15:00'], marks: 90 },
    laundry: { times: ['Fri 10:00-12:00'], marks: 78 },
    construction: { times: ['Mon 13:00-15:00'], marks: 88 },
    office: { times: ['Wed 09:00-11:00'], marks: 92 },
    retail: { times: ['Thu 10:00-12:00'], marks: 80 },
    hospitality: { times: ['Fri 14:00-16:00'], marks: 87 },
    other: { times: ['Sat 10:00-12:00'], marks: 75 }
  };
  const { className } = req.params;
  // In a real app, fetch marks for userId/className from DB
  res.json(mockData[className] || { times: [], marks: 'N/A' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});