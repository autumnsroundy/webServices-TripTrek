const router = require('express').Router();
const destinationsController = require('../controllers/destinations');

router.get('/', destinationsController.getAllDestinations);
router.get('/:id', destinationsController.getDestinationByID);
router.post('/', destinationsController.createNewDestination);
router.put('/:id', destinationsController.updateDestination);
router.delete('/:id', destinationsController.deleteDestination);

module.exports = router;