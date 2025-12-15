const { Destination, Trip } = require("../models/models");

const getDestinations = async (req, res) => {
  try {
    const trips = await Trip.find({ userName: req.user.userName });
    const tripTitles = trips.map(t => t.tripTitle);
    const destinations = await Destination.find({ tripTitle: { $in: tripTitles } });
    res.json(destinations);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getDestinationById = async (req, res) => {
  try {
    const destination = await Destination.findById(req.params.id);
    if (!destination) return res.status(404).json({ message: "Destination not found" });

    const trip = await Trip.findOne({ tripTitle: destination.tripTitle, userName: req.user.userName });
    if (!trip) return res.status(403).json({ message: "Forbidden" });

    res.json(destination);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const createDestination = async (req, res) => {
  try {
    const trip = await Trip.findOne({ tripTitle: req.body.tripTitle, userName: req.user.userName });
    if (!trip) return res.status(403).json({ message: "Forbidden" });

    const destination = new Destination({
      tripTitle: trip.tripTitle,
      userName: req.user.userName,
      locationName: req.body.locationName,
      notes: req.body.notes || []
    });

    await destination.save();
    res.status(201).json(destination);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const updateDestination = async (req, res) => {
  try {
    const destination = await Destination.findById(req.params.id);
    if (!destination) return res.status(404).json({ message: "Destination not found" });

    const trip = await Trip.findOne({ tripTitle: destination.tripTitle, userName: req.user.userName });
    if (!trip) return res.status(403).json({ message: "Forbidden" });

    Object.assign(destination, req.body);
    await destination.save();
    res.json(destination);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const deleteDestination = async (req, res) => {
  try {
    const destination = await Destination.findById(req.params.id);
    if (!destination) return res.status(404).json({ message: "Destination not found" });

    const trip = await Trip.findOne({ tripTitle: destination.tripTitle, userName: req.user.userName });
    if (!trip) return res.status(403).json({ message: "Forbidden" });

    await destination.deleteOne();
    res.json({ message: "Deletion Successful" });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

module.exports = { getDestinations, getDestinationById, createDestination, updateDestination, deleteDestination };
