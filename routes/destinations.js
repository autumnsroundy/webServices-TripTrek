const router = require('express').Router();
const { Destination } = require('../models/models');

/* ---------- Helper: validar body de destination ---------- */
function validateDestinationBody(body) {
  if (!body || Object.keys(body).length === 0) {
    return "Request body cannot be empty.";
  }

  if (!body.tripTitle) return "tripTitle is required.";
  if (!body.locationName) return "locationName is required.";

  // notes es opcional
  return null;
}

/* ---------- Get all destinations ---------- */
router.get('/', async (req, res) => {
  try {
    const destinations = await Destination.find();
    res.json(destinations);
  } catch (err) {
    res.status(500).json({ message: 'An error occurred', error: err.message });
  }
});

/* ---------- Create a new destination ---------- */
router.post('/', async (req, res) => {
  const validationError = validateDestinationBody(req.body);
  if (validationError) {
    return res.status(400).json({ message: validationError });
  }

  try {
    const destination = await Destination.create(req.body);
    res.status(201).json(destination);
  } catch (err) {
    res.status(500).json({ message: 'An error occurred', error: err.message });
  }
});

/* ---------- Get one destination by ID ---------- */
router.get('/:id', async (req, res) => {
  try {
    const destination = await Destination.findById(req.params.id);
    if (!destination) return res.status(404).json({ message: 'Destination not found' });
    res.json(destination);
  } catch (err) {
    res.status(400).json({ message: 'Invalid destination ID', error: err.message });
  }
});

/* ---------- Update a destination by ID ---------- */
router.put('/:id', async (req, res) => {
  const validationError = validateDestinationBody(req.body);
  if (validationError) {
    return res.status(400).json({ message: validationError });
  }

  try {
    const destination = await Destination.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!destination) return res.status(404).json({ message: 'Destination not found' });
    res.status(200).json(destination);
  } catch (err) {
    res.status(400).json({ message: 'Invalid destination ID', error: err.message });
  }
});

/* ---------- Delete a destination by ID ---------- */
router.delete('/:id', async (req, res) => {
  try {
    const destination = await Destination.findByIdAndDelete(req.params.id);
    if (!destination) return res.status(404).json({ message: 'Destination not found' });
    res.status(200).json({ message: 'Deletion Successful' });
  } catch (err) {
    res.status(400).json({ message: 'Invalid destination ID', error: err.message });
  }
});

module.exports = router;
