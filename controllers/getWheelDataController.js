const Product = require('../models/productModel');

const getWheelData = async (req, res) => {
  try {
    const productId = req.params._id;
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }
    res.status(200).json(product.items);
  } catch (error) {
    console.error('Error fetching wheel data:', error);
    res.status(500).json({ error: 'Server error' });
  }
};

module.exports = getWheelData;
