const mongoose = require('mongoose');

const hargaSchema = new mongoose.Schema({
  serviceId: { type: mongoose.Schema.Types.ObjectId, ref: 'Layanan', required: true },
  name: { type: String, required: true },
  price: { type: Number, required: true },
  minQuantity: { type: Number, required: true },
  maxQuantity: { type: Number, required: true },
  description: String,
  status: { type: String, enum: ['active', 'inactive'], default: 'active' },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Harga', hargaSchema);