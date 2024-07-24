const express = require('express');
const router = express.Router();
const auth_controllers = require('../controllers/auth-controllers');
const { auth, adminAuth } = require('../middleware/auth');
const products_controllers = require('../controllers/products-controllers')

router.route('/home').get(auth_controllers.home);
router.route('/signup').post(auth_controllers.register);
router.route('/login').post(auth_controllers.login);
router.route('/contactus').post(auth_controllers.contactUs);
router.route('/products').get(products_controllers.api_products);


module.exports = router;
