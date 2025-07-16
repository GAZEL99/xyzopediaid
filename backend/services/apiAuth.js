const API_ID = 'aec30a2a';
const API_KEY = 'VS-1f4cbf530c94e7';

const authenticate = (req, res, next) => {
  const apiId = req.headers['x-api-id'];
  const apiKey = req.headers['x-api-key'];
  
  if (!apiId || !apiKey || apiId !== API_ID || apiKey !== API_KEY) {
    return res.status(401).json({ 
      success: false, 
      message: 'Unauthorized: Invalid API credentials' 
    });
  }
  
  next();
};

module.exports = {
  authenticate
};