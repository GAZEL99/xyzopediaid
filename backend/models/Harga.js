// models/Harga.js
const mongoose = require('mongoose');

const HargaSchema = new mongoose.Schema({
  layananId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Layanan',
    required: true,
  },
  namaPaket: {
    type: String,
    required: true,
  },
  harga: {
    type: Number,
    required: true,
  },
  hargaPromo: {
    type: Number,
  },
  durasi: {
    type: String,
    required: true,
  },
  deskripsi: {
    type: String,
  },
  status: {
    type: Boolean,
    default: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Harga', HargaSchema);