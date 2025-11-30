const router = require('express').Router();
const tripsController = require('../controllers/trips');

router.get('/', tripsController.getAllTrips);
router.get('/:id', tripsController.getTripByID);
router.post('/', tripsController.createNewTrip);
router.put('/:id', tripsController.updateTrip);
router.delete('/:id', tripsController.deleteTrip);

module.exports = router;
