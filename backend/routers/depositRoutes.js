const express = require('express');
const router = express.Router();
const depositController = require('../controllers/depositController');

router.post('/create', depositController.createDeposit);
router.get('/status', depositController.getStatusDeposit);
router.post('/cancel', depositController.cancelDeposit);

module.exports = router;