// controllers/cartController.js

const CartItem = require('../models/cartItem-models');

const addToCart = async (req, res) => {
  try {
    const { productId, name, price, quantity, image } = req.body;
    const userId = req.user.id; // Assuming user ID is stored in req.user from the authentication middleware

    // Ensure productId is an integer
    const productIDInteger = parseInt(productId, 10);

    // Find the cart item by productId and userId
    let cartItem = await CartItem.findOne({ productId: productIDInteger, userId });
    if (cartItem) {
      // If item exists, update the quantity
      cartItem.quantity += quantity;
      await cartItem.save();
    } else {
      // Otherwise, create a new cart item
      cartItem = new CartItem({ userId, productId: productIDInteger, name, price, quantity, image });
      await cartItem.save();
    }

    // Send the updated or new cart item back as response
    res.status(201).json(cartItem);
  } catch (error) {
    console.error('Error adding item to cart:', error); // Log error details
    res.status(500).json({ error: 'Error adding item to cart' });
  }
};


const getCartItems = async (req, res) => {
  try {
    const userId = req.user.id; // Assuming user ID is stored in req.user from the authentication middleware
    const cartItems = await CartItem.find({ userId });
    res.status(200).json(cartItems);
  } catch (error) {
    console.error('Error fetching cart items:', error);
    res.status(500).json({ error: 'Error fetching cart items' });
  }
};

const removeFromCart = async (req, res) => {
  try {
    const { productId } = req.params;
    const userId = req.user.id; // Assuming user ID is stored in req.user from the authentication middleware

    await CartItem.deleteOne({ userId, productId });
    res.status(200).json({ message: 'Item removed from cart successfully' });
  } catch (error) {
    console.error('Error removing item from cart:', error);
    res.status(500).json({ error: 'Error removing item from cart' });
  }
};

const clearCart = async (req, res) => {
  try {
    const userId = req.user.id; // Assuming user ID is stored in req.user from the authentication middleware
    await CartItem.deleteMany({ userId });
    res.status(200).json({ message: 'Cart cleared successfully' });
  } catch (error) {
    console.error('Error clearing cart:', error);
    res.status(500).json({ error: 'Error clearing cart' });
  }
};

module.exports = { addToCart, getCartItems, removeFromCart, clearCart };
