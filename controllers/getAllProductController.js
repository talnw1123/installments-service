// Get all products controller
const Product = require('../models/productModel'); // Adjust the path as needed

const getAllProducts = async (req, res) => {
    try {
      const products = await Product.find({});
      res.status(200).json(products);
    } catch (error) {
      res.status(500).json({ message: 'Internal server error' });
    }
  };

module.exports = getAllProducts ;  