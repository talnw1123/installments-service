const Product = require('../models/productModel'); // Adjust the path as needed
const upload = require('../uploads/upload'); // Adjust the path as needed

const deleteItemFromSpin = async (req, res) => {
  try {
    const { items } = req.body;
    
    const product = await Product.findById(req.params._id);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    // Update items array
    if (items && items.length > 0) {
      const parsedItems = items.map(item => ({
        _id: item._id,
        name: item.name,
        minDegree: item.minDegree,
        maxDegree: item.maxDegree,
        information: item.information || [], // Ensure information is an array
      }));
      product.items = parsedItems;
    }

    const updatedProduct = await product.save();
    return res.json(updatedProduct);
  } catch (err) {
    return res.status(500).json({ message: 'Failed to update product', error: err });
  }
};

module.exports = deleteItemFromSpin;
