const express = require('express');
const router = express.Router();
const multer = require('multer');

const { createSlipHistory } = require('../controllers/createSlipHistoryController');
const { getAllSlipHistories } = require('../controllers/getAllSlipHistoriesController');
const { getSlipHistoryById } = require('../controllers/getSlipHistoryByIdController');
const { updateSlipHistoryStatus} = require('../controllers/updateSlipHistoryStatus')
// Set up multer for file uploads

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, 'uploads/slips/');
    },
    filename: (req, file, cb) => {
      cb(null, Date.now() + '-' + file.originalname);
    },
  });
  const upload = multer({ storage });

// Define routes
router.post('/createSlipHistory', upload.single('slipImage'), createSlipHistory);
router.get('/getAllSlipHistories', getAllSlipHistories);
router.get('/getSlipHistoryById/:id', getSlipHistoryById);
router.post('/updateSlipHistoryStatus/:id', updateSlipHistoryStatus);

module.exports = router;
