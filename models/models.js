const mongoose = require("mongoose");

// ---------------------
// User Schema & Model
// ---------------------
const userSchema = new mongoose.Schema(
  {
    userName: { type: String, required: true, unique: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true }
  },
  { collection: "users", timestamps: true } // force lowercase collection
);

const User = mongoose.model("User", userSchema);

// ---------------------
// Trip Schema & Model
// ---------------------
const tripSchema = new mongoose.Schema(
  {
    userName: { type: String, required: true },
    tripTitle: { type: String, required: true },
    startDate: { type: String, required: true },
    endDate: { type: String, required: true },
    description: String,
    totalCost: Number
  },
  { collection: "trips", timestamps: true }
);

const Trip = mongoose.model("Trip", tripSchema);

// ---------------------
// Destination Schema & Model
// ---------------------
const destinationSchema = new mongoose.Schema(
  {
    userName: { type: String, required: true },  // link to user
    tripTitle: { type: String, required: true }, // link to trip
    locationName: { type: String, required: true },
    notes: [String] // array of strings for notes
  },
  { collection: "destinations", timestamps: true }
);

const Destination = mongoose.model("Destination", destinationSchema);

// ---------------------
// Activity Schema & Model
// ---------------------
const activitySchema = new mongoose.Schema(
  {
    userName: { type: String, required: true },   // link to user
    tripTitle: { type: String, required: true },  // link to trip
    locationName: String,
    activityName: { type: String, required: true },
    date: String,
    time: String,
    cost: Number
  },
  { collection: "activities", timestamps: true }
);

const Activity = mongoose.model("Activity", activitySchema);

// ---------------------
// Export all models
// ---------------------
module.exports = {
  User,
  Trip,
  Destination,
  Activity
};
