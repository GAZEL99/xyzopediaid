// controllers/layananController.js
const Layanan = require('../models/Layanan');
const config = require('../config/config');
const { validationResult } = require('express-validator');

exports.getLayanan = async (req, res) => {
  try {
    // Verify API key
    if (req.headers['x-api-key'] !== config.API_KEY) {
      return res.status(401).json({ success: false, message: 'Unauthorized' });
    }

    const layanan = await Layanan.find({ status: true }).select('-__v');
    res.json({ success: true, data: layanan });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ success: false, message: 'Server Error' });
  }
};