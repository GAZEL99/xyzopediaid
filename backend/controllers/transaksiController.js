// controllers/transaksiController.js
const Transaksi = require('../models/Transaksi');
const config = require('../config/config');
const { validationResult } = require('express-validator');
const shortid = require('shortid');

exports.createTransaksi = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    // Verify API key
    if (req.headers['x-api-key'] !== config.API_KEY) {
      return res.status(401).json({ success: false, message: 'Unauthorized' });
    }

    const { userId, layananId, hargaId, jumlah, metodePembayaran } = req.body;

    // Get harga information
    const harga = await Harga.findById(hargaId);
    if (!harga) {
      return res.status(404).json({ success: false, message: 'Harga not found' });
    }

    const totalHarga = harga.hargaPromo ? harga.hargaPromo * jumlah : harga.harga * jumlah;

    const newTransaksi = new Transaksi({
      userId,
      layananId,
      hargaId,
      jumlah,
      totalHarga,
      metodePembayaran,
      kodeTransaksi: `TRX-${shortid.generate()}`,
    });

    await newTransaksi.save();

    res.json({ 
      success: true, 
      data: newTransaksi,
      message: 'Transaksi created successfully' 
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ success: false, message: 'Server Error' });
  }
};

exports.getStatusTransaksi = async (req, res) => {
  try {
    // Verify API key
    if (req.headers['x-api-key'] !== config.API_KEY) {
      return res.status(401).json({ success: false, message: 'Unauthorized' });
    }

    const { kodeTransaksi } = req.params;

    const transaksi = await Transaksi.findOne({ kodeTransaksi })
      .populate('layananId', 'nama')
      .populate('hargaId', 'namaPaket harga hargaPromo durasi');

    if (!transaksi) {
      return res.status(404).json({ success: false, message: 'Transaksi not found' });
    }

    res.json({ success: true, data: transaksi });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ success: false, message: 'Server Error' });
  }
};