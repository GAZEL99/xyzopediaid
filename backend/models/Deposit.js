const mongoose = require('mongoose');

const depositSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  amount: { type: Number, required: true },
  method: { type: String, required: true },
  proof: String,
  status: { 
    type: String, 
    enum: ['pending', 'processing', 'completed', 'cancelled'], 
    default: 'pending' 
  },
  depositId: { type: String, unique: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Deposit', depositSchema);