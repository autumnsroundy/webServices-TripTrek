const router = require("express").Router();
const destinationsController = require("../controllers/destinations");

function isAuthenticated(req, res, next) {
  if (req.isAuthenticated()) return next();
  res.status(401).json({ message: "Unauthorized" });
}

// Public routes
router.get("/", destinationsController.getDestinations);
router.get("/:id", destinationsController.getDestinationById);

// Protected routes
router.post("/", isAuthenticated, destinationsController.createDestination);
router.put("/:id", isAuthenticated, destinationsController.updateDestination);
router.delete("/:id", isAuthenticated, destinationsController.deleteDestination);

module.exports = router;
