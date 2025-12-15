const express = require('express');
const router = express.Router();

// Static Routes
// Set up "public" folder / subfolders for static files
router.use(express.static("public"));
router.use("/css", express.static(__dirname + "public/css"));
router.use("/js", express.static(__dirname + "public/js"));
router.use("/images", express.static(__dirname + "public/images"));

// Home Route
router.get('/dashboard', (req, res) => {
  if (!req.isAuthenticated()) {
    return res.redirect('/');
  }
  res.render('dashboard', { user: req.user });
});

// All other Routes
router.use('/swagger', require('./swagger'));
router.use('/users', require('./users'));
router.use('/trips', require('./trips'));
router.use('/destinations', require('./destinations'));
router.use('/activities', require('./activities'));

module.exports = router;