// controllers/orderController.js
const Order = require('../models/order-models');

const createOrder = async (req, res) => {
  try {
    const { cartItems, shippingAddress, subtotal, shippingCost, orderTotal } = req.body;
    const userId = req.user.id; // Assuming user ID is stored in req.user from the authentication middleware

    const newOrder = new Order({
      userId,
      cartItems,
      shippingAddress,
      subtotal,
      shippingCost,
      orderTotal,
    });

    await newOrder.save();

    res.status(201).json({
      message: 'Order placed successfully',
      order: newOrder,
    });
  } catch (error) {
    console.error('Error creating order:', error);
    res.status(500).json({ error: 'Error placing order' });
  }
};

module.exports = { createOrder };
