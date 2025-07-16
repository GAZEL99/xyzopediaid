const generateOrderId = () => {
  const timestamp = Date.now().toString();
  const random = Math.floor(Math.random() * 1000).toString().padStart(3, '0');
  return `ORD-${timestamp}-${random}`;
};

const generateDepositId = () => {
  const timestamp = Date.now().toString();
  const random = Math.floor(Math.random() * 1000).toString().padStart(3, '0');
  return `DEP-${timestamp}-${random}`;
};

module.exports = {
  generateOrderId,
  generateDepositId
};