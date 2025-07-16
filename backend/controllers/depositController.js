// controllers/depositController.js
const Deposit = require('../models/Deposit');
const config = require('../config/config');
const { validationResult } = require('express-validator');
const shortid = require('shortid');

exports.createDeposit = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    // Verify API key
    if (req.headers['x-api-key'] !== config.API_KEY) {
      return res.status(401).json({ success: false, message: 'Unauthorized' });
    }

    const { userId, jumlah, metodePembayaran } = req.body;

    const newDeposit = new Deposit({
      userId,
      jumlah,
      metodePembayaran,
      kodeDeposit: `DEP-${shortid.generate()}`,
    });

    await newDeposit.save();

    res.json({ 
      success: true, 
      data: newDeposit,
      message: 'Deposit created successfully' 
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ success: false, message: 'Server Error' });
  }
};

exports.getStatusDeposit = async (req, res) => {
  try {
    // Verify API key
    if (req.headers['x-api-key'] !== config.API_KEY) {
      return res.status(401).json({ success: false, message: 'Unauthorized' });
    }

    const { kodeDeposit } = req.params;

    const deposit = await Deposit.findOne({ kodeDeposit });

    if (!deposit) {
      return res.status(404).json({ success: false, message: 'Deposit not found' });
    }

    res.json({ success: true, data: deposit });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ success: false, message: 'Server Error' });
  }
};

exports.cancelDeposit = async (req, res) => {
  try {
    // Verify API key
    if (req.headers['x-api-key'] !== config.API_KEY) {
      return res.status(401).json({ success: false, message: 'Unauthorized' });
    }

    const { kodeDeposit } = req.params;

    const deposit = await Deposit.findOne({ kodeDeposit });

    if (!deposit) {
      return res.status(404).json({ success: false, message: 'Deposit not found' });
    }

    if (deposit.status !== 'pending') {
      return res.status(400).json({ 
        success: false, 
        message: 'Only pending deposits can be canceled' 
      });
    }

    deposit.status = 'canceled';
    await deposit.save();

    res.json({ 
      success: true, 
      message: 'Deposit canceled successfully' 
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ success: false, message: 'Server Error' });
  }
};