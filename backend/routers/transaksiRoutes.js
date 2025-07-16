const express = require('express');
const router = express.Router();
const transaksiController = require('../controllers/transaksiController');

router.post('/create', transaksiController.createTransaksi);
router.get('/status', transaksiController.getStatusTransaksi);

module.exports = router;