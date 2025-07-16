// routes/hargaRoutes.js
const express = require('express');
const router = express.Router();
const hargaController = require('../controllers/hargaController');

// @route   GET api/list-harga
// @desc    Get all harga
// @access  Public
router.get('/', hargaController.getListHarga);

module.exports = router;