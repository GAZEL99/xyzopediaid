const Deposit = require('../models/Deposit');
const { generateDepositId } = require('../utils/helpers');

exports.createDeposit = async (req, res) => {
  try {
    const { userId, amount, method, proof } = req.body;
    
    if (!userId || !amount || !method) {
      return res.status(400).json({ 
        success: false, 
        message: 'Missing required fields' 
      });
    }
    
    const newDeposit = new Deposit({
      userId,
      amount,
      method,
      proof,
      depositId: generateDepositId()
    });
    
    await newDeposit.save();
    
    res.status(201).json({ 
      success: true, 
      data: newDeposit 
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.getStatusDeposit = async (req, res) => {
  try {
    const { depositId } = req.query;
    
    if (!depositId) {
      return res.status(400).json({ 
        success: false, 
        message: 'Deposit ID is required' 
      });
    }
    
    const deposit = await Deposit.findOne({ depositId });
    
    if (!deposit) {
      return res.status(404).json({ 
        success: false, 
        message: 'Deposit not found' 
      });
    }
    
    res.json({ success: true, data: deposit });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.cancelDeposit = async (req, res) => {
  try {
    const { depositId } = req.body;
    
    if (!depositId) {
      return res.status(400).json({ 
        success: false, 
        message: 'Deposit ID is required' 
      });
    }
    
    const deposit = await Deposit.findOne({ depositId });
    
    if (!deposit) {
      return res.status(404).json({ 
        success: false, 
        message: 'Deposit not found' 
      });
    }
    
    if (deposit.status !== 'pending') {
      return res.status(400).json({ 
        success: false, 
        message: 'Only pending deposits can be cancelled' 
      });
    }
    
    deposit.status = 'cancelled';
    await deposit.save();
    
    res.json({ 
      success: true, 
      message: 'Deposit cancelled successfully' 
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};