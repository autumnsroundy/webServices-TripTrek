const router = require('express').Router();
const { User } = require('../models/models');

// Get all users
router.get('/', async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: 'An error occurred', error: err.message });
  }
});

// Create a new user
router.post('/', async (req, res) => {
  try {
    const user = await User.create(req.body);
    res.status(201).json(user);
  } catch (err) {
    res.status(500).json({ message: 'An error occurred', error: err.message });
  }
});

// Get user by username
router.get('/:username', async (req, res) => {
  try {
    const user = await User.findOne({ userName: req.params.username });
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json(user);
  } catch (err) {
    res.status(400).json({ message: 'Invalid username', error: err.message });
  }
});

// Update user by username
router.put('/:username', async (req, res) => {
  try {
    const user = await User.findOneAndUpdate({ userName: req.params.username }, req.body, { new: true });
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.status(204).json(user);
  } catch (err) {
    res.status(400).json({ message: 'Invalid username', error: err.message });
  }
});

// Delete user by username
router.delete('/:username', async (req, res) => {
  try {
    const user = await User.findOneAndDelete({ userName: req.params.username });
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.status(204).json({ message: 'Deletion Successful' });
  } catch (err) {
    res.status(400).json({ message: 'Invalid username', error: err.message });
  }
});

module.exports = router;
