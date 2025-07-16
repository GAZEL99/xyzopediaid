const mongoose = require('mongoose');

const transaksiSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  serviceId: { type: mongoose.Schema.Types.ObjectId, ref: 'Layanan', required: true },
  priceId: { type: mongoose.Schema.Types.ObjectId, ref: 'Harga', required: true },
  quantity: { type: Number, required: true },
  totalPrice: { type: Number, required: true },
  target: String,
  status: { 
    type: String, 
    enum: ['pending', 'processing', 'completed', 'failed'], 
    default: 'pending' 
  },
  orderId: { type: String, unique: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Transaksi', transaksiSchema);