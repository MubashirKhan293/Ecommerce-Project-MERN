const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require("../models/user-models");
const ContactUs=require("../models/contactus-models")

const home = async (req, res) => {
  try {
    res.status(200).send("Hello, It's home page with controller...");
  } catch (error) {
    res.status(400).send({ msg: "Page Not Load" });
  }
};

const register = async (req, res) => {
  try {
    const { username, email, address, password } = req.body;
    const userExist = await User.findOne({ email });

    if (userExist) {
      return res.status(400).json({ message: 'User Already Existed...' });
    }

    const salt = await bcrypt.genSalt(10);
    const hash_password = await bcrypt.hash(password, salt);

    const newUser = await User.create({
      username,
      address,
      email,
      password: hash_password,
      isAdmin: false // By default, isAdmin is false
    });

    const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, {
      expiresIn: '1h'
    });

    res.status(201).json({
      message: 'User registered successfully',
      token,
      user: {
        username: newUser.username,
        address: newUser.address,
        email: newUser.email,
        avatar: newUser.avatar, // assuming you have an avatar field
        isAdmin: newUser.isAdmin
      }
    });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ message: 'User registration failed' });
  }
};

const contactUs= async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;
    const userExist = await User.findOne({ email });

    if (!userExist) {
      return res.status(400).json({ message: 'Invalid Credentials' });
    }
    const contactRequest = await ContactUs.create({
      name,
      email,
      subject,
      message
    });

    res.status(201).json({
      message: 'suggestion submitted successfully',
      contactInformation:{
        name: contactRequest.name,
        email: contactRequest.email,
        subject: contactRequest.subject,
        message: contactRequest.message
      }
    });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ message: 'suggestion submmitted failed' });
  }
};


const login = async (req, res) => {
  try {
    const { email, password,address } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: '30d'
    });

    res.status(200).json({
      token,
      user: {
        username: user.username,
        email: user.email,
        address:user.address,
        avatar: user.avatar,
        isAdmin: user.isAdmin // Include isAdmin in the response
      }
    });
  } catch (error) {
    console.error('Login error:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

module.exports = { home, register, login, contactUs};
