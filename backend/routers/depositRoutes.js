// routes/depositRoutes.js
const express = require('express');
const router = express.Router();
const { check } = require('express-validator');
const depositController = require('../controllers/depositController');

// @route   POST api/deposit/create
// @desc    Create a deposit
// @access  Public
router.post(
  '/create',
  [
    check('userId', 'User ID is required').not().isEmpty(),
    check('jumlah', 'Jumlah is required').isNumeric(),
    check('metodePembayaran', 'Metode Pembayaran is required').not().isEmpty(),
  ],
  depositController.createDeposit
);

// @route   GET api/deposit/status/:kodeDeposit
// @desc    Get deposit status
// @access  Public
router.get('/status/:kodeDeposit', depositController.getStatusDeposit);

// @route   PUT api/deposit/cancel/:kodeDeposit
// @desc    Cancel a deposit
// @access  Public
router.put('/cancel/:kodeDeposit', depositController.cancelDeposit);

module.exports = router;