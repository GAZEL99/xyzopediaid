// controllers/hargaController.js
const Harga = require('../models/Harga');
const Layanan = require('../models/Layanan');
const config = require('../config/config');

exports.getListHarga = async (req, res) => {
  try {
    // Verify API key
    if (req.headers['x-api-key'] !== config.API_KEY) {
      return res.status(401).json({ success: false, message: 'Unauthorized' });
    }

    const harga = await Harga.find({ status: true })
      .populate('layananId', 'nama kategori gambar')
      .select('-__v');

    res.json({ success: true, data: harga });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ success: false, message: 'Server Error' });
  }
};