import React, { useState } from 'react';
import '../styles/CheckoutPage.css';
import { useCart } from '../context/CartContext';
import Navbar from './Navbar';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';

const CheckoutPage = () => {
  const {token}=useAuth();
  const { cartItems, updateCartItemQuantity, removeFromCart } = useCart();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    streetAddress: '',
    city: '',
    stateProvince: '',
    country: 'Pakistan',
    phoneNumber: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const calculateSubtotal = () => {
    return cartItems.reduce((total, item) => total + parseFloat(item.price) * item.quantity, 0);
  };

  const calculateShipping = () => {
    const shippingRate = 0.1;
    return (calculateSubtotal() * shippingRate).toFixed(2);
  };

  const orderTotal = (calculateSubtotal() + parseFloat(calculateShipping())).toFixed(2);

  // Increment and decrement quantity handlers
  const incrementQuantity = (productId) => {
    const item = cartItems.find(item => item.productId === productId);
    if (item) {
      updateCartItemQuantity(productId, item.quantity + 1);
    }
  };

  const decrementQuantity = (productId) => {
    const item = cartItems.find(item => item.productId === productId);
    if (item && item.quantity > 1) {
      updateCartItemQuantity(productId, item.quantity - 1);
    }
  };

  const handleRemoveItem = (id) => {
    removeFromCart(id);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  // Check if there are items in the cart
  if (cartItems.length === 0) {
    alert('Please select at least one item to place an order.');
    return;
  }
    const orderData = {
      cartItems: cartItems.map(item => ({
        ...item,
        productId: item.productId
      })),
      shippingAddress: {
        firstName: formData.firstName,
        lastName: formData.lastName,
        streetAddress: formData.streetAddress,
        city: formData.city,
        stateProvince: formData.stateProvince,
        country: formData.country,
        phoneNumber: formData.phoneNumber,
      },
      subtotal: calculateSubtotal(),
      shippingCost: parseFloat(calculateShipping()),
      orderTotal: parseFloat(orderTotal),
    };

    try {
      const response = await axios.post('http://localhost:5000/api/orders', orderData, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization':`Bearer ${token}`
        },
      });
      console.log('Order submitted:', response.data);
      alert('Order placed successfully!');
    } catch (error) {
      console.error('Error placing order:', error);
      alert('Failed to place order. Please try again.');
    }
  };

  return (
    <>
      <Navbar />
      <div className="checkout-page">
        <form className="checkout-form" onSubmit={handleSubmit}>
          <h2>Shipping Address</h2>
          <div className="row">
            <div className="form-group">
              <label htmlFor="firstName">First Name</label>
              <input type="text" id="firstName" name="firstName" value={formData.firstName} onChange={handleInputChange} required />
            </div>
            <div className="form-group">
              <label htmlFor="lastName">Last Name</label>
              <input type="text" id="lastName" name="lastName" value={formData.lastName} onChange={handleInputChange} required />
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="streetAddress">Street Address</label>
            <input type="text" id="streetAddress" name="streetAddress" value={formData.streetAddress} onChange={handleInputChange} required />
          </div>
          <div className="row">
            <div className="form-group">
              <label htmlFor="city">City</label>
              <input type="text" id="city" name="city" value={formData.city} onChange={handleInputChange} required />
            </div>
            <div className="form-group">
              <label htmlFor="stateProvince">State/Province</label>
              <input type="text" id="stateProvince" name="stateProvince" value={formData.stateProvince} onChange={handleInputChange} required />
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="country">Country</label>
            <select id="country" name="country" value={formData.country} onChange={handleInputChange}>
              <option value="Pakistan">Pakistan</option>
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="phoneNumber">Phone Number</label>
            <input type="text" id="phoneNumber" name="phoneNumber" value={formData.phoneNumber} onChange={handleInputChange} required />
          </div>
          <div className="form-group">
            <h3>Payment: Cash on Delivery</h3>
          </div>
          <button type="submit" className="place-order-button">Place Order</button>
        </form>

        <div className="order-summary">
          <h2>Order Summary</h2>
          <ul className="check-order-list">
            {cartItems.map((item) => (
              <li key={item.productId} className="check-order-item">
                <img src={`http://localhost:5000/api/${item.image}`} alt={item.name} className="check-order-item-image" />
                <div className="check-order-item-details">
                  <p className="check-order-item-name">{item.name}</p>
                  <p>Price: {parseFloat(item.price).toFixed(2)}</p>
                  <div className='buttons-row2'>
                    <div className="quantity-control">
                      <button onClick={() => decrementQuantity(item.productId)} className="quantity-button">-</button>
                      <span>{item.quantity}</span>
                      <button onClick={() => incrementQuantity(item.productId)} className="quantity-button">+</button>
                    </div>
                    <div>
                      <button onClick={() => handleRemoveItem(item.productId)} className="remove-button">Remove</button>
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ul>
          <div className="order-totals">
            <div className="order-totals-row">
              <span>Cart Subtotal:</span>
              <span>${calculateSubtotal().toFixed(2)}</span>
            </div>
            <div className="order-totals-row">
              <span>Shipping:</span>
              <span>${calculateShipping()}</span>
            </div>
            <div className="order-totals-row">
              <span>Order Total:</span>
              <span>${orderTotal}</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CheckoutPage;
