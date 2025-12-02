const express = require('express');
const router = new express.Router();
const utilities = require('../utilities');
const mapsCont = require('../controllers/mapsController');

router.use('/maps', utilities.handleErrors(mapsCont.buildMaps));