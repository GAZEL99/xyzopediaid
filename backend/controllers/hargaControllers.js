const Harga = require('../models/Harga');
const Layanan = require('../models/Layanan');

exports.getAllHarga = async (req, res) => {
  try {
    const harga = await Harga.find({ status: 'active' })
      .populate('serviceId', 'name category');
    
    res.json({ success: true, data: harga });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};