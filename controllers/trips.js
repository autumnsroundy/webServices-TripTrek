const { Trip } = require('../models/models');

/* ---------- Helper: validate trip body ---------- */
function validateTripBody(body) {
  if (!body || Object.keys(body).length === 0) {
    return "Request body cannot be empty.";
  }
  if (!body.tripTitle) return "tripTitle is required.";
  if (!body.startDate) return "startDate is required.";
  if (!body.endDate) return "endDate is required.";
  return null; // valid
}

// GET /trips → get all trips for logged-in user
const getAllTrips = async (req, res) => {
  console.log("REQ.USER:", req.user);
  try {
    const trips = await Trip.find({ userName: req.user.userName });
    res.json(trips);
  } catch (err) {
    res.status(500).json({ message: 'An error occurred', error: err.message });
  }
};

// GET /trips/:id → get a single trip by ID (only if owned by user)
const getTripById = async (req, res) => {
  try {
    const trip = await Trip.findOne({ _id: req.params.id, userName: req.user.userName });
    if (!trip) return res.status(404).json({ message: 'Trip not found' });
    res.json(trip);
  } catch (err) {
    res.status(400).json({ message: 'Invalid trip ID', error: err.message });
  }
};

// POST /trips → create a new trip (assign to logged-in user)
const createNewTrip = async (req, res) => {
  const validationError = validateTripBody(req.body);
  if (validationError) return res.status(400).json({ message: validationError });

  try {
    const newTrip = new Trip({
      ...req.body,
      userName: req.user.userName // attach current user
    });
    await newTrip.save();
    res.status(201).json(newTrip);
  } catch (err) {
    res.status(500).json({ message: 'An error occurred', error: err.message });
  }
};

// PUT /trips/:id → update a trip (partial updates allowed)
const updateTrip = async (req, res) => {
  try {
    const updatedTrip = await Trip.findOneAndUpdate(
      { _id: req.params.id, userName: req.user.userName },
      req.body,
      { new: true, runValidators: true }
    );
    if (!updatedTrip) return res.status(404).json({ message: 'Trip not found' });
    res.status(200).json(updatedTrip);
  } catch (err) {
    res.status(400).json({ message: 'Invalid trip ID or data', error: err.message });
  }
};

// DELETE /trips/:id → delete a trip (only if owned by user)
const deleteTrip = async (req, res) => {
  try {
    const deletedTrip = await Trip.findOneAndDelete({ _id: req.params.id, userName: req.user.userName });
    if (!deletedTrip) return res.status(404).json({ message: 'Trip not found' });
    res.status(200).json({ message: 'Deletion Successful' });
  } catch (err) {
    res.status(400).json({ message: 'Invalid trip ID', error: err.message });
  }
};

module.exports = {
  getAllTrips,
  getTripById,
  createNewTrip,
  updateTrip,
  deleteTrip
};
