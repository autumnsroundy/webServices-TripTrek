const router = require('express').Router();
const { Trip } = require('../models/models');

// Get all trips
router.get('/', async (req, res) => {
  try {
    const trips = await Trip.find();
    res.json(trips);
  } catch (err) {
    res.status(500).json({ message: 'An error occurred', error: err.message });
  }
});

// Create a new trip
router.post('/', async (req, res) => {
  try {
    const trip = await Trip.create(req.body);
    res.status(201).json(trip);
  } catch (err) {
    res.status(500).json({ message: 'An error occurred', error: err.message });
  }
});

// Get trip by ID
router.get('/:id', async (req, res) => {
  try {
    const trip = await Trip.findById(req.params.id);
    if (!trip) return res.status(404).json({ message: 'Trip not found' });
    res.json(trip);
  } catch (err) {
    res.status(400).json({ message: 'Invalid trip ID', error: err.message });
  }
});

// Update trip by ID
router.put('/:id', async (req, res) => {
  try {
    const trip = await Trip.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!trip) return res.status(404).json({ message: 'Trip not found' });
    res.status(204).json(trip);
  } catch (err) {
    res.status(400).json({ message: 'Invalid trip ID', error: err.message });
  }
});

// Delete trip by ID
router.delete('/:id', async (req, res) => {
  try {
    const trip = await Trip.findByIdAndDelete(req.params.id);
    if (!trip) return res.status(404).json({ message: 'Trip not found' });
    res.status(204).json({ message: 'Deletion Successful' });
  } catch (err) {
    res.status(400).json({ message: 'Invalid trip ID', error: err.message });
  }
});

module.exports = router;
