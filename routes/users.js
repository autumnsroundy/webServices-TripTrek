const router = require("express").Router();
const usersController = require("../controllers/users");
const passport = require("passport");

function isAuthenticated(req, res, next) {
  if (req.isAuthenticated()) return next();
  res.status(401).json({ message: "Unauthorized" });
}

// Public routes
router.post("/", usersController.createNewUser);
router.post("/login", passport.authenticate("local"), (req, res) => {
  res.json({ message: "Login successful", user: req.user });
});

// Protected routes
router.get("/", isAuthenticated, usersController.getAllUsers);
router.get("/:username", isAuthenticated, usersController.getUserByUserName);
router.put("/:username", isAuthenticated, usersController.updateUser);
router.delete("/:username", isAuthenticated, usersController.deleteUser);

module.exports = router;
