const router = require('express').Router();
const tripsController = require('../controllers/trips');

function isAuthenticated(req, res, next) {
  if (req.isAuthenticated()) return next();
  res.status(401).json({ message: "Unauthorized" });
}

// Protect all trip routes
router.use(isAuthenticated);

router.get('/', tripsController.getAllTrips);
router.get('/:id', tripsController.getTripById);
router.post('/', tripsController.createNewTrip);
router.put('/:id', tripsController.updateTrip);
router.delete('/:id', tripsController.deleteTrip);

module.exports = router;
