const Transaksi = require('../models/Transaksi');
const { generateOrderId } = require('../utils/helpers');

exports.createTransaksi = async (req, res) => {
  try {
    const { userId, serviceId, priceId, quantity, target } = req.body;
    
    // Validate input
    if (!userId || !serviceId || !priceId || !quantity) {
      return res.status(400).json({ 
        success: false, 
        message: 'Missing required fields' 
      });
    }
    
    // Get price info
    const harga = await Harga.findById(priceId);
    if (!harga) {
      return res.status(404).json({ 
        success: false, 
        message: 'Price not found' 
      });
    }
    
    // Calculate total price
    const totalPrice = harga.price * quantity;
    
    // Create transaction
    const newTransaksi = new Transaksi({
      userId,
      serviceId,
      priceId,
      quantity,
      totalPrice,
      target,
      orderId: generateOrderId()
    });
    
    await newTransaksi.save();
    
    res.status(201).json({ 
      success: true, 
      data: newTransaksi 
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.getStatusTransaksi = async (req, res) => {
  try {
    const { orderId } = req.query;
    
    if (!orderId) {
      return res.status(400).json({ 
        success: false, 
        message: 'Order ID is required' 
      });
    }
    
    const transaksi = await Transaksi.findOne({ orderId });
    
    if (!transaksi) {
      return res.status(404).json({ 
        success: false, 
        message: 'Transaction not found' 
      });
    }
    
    res.json({ success: true, data: transaksi });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};