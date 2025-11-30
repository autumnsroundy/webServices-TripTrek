const express = require('express');
const router = express.Router();

router.use('/swagger', require('./swagger'));
router.use('/users', require('./users'));
router.use('/trips', require('./trips'));
router.use('/destinations', require('./destinations'));
router.use('/activities', require('./activities'));

module.exports = router;