const mongoose = require('mongoose');

// User Schema
const userSchema = new mongoose.Schema({
  userName: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  firstName: {
    type: String,
    required: true,
    trim: true
  },
  lastName: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  password: {
    type: String,
    required: true
  }
}, { timestamps: true });

// Trip Schema
const tripSchema = new mongoose.Schema({
  userName: {
    type: String,
    required: true,
    ref: 'User'
  },
  tripTitle: {
    type: String,
    required: true,
    trim: true
  },
  startDate: {
    type: Date,
    required: true
  },
  endDate: {
    type: Date,
    required: true
  },
  description: String,
  totalCost: {
    type: Number,
    default: 0
  },
  notes: [String]
}, { timestamps: true });

// Destination Schema
const destinationSchema = new mongoose.Schema({
  tripTitle: { type: String, required: true },
  locationName: { type: String },  // ← required: false
  notes: [String]
});

// Activity Schema
const activitySchema = new mongoose.Schema({
  tripTitle: {
    type: String,
    required: true,
    ref: 'Trip'
  },
  locationName: {
    type: String,
    required: true,
    trim: true
  },
  activityName: {
    type: String,
    required: true,
    trim: true
  },
  date: {
    type: Date,
    required: true
  },
  time: String,
  cost: {
    type: Number,
    default: 0
  }
}, { timestamps: true });


const User = mongoose.model('User', userSchema);
const Trip = mongoose.model('Trip', tripSchema);
const Destination = mongoose.model('Destination', destinationSchema);
const Activity = mongoose.model('Activity', activitySchema);

module.exports = {
  User,
  Trip,
  Destination,
  Activity
};