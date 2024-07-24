// CartPopup.js

import React from 'react';
import '../styles/CartPopup.css';
import { useCart } from '../context/CartContext'; // Import the context
import { useNavigate } from 'react-router-dom';

const CartPopup = ({ onClose, onDelete }) => {
  const navigate=useNavigate();
  const { cartItems } = useCart(); // Get cartItems from the context
const handleCheckout=()=>{
  navigate('/checkout');
}
  return (
    <div className="cart-popup-overlay" onClick={onClose}>
      <div className="cart-popup" onClick={(e) => e.stopPropagation()}>
        <button className="close-cart" onClick={onClose}>x</button>
        <h2>My Cart</h2>
        {cartItems.length === 0 ? (
          <p>Your cart is empty.</p>
        ) : (
          <div className="cart-items">
            {cartItems.map((item) => (
              <div className="cart-item" key={item.productId}>
                <img src={`http://localhost:5000/api/${item.image}`} alt={item.name} className="cart-item-image" />
                <div className="cart-item-details">
                  <h3>{item.name}</h3>
                  <p>Price: {parseInt(item.price) * item.quantity}$</p>
                  <p>Quantity: {item.quantity}</p>
                </div>
                <div className='my-button-row'>
                <button className="cart-delete-button" onClick={() => onDelete(item.productId)}>Delete</button>
                <button className="checkout-button" onClick={handleCheckout}>CheckOut</button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default CartPopup;
