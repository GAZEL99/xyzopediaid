const Layanan = require('../models/Layanan');

exports.getAllLayanan = async (req, res) => {
  try {
    const layanan = await Layanan.find({ status: 'active' });
    res.json({ success: true, data: layanan });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};