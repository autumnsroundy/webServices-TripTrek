const { User } = require('../models/models');

/* ---------- Helper: validar body ---------- */
function validateUserBody(body) {
  if (!body || Object.keys(body).length === 0) {
    return "Request body cannot be empty.";
  }

  if (!body.userName) return "userName is required.";
  if (!body.firstName) return "firstName is required.";
  if (!body.lastName) return "lastName is required.";
  if (!body.email) return "email is required.";
  if (!body.password) return "password is required.";

  return null; // válido
}

const getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: 'An error occurred', error: err.message });
  }
};

const getUserByUserName = async (req, res) => {
  try {
    const user = await User.findOne({ userName: req.params.username });
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json(user);
  } catch (err) {
    res.status(400).json({ message: 'Invalid username', error: err.message });
  }
};

const createNewUser = async (req, res) => {
  const validationError = validateUserBody(req.body);
  if (validationError) {
    return res.status(400).json({ message: validationError });
  }
  try {
    const user = await User.create(req.body);
    res.status(201).json(user);
  } catch (err) {
    res.status(500).json({ message: 'An error occurred', error: err.message });
  }
};

const updateUser = async (req, res) => {
  const validationError = validateUserBody(req.body);
  if (validationError) {
    return res.status(400).json({ message: validationError });
  }

  try {
    const user = await User.findOneAndUpdate(
      { userName: req.params.username },
      req.body,
      { new: true }
    );
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.status(200).json(user);
  } catch (err) {
    res.status(400).json({ message: 'Invalid username', error: err.message });
  }
};

const deleteUser = async (req, res) => {
  try {
    const user = await User.findOneAndDelete({ userName: req.params.username });
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.status(200).json({ message: 'Deletion Successful' });
  } catch (err) {
    res.status(400).json({ message: 'Invalid username', error: err.message });
  }
};

module.exports = { 
    getAllUsers, 
    getUserByUserName, 
    createNewUser, 
    updateUser, 
    deleteUser 
};
