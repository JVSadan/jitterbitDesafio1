const mongoose = require('mongoose');

// Define the schema for the Order model
const orderSchema = new mongoose.Schema({
  orderId: { type: String, required: true, unique: true },
  value: { type: Number, required: true },
  creationDate: { type: Date, required: true },
  items: [
    {
      productId: { type: String, required: true },
      quantity: { type: Number, required: true },
      price: { type: Number, required: true }
    }
  ]
});

// Create and export the Order model
module.exports = mongoose.model('Order', orderSchema);
