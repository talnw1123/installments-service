const Product = require('../models/productModel');

// Function to delete a product
const deleteProduct = async (req, res) => {
  try {
    const productId = req.params._id;

    const product = await Product.findByIdAndDelete(productId);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    return res.status(200).json({ message: 'Product deleted successfully' });
  } catch (error) {
    return res.status(500).json({ message: 'Failed to delete product', error });
  }
};

module.exports = deleteProduct;
