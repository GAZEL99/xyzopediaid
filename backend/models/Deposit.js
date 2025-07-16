// models/Deposit.js
const mongoose = require('mongoose');

const DepositSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  jumlah: {
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
  kodeDeposit: {
    type: String,
    unique: true,
  },
  tanggalDeposit: {
    type: Date,
    default: Date.now,
  },
  tanggalSelesai: {
    type: Date,
  },
});

module.exports = mongoose.model('Deposit', DepositSchema);