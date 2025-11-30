const { Activity } = require('../models/models');

/* ---------- Helper: validar body de activity ---------- */
function validateActivityBody(body) {
  if (!body || Object.keys(body).length === 0) {
    return "Request body cannot be empty.";
  }

  if (!body.tripTitle) return "tripTitle is required.";
  if (!body.locationName) return "locationName is required.";
  if (!body.activityName) return "activityName is required.";
  if (!body.date) return "date is required.";

  return null; 
};

const getAllActivities = async (req, res) => {
  try {
    const activities = await Activity.find();
    res.json(activities);
  } catch (err) {
    res.status(500).json({ message: 'An error occurred', error: err.message });
  }
};
    
const getActivityByID = async (req, res) => {
  try {
    const activity = await Activity.findById(req.params.id);
    if (!activity) return res.status(404).json({ message: 'Activity not found' });
    res.json(activity);
  } catch (err) {
    res.status(400).json({ message: 'Invalid activity ID', error: err.message });
  }
};

const createNewActivity = async (req, res) => {
  const validationError = validateActivityBody(req.body);
  if (validationError) {
    return res.status(400).json({ message: validationError });
  }

  try {
    const activity = await Activity.create(req.body);
    res.status(201).json(activity);

  } catch (err) {
    // ⭐ Manejo del error de validación de Mongoose ⭐
    if (err.name === "ValidationError") {
      return res.status(400).json({
        message: "Validation error",
        details: err.errors
      });
    }

    res.status(500).json({ message: 'An error occurred', error: err.message });
  }
};

const updateActivity = async (req, res) => {
  const validationError = validateActivityBody(req.body);
  if (validationError) {
    return res.status(400).json({ message: validationError });
  }

  try {
    const activity = await Activity.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!activity) return res.status(404).json({ message: 'Activity not found' });
    res.status(200).json(activity);

  } catch (err) {
    // ⭐ igual que en POST, manejamos ValidationError ⭐
    if (err.name === "ValidationError") {
      return res.status(400).json({
        message: "Validation error",
        details: err.errors
      });
    }

    res.status(400).json({ message: 'Invalid activity ID', error: err.message });
  }
};

const deleteActivity = async (req, res) => {
  try {
    const activity = await Activity.findByIdAndDelete(req.params.id);
    if (!activity) return res.status(404).json({ message: 'Activity not found' });
    res.status(200).json({ message: 'Deletion Successful' });
  } catch (err) {
    res.status(400).json({ message: 'Invalid activity ID', error: err.message });
  }
};

module.exports = {
    getAllActivities,
    getActivityByID,
    createNewActivity,
    updateActivity,
    deleteActivity
};