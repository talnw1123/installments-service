const multer = require('multer');
const path = require('path');
const Product = require('../models/productModel'); // Adjust the path as needed

// Set storage engine
const storage = multer.diskStorage({
  destination: './uploads/',
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

// Initialize upload
const upload = multer({
  storage: storage,
  limits: { fileSize: 1000000 }, // Limit file size to 1MB
  fileFilter: (req, file, cb) => {
    checkFileType(file, cb);
  },
}).single('image');

// Check file type
function checkFileType(file, cb) {
  const filetypes = /jpeg|jpg|png|gif/;
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = filetypes.test(file.mimetype);

  if (mimetype && extname) {
    return cb(null, true);
  } else {
    cb('Error: Images Only!');
  }
}

const createProduct = (req, res) => {
    upload(req, res, (err) => {
      if (err) {
        return res.status(400).json({ message: err });
      } else {
        const { productName, status, type, order, price, productDetails } = req.body;
        const imageUrl = req.file ? `/uploads/${req.file.filename}` : '';
  
        // Parsing nested items
        const items = req.body.items ? JSON.parse(req.body.items) : [];
  
        const newProduct = new Product({
          productName,
          status,
          type,
          order,
          price,
          imageUrl,
          productDetails,
          items: items.map((item) => ({
            name: item.name,
            minDegree: item.minDegree,
            maxDegree: item.maxDegree,
            information: item.information || [], // Ensure information is an array
          })),
        });
  
        newProduct.save()
          .then(product => res.status(201).json(product))
          .catch(err => res.status(500).json({ message: 'Failed to create product', error: err }));
      }
    });
  };
  

module.exports = createProduct;
