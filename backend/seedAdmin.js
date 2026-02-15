const mongoose = require('mongoose');
const User = require('./models/User'); // Ensure this path is correct
require('dotenv').config();

const seedAdmin = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("Connected to DB...");

    // Clear existing users if you want a fresh start
    await User.deleteMany({});

    const admin = new User({
      username: 'gautham', // Your login username
      password: 'gautham123' // The model hashes this automatically
    });

    await admin.save();
    console.log("✅ Admin user 'gautham' created successfully.");
    process.exit();
  } catch (err) {
    console.error("❌ Error seeding user:", err);
    process.exit(1);
  }
};

seedAdmin();