const router = require('express').Router();
const { Trip } = require('../models/models');

/* ---------- Helper: validar body de trip ---------- */
function validateTripBody(body) {
  if (!body || Object.keys(body).length === 0) return "Request body cannot be empty.";
  if (!body.userName) return "userName is required.";
  if (!body.tripTitle) return "tripTitle is required.";  // OBLIGATORIO
  if (!body.startDate) return "startDate is required.";
  if (!body.endDate) return "endDate is required.";
  return null;
}


/* ---------- Get all trips ---------- */
router.get('/', async (req, res) => {
  try {
    const trips = await Trip.find();
    res.json(trips);
  } catch (err) {
    res.status(500).json({ message: 'An error occurred', error: err.message });
  }
});

/* ---------- Create a new trip ---------- */
router.post('/', async (req, res) => {
  const validationError = validateTripBody(req.body);
  if (validationError) {
    return res.status(400).json({ message: validationError });
  }

  try {
    const trip = await Trip.create(req.body);
    res.status(201).json(trip);
  } catch (err) {
    res.status(400).json({ message: 'Validation failed', error: err.message });
  }
});

/* ---------- Get trip by ID ---------- */
router.get('/:id', async (req, res) => {
  try {
    const trip = await Trip.findById(req.params.id);
    if (!trip) return res.status(404).json({ message: 'Trip not found' });
    res.json(trip);
  } catch (err) {
    res.status(400).json({ message: 'Invalid trip ID', error: err.message });
  }
});

/* ---------- Update trip by ID ---------- */
router.put('/:id', async (req, res) => {
  const validationError = validateTripBody(req.body);
  if (validationError) {
    return res.status(400).json({ message: validationError });
  }

  try {
    const trip = await Trip.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!trip) return res.status(404).json({ message: 'Trip not found' });
    res.status(200).json(trip);
  } catch (err) {
    res.status(400).json({ message: 'Invalid trip ID', error: err.message });
  }
});

/* ---------- Delete trip by ID ---------- */
router.delete('/:id', async (req, res) => {
  try {
    const trip = await Trip.findByIdAndDelete(req.params.id);
    if (!trip) return res.status(404).json({ message: 'Trip not found' });
    res.status(200).json({ message: 'Deletion Successful' });
  } catch (err) {
    res.status(400).json({ message: 'Invalid trip ID', error: err.message });
  }
});

module.exports = router;
