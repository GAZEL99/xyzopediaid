// models/Transaksi.js
const mongoose = require('mongoose');

const TransaksiSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  layananId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Layanan',
    required: true,
  },
  hargaId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Harga',
    required: true,
  },
  jumlah: {
    type: Number,
    required: true,
  },
  totalHarga: {
    type: Number,
    required: true,
  },
  metodePembayaran: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ['pending', 'success', 'failed', 'canceled'],
    default: 'pending',
  },
  kodeTransaksi: {
    type: String,
    unique: true,
  },
  tanggalTransaksi: {
    type: Date,
    default: Date.now,
  },
  tanggalSelesai: {
    type: Date,
  },
});

module.exports = mongoose.model('Transaksi', TransaksiSchema);