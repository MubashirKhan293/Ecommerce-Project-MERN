// src/components/auth-components/LoginPopup.js

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import "./SignIn.css";
import logo from "../../images/shopping-logo.png";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useAuth } from '../../context/AuthContext';
import { loginSchema } from '../../validation/validation'; // Import validation schema

const LoginPopup = ({ onClose, onSwitchToSignup }) => {

  const [form, setForm] = useState({
    email: '',
    password: ''
  });
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();

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
    const validationResult = loginSchema.safeParse(form);
    if (!validationResult.success) {
      setLoading(false);
      validationResult.error.errors.forEach(error => {
        toast.error(error.message);
      });
      return;
    }

    try {
      const response = await axios.post('http://localhost:5000/login', form);
      setLoading(false);
      toast.success('Login successful!');
      const { token, user } = response.data;
      login(user, token); // Set user and token in AuthContext
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));
      setTimeout(() => {
        if (user.isAdmin) {
          navigate('/admin-dashboard');
        } else {
          navigate('/');
        }
      }, 1000);
      console.log(response.data);
    } catch (error) {
      setLoading(false);
      if (error.response) {
        console.error('Server Error:', error.response.data);
        toast.error(`Login failed: ${error.response.data.message}`);
      } else if (error.request) {
        console.error('Network Error:', error.request);
        toast.error('Login failed: Network error');
      } else {
        console.error('Error:', error.message);
        toast.error(`Login failed: ${error.message}`);
      }
    }
  }
  return (
    <div className="login-popup">
      <div className="popup-content-login">
        <button className="close-btn" onClick={onClose}>
          ×
        </button>
        <img src={logo} alt="Logo" className="account-logo" />
        <h2>Login</h2>
        <ToastContainer />
        <form className="form" onSubmit={handleSubmit}>
          <label>Email </label>
          <input type="email" name="email" value={form.email} onChange={handleChange} required/>
          <label>Password </label>
          <input type="password" name="password" value={form.password} onChange={handleChange} required/>
          <button type="submit" className="btn" disabled={loading}>
          {loading ? 'Submitting...' : 'Login'}
        </button>
        </form>

        <p className="switch-to-signup">
          Don't have an account? <button type="button" onClick={onSwitchToSignup}>Signup</button>
        </p>
      </div>
    </div>
  );
};

export default LoginPopup;
