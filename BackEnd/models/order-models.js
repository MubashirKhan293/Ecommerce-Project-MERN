// models/order-models.js
const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  cartItems: [{
    productId: Number,
    name: String,
    price: String,
    quantity: Number,
    image: String,
  }],
  shippingAddress: {
    firstName: String,
    lastName: String,
    streetAddress: String,
    city: String,
    stateProvince: String,
    country: String,
    phoneNumber: String,
  },
  subtotal: Number,
  shippingCost: Number,
  orderTotal: Number,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;
