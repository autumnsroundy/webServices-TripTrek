const express = require('express');
const mongoose = require('mongoose');
const app = express();
require('dotenv').config();

const PORT = process.env.PORT || 3000;

// === Connect to MongoDB ===
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('✅ Connected to MongoDB'))
.catch(err => console.error('❌ MongoDB connection error:', err));

// Import models 
const { User, Trip, Destination, Activity } = require('./models/models');

// === Basic route ===
app.get('/', (req, res) => {
  res.send('Hello, TripTrek!');
});

// === Start Server ===
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

// Test Rute to create an user 
app.post('/api/users', async (req, res) => {
  try {
    const user = await User.create(req.body);
    res.status(201).json({ 
      success: true, 
      message: 'User created successfully', 
      data: user 
    });
  } catch (error) {
    res.status(400).json({ 
      success: false, 
      message: error.message 
    });
  }
});

// Rute to obtain all users 
app.get('/api/users', async (req, res) => {
  try {
    const users = await User.find();
    res.json({ 
      success: true, 
      data: users 
    });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      message: error.message 
    });
  }
});

//  Start Server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});