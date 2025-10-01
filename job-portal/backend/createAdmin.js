const mongoose = require('mongoose');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '..', '.env') });
const User = require('./src/models/User');

const createAdminUser = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/jobportal', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log('Connected to MongoDB');

    // Check if admin already exists
    const existingAdmin = await User.findOne({ email: 'admin@jobportal.com' });
    
    if (existingAdmin) {
      console.log('Admin user already exists!');
      console.log('Email: admin@jobportal.com');
      console.log('ID Number: ADMIN001');
      await mongoose.connection.close();
      process.exit(0);
    }

    // Create admin user
    const adminUser = new User({
      idNumber: 'ADMIN001',
      email: 'admin@jobportal.com',
      password: 'admin123', // Will be hashed by the model
      firstName: 'Admin',
      lastName: 'User',
      phone: '0000000000',
      isVerified: true,
      experienceLevel: 'experienced'
    });

    await adminUser.save();

    console.log('✅ Admin user created successfully!');
    console.log('\n--- Admin Credentials ---');
    console.log('Email: admin@jobportal.com');
    console.log('ID Number: ADMIN001');
    console.log('Password: admin123');
    console.log('-------------------------\n');
    console.log('You can now login at: http://localhost:3000/login');

    await mongoose.connection.close();
    console.log('\nDatabase connection closed');
    process.exit(0);
  } catch (error) {
    console.error('Error creating admin user:', error);
    process.exit(1);
  }
};

createAdminUser();
