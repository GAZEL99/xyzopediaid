const express = require('express');
const router = express.Router();
const layananController = require('../controllers/layananController');

router.get('/', layananController.getAllLayanan);

module.exports = router;