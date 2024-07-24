import React, { useState } from 'react';
import '../styles/ContactUs.css';
import Navbar from './Navbar';
import {ToastContainer, toast } from "react-toastify";
import axios from "axios";
import { useNavigate } from 'react-router-dom';

const ContactUs = () => {
  const [form, setForm] = useState({
    name: '',
    email: '',
    subject:'',
    message: ''
  });
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

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
    try {
      const response = await axios.post('http://localhost:5000/contactus', form);
      setLoading(false);
      toast.success('suggestion submitted successful!');
      const { token, user } = response.data;
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));
      setTimeout(() => {
        navigate('/contact-us'); // Navigate to home page after successful registration
      }, 1000);
    } catch (error) {
      setLoading(false);
      if (error.response) {
        console.error('Server Error:', error.response.data);
        toast.error(`Submission failed: ${error.response.data.message}`);
      } else if (error.request) {
        console.error('Network Error:', error.request);
        toast.error('Submission failed: Network error');
      } else {
        console.error('Error:', error.message);
        toast.error(`Submission failed: ${error.message}`);
      }
    }
  }

  return (
    <><Navbar/>
    <div className="contact-us">
      <div className="header">
        <h1>Contact Us</h1>
        <p>We're here to help and answer any questions you might have. We look forward to hearing from you!</p>
      </div>
      <form className="contact-form" onSubmit={handleSubmit}>
        <label>
          Name
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Enter your name"
            required
          />
        </label>
        <label>
          Email
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            placeholder="Enter your email"
            required
          />
        </label>
        <label>
          Subject
          <input
            type="text"
            name="subject"
            value={form.subject}
            onChange={handleChange}
            placeholder="Enter the subject"
            required
          />
        </label>
        <label>
          Message
          <textarea
            name="message"
            value={form.message}
            onChange={handleChange}
            placeholder="Enter your message"
            required
          />
        </label>
        <button type="submit" className="btn" disabled={loading}>
          {loading ? 'Submitting...' : 'Submit'}
        </button>
      </form>
      <ToastContainer/>
    </div>
    </>
  );
};

export default ContactUs;
