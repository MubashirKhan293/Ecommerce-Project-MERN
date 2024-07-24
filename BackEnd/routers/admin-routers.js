const express = require('express');
const router = express.Router();
const { auth, adminAuth } = require('../middleware/auth');
const Controllers = require('../controllers/admin-controllers');

router.route('/users').get(auth, adminAuth, Controllers.getAllUsers);
router.route('/feedbacks').get(auth, adminAuth, Controllers.getAllContact);
router.route('/orders').get(auth, adminAuth, Controllers.getAllOrders);

router.route('/users/:id').delete(auth, adminAuth, Controllers.deleteUser);
router.route('/feedbacks/:id').delete(auth, adminAuth, Controllers.deleteFeedback);
router.route('/orders/:id').delete(auth, adminAuth, Controllers.deleteOrder);

module.exports = router;
