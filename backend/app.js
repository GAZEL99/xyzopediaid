// app.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const connectDB = require('./config/db');

// Initialize Express
const app = express();

// Connect to Database
connectDB();

// Middleware
app.use(cors());
app.use(express.json());

// Define Routes
app.use('/api/layanan', require('./routes/layananRoutes'));
app.use('/api/list-harga', require('./routes/hargaRoutes'));
app.use('/api/transaksi', require('./routes/transaksiRoutes'));
app.use('/api/deposit', require('./routes/depositRoutes'));

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ success: false, message: 'Internal Server Error' });
});

module.exports = app;