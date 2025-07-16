// routes/layananRoutes.js
const express = require('express');
const router = express.Router();
const layananController = require('../controllers/layananController');

// @route   GET api/layanan
// @desc    Get all layanan
// @access  Public
router.get('/', layananController.getLayanan);

module.exports = router;