const { Activity, Trip } = require("../models/models");

const getActivitiesByTrip = async (req, res) => {
  try {
    const trip = await Trip.findOne({ tripTitle: req.params.tripTitle, userName: req.user.userName });
    if (!trip) return res.status(403).json({ message: "Forbidden" });

    const activities = await Activity.find({ tripTitle: trip.tripTitle });
    res.json(activities);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getActivityById = async (req, res) => {
  try {
    const activity = await Activity.findById(req.params.id);
    if (!activity) return res.status(404).json({ message: "Activity not found" });

    const trip = await Trip.findOne({ tripTitle: activity.tripTitle, userName: req.user.userName });
    if (!trip) return res.status(403).json({ message: "Forbidden" });

    res.json(activity);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const createActivity = async (req, res) => {
  try {
    const trip = await Trip.findOne({ tripTitle: req.body.tripTitle, userName: req.user.userName });
    if (!trip) return res.status(403).json({ message: "Forbidden" });

    const activity = new Activity({
      tripTitle: trip.tripTitle,
      userName: req.user.userName,
      locationName: req.body.locationName,
      activityName: req.body.activityName,
      date: req.body.date,
      time: req.body.time,
      cost: req.body.cost
    });

    await activity.save();
    res.status(201).json(activity);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const updateActivity = async (req, res) => {
  try {
    const activity = await Activity.findById(req.params.id);
    if (!activity) return res.status(404).json({ message: "Activity not found" });

    const trip = await Trip.findOne({ tripTitle: activity.tripTitle, userName: req.user.userName });
    if (!trip) return res.status(403).json({ message: "Forbidden" });

    Object.assign(activity, req.body);
    await activity.save();
    res.json(activity);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const deleteActivity = async (req, res) => {
  try {
    const activity = await Activity.findById(req.params.id);
    if (!activity) return res.status(404).json({ message: "Activity not found" });

    const trip = await Trip.findOne({ tripTitle: activity.tripTitle, userName: req.user.userName });
    if (!trip) return res.status(403).json({ message: "Forbidden" });

    await activity.deleteOne();
    res.json({ message: "Deletion Successful" });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

module.exports = { getActivitiesByTrip, getActivityById, createActivity, updateActivity, deleteActivity };
