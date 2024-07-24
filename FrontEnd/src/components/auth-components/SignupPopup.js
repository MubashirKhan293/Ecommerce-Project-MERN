// src/components/auth-components/SignupPopup.js

import React, { useState } from "react";
import "./Signup.css";
import logo from "../../images/shopping-logo.png"; // Import your logo image
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from '../../context/AuthContext'; // Import useAuth
import { signupSchema } from '../../validation/validation'; // Import validation schema

const SignupPopup = ({ onClose, onSwitchToLogin }) => {
  const [form, setForm] = useState({
    username: '',
    email: '',
    address:'',
    password: ''
  });
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const { login } = useAuth(); // Destructure login from useAuth

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // Validate the form data
    const validationResult = signupSchema.safeParse(form);
    if (!validationResult.success) {
      setLoading(false);
      validationResult.error.errors.forEach(error => {
        toast.error(error.message);
      });
      return;
    }

    try {
      const response = await axios.post('http://localhost:5000/signup', form);
      setLoading(false);
      toast.success('Registration successful!');
      const { token, user } = response.data;

      // Use the login function to set the auth state
      login(user, token); 

      setTimeout(() => {
        onClose(); // Close the signup popup
        navigate('/'); // Navigate to the home page after successful registration
      }, 1000);
    } catch (error) {
      setLoading(false);
      if (error.response) {
        console.error('Server Error:', error.response.data);
        toast.error(`Registration failed: ${error.response.data.message}`);
      } else if (error.request) {
        console.error('Network Error:', error.request);
        toast.error('Registration failed: Network error');
      } else {
        console.error('Error:', error.message);
        toast.error(`Registration failed: ${error.message}`);
      }
    }
  }

  return (
    <div className="signup-popup">
      <div className="popup-content">
        <button className="close-btn" onClick={onClose}>
          ×
        </button>
        <img src={logo} alt="Logo" className="account-logo" /> {/* Display logo image */}
        <h2>Signup</h2>
        
      <ToastContainer />
        <form className="form" onSubmit={handleSubmit}>
          <label> Name </label>
          <input type="text" name="username" value={form.username} onChange={handleChange}/>
          <label>Email </label>
          <input type="email" name="email" value={form.email} onChange={handleChange}/>
          <label>Address </label>
          <input type="text" name="address" value={form.address} onChange={handleChange}/>
          <label>Password </label>
          <input type="password" name="password" value={form.password} onChange={handleChange}/>
          <button type="submit" className="btn" disabled={loading}>
          {loading ? 'Submitting...' : 'Signup'}
        </button>
        </form>
        
        <p className="switch-to-login">
          Already have an account? <button type="button" onClick={onSwitchToLogin}>Login</button>
        </p>
      </div>
    </div>
  );
};

export default SignupPopup;
