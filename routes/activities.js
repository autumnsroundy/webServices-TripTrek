const router = require('express').Router();
const activitiesController = require('../controllers/activities');

router.get('/', activitiesController.getAllActivities);
router.get('/:id', activitiesController.getActivityByID);
router.post('/', activitiesController.createNewActivity);
router.put('/:id', activitiesController.updateActivity);
router.delete('/:id', activitiesController.deleteActivity);

module.exports = router;