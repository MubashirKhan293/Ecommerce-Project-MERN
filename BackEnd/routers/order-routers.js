// routes/orderRoutes.js
const express = require('express');
const router = express.Router();
const { auth } = require('../middleware/auth');
const { createOrder } = require('../controllers/order-controllers');

router.route('/').post(auth, createOrder);

module.exports = router;
