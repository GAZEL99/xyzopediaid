// models/Layanan.js
const mongoose = require('mongoose');

const LayananSchema = new mongoose.Schema({
  nama: {
    type: String,
    required: true,
  },
  kategori: {
    type: String,
    required: true,
    enum: ['Streaming', 'Musik', 'Produktivitas', 'Sosial Media', 'Lainnya'],
  },
  gambar: {
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

module.exports = mongoose.model('Layanan', LayananSchema);