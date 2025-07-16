const express = require('express');
const router = express.Router();
const hargaController = require('../controllers/hargaController');

router.get('/', hargaController.getAllHarga);

module.exports = router;