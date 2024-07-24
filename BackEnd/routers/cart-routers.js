// routes/cartRoutes.js

const express = require('express');
const router = express.Router();
const cartController = require('../controllers/cart-controllers'); // Correct import
const {auth}=require('../middleware/auth')

router.route('/').post(auth,cartController.addToCart);
router.route('/').get(auth, cartController.getCartItems);
router.route('/:productId').delete(auth, cartController.removeFromCart)

module.exports = router;


