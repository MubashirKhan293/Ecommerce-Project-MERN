const contactUs = require("../models/contactus-models");
const Order = require("../models/order-models");
const User = require("../models/user-models");


const getAllUsers = async (req, res) => {
    try {
      const allusers = await User.find();
      res.status(200).json(allusers);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching all users' });
    }
  };

  const getAllOrders = async (req, res) => {
    try {
      const allorders = await Order.find();
      res.status(200).json(allorders);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching all orders' });
    }
  };

  const getAllContact = async (req, res) => {
    try {
      const allcontact = await contactUs.find();
      res.status(200).json(allcontact);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching all orders' });
    }
  };

  const deleteFeedback= async (req, res) => {
    try {
      const feedbackId = req.params.id;
      await contactUs.deleteOne({ _id: feedbackId });
      res.status(200).json({ message: 'Feedback deleted successfully!' });
    } catch (error) {
      res.status(500).json({ error: 'Failed to delete feedback.' });
    }
  };

  const deleteOrder= async (req, res) => {
    try {
      const orderId = req.params.id;
      await Order.deleteOne({_id: orderId});
      res.status(200).json({ message: 'Order deleted successfully!' });
    } catch (error) {
      res.status(500).json({ error: 'Failed to delete order.' });
    }
  };

  const deleteUser= async (req, res) => {
    try {
      const userId = req.params.id;
      await User.deleteOne({_id: userId});
      res.status(200).json({ message: 'User deleted successfully!' });
    } catch (error) {
      res.status(500).json({ error: 'Failed to delete user.' });
    }
  };
  module.exports = {
    getAllUsers,
    getAllOrders,
    getAllContact,
    deleteFeedback,
    deleteOrder,
    deleteUser
  };
