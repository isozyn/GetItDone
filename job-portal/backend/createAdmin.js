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

    // Remove all current admins
    const removedAdmins = await User.deleteMany({ isAdmin: true });
    console.log(`Removed ${removedAdmins.deletedCount} admin(s).`);

    // Remove any user with idNumber 'ADMIN001'
    const removedById = await User.deleteMany({ idNumber: 'ADMIN001' });
    if (removedById.deletedCount > 0) {
      console.log(`Removed ${removedById.deletedCount} user(s) with idNumber 'ADMIN001'.`);
    }

    // Create new admin user
    const adminUser = new User({
      idNumber: 'ADMIN001',
      email: 'admin@jobportal.com',
      password: 'admin123', // Will be hashed by the model
      firstName: 'Admin',
      lastName: 'User',
      phone: '0000000000',
      isVerified: true,
      experienceLevel: 'experienced',
      isAdmin: true
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
