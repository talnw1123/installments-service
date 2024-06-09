// const Product = require('../models/productModel'); // Adjust the path as needed
// const upload = require('../uploads/upload'); // Adjust the path as needed

// const updateProduct = (req, res) => {
//     upload(req, res, async (err) => {
//       if (err) {
//         return res.status(400).json({ message: err });
//       } else {
//         try {
//           const { productName, status, type, order, price, productDetails } = req.body;
//           const imageUrl = req.file ? `/uploads/${req.file.filename}` : '';
  
//           const product = await Product.findById(req.params._id);
//           if (!product) {
//             return res.status(404).json({ message: 'Product not found' });
//           }
  
//           product.productName = productName || product.productName;
//           product.status = status || product.status;
//           product.type = type || product.type;
//           product.order = order || product.order;
//           product.price = price || product.price;
//           product.productDetails = productDetails || product.productDetails;
//           if (imageUrl) {
//             product.imageUrl = imageUrl;
//           }
  
//           const updatedProduct = await product.save();
//           return res.json(updatedProduct);
//         } catch (err) {
//           return res.status(500).json({ message: 'Failed to update product', error: err });
//         }
//       }
//     });
//   };
// module.exports = updateProduct ;  

const Product = require('../models/productModel'); // Adjust the path as needed
const upload = require('../uploads/upload'); // Adjust the path as needed

const updateProduct = (req, res) => {
  upload(req, res, async (err) => {
    if (err) {
      return res.status(400).json({ message: err });
    } else {
      try {
        const { productName, status, type, order, price, productDetails, items } = req.body;
        const imageUrl = req.file ? `/uploads/${req.file.filename}` : '';

        const product = await Product.findById(req.params._id);
        if (!product) {
          return res.status(404).json({ message: 'Product not found' });
        }

        product.productName = productName || product.productName;
        product.status = status || product.status;
        product.type = type || product.type;
        product.order = order || product.order;
        product.price = price || product.price;
        product.productDetails = productDetails || product.productDetails;
        if (imageUrl) {
          product.imageUrl = imageUrl;
        }

        // Update items array
        if (items) {
          const parsedItems = JSON.parse(items).map(item => ({
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
    }
  });
};

module.exports = updateProduct;


// const updateProduct = (req, res) => {
//     upload(req, res, async (err) => {
//       if (err) {
//         return res.status(400).json({ message: err });
//       } else {
//         try {
//           const { productName, status, type, order, price, productDetails, items } = req.body;
//           const imageUrl = req.file ? `/uploads/${req.file.filename}` : '';
  
//           const product = await Product.findById(req.params._id);
//           if (!product) {
//             return res.status(404).json({ message: 'Product not found' });
//           }
  
//           product.productName = productName || product.productName;
//           product.status = status || product.status;
//           product.type = type || product.type;
//           product.order = order || product.order;
//           product.price = price || product.price;
//           product.productDetails = productDetails || product.productDetails;
//           if (imageUrl) {
//             product.imageUrl = imageUrl;
//           }
  
//           // Update items array
//           if (items && items.length > 0) {
//             const parsedItems = JSON.parse(items);
//             product.items = parsedItems.map(item => ({
//               name: item.name,
//               minDegree: item.minDegree,
//               maxDegree: item.maxDegree,
//               information: item.information || [], // Ensure information is an array
//             }));
//           }
  
//           const updatedProduct = await product.save();
//           return res.json(updatedProduct);
//         } catch (err) {
//           return res.status(500).json({ message: 'Failed to update product', error: err });
//         }
//       }
//     });
//   };
  

// module.exports = updateProduct ;
