const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);

const itemSchema = new mongoose.Schema({
  id: {
    type: Number,
  },
  name: {
    type: String,
    required: true,
  },
  minDegree: {
    type: Number,
    required: true,
  },
  maxDegree: {
    type: Number,
    required: true,
  },
  information: {
    type: [String],
    required: true,
  },
});

const productSchema = new mongoose.Schema({
  productName: {
    type: String,
    required: true,
    trim: true,
  },
  status: {
    type: String,
    required: true,
    enum: ['active', 'inactive'],
  },
  type: {
    type: String,
    required: true,
    enum: ['gameAccount', 'inGameItem'],
  },
  order: {
    type: Number,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  imageUrl: {
    type: String,
    required: true,
  },
  productDetails: {
    type: String,
    required: true,
  },
  items: [itemSchema],
}, {
  timestamps: true,
});

itemSchema.plugin(AutoIncrement, {inc_field: 'id', id: 'item_id_counter'});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
