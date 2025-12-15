const router = require("express").Router();
const activitiesController = require("../controllers/activities");

function isAuthenticated(req, res, next) {
  if (req.isAuthenticated()) return next();
  res.status(401).json({ message: "Unauthorized" });
}

// Protect all activity routes
router.use(isAuthenticated);

router.get("/:tripId", activitiesController.getActivitiesByTrip);
router.get("/activity/:id", activitiesController.getActivityById);
router.post("/", activitiesController.createActivity);
router.put("/:id", activitiesController.updateActivity);
router.delete("/:id", activitiesController.deleteActivity);

module.exports = router;
