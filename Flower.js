const mongoose = require('mongoose');
const flowerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  imageUrl: {
    type: String,
    default: '',
  },
  category: {
    type: String,
  }
}, {
  timestamps: true
});
module.exports = mongoose.model('Flower', flowerSchema);