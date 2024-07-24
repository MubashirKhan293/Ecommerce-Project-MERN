import React, { useEffect, useState } from 'react';
import './admin-styles/Orders.css'; // Import the CSS for styling
import axios from 'axios';
import AdminNavbar from '../admin/AdminNavbar'
const OrderList = ({ onDelete }) => {

    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
  
    useEffect(() => {
      const fetchOrders = async () => {
        try {
          const token = localStorage.getItem('token');
          const response = await axios.get('http://localhost:5000/api/orders', {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          setOrders(response.data);
          setLoading(false);
        } catch (err) {
          setError('Your Network is Unstable');
          setLoading(false);
        }
      };
  
      fetchOrders();
    }, []);

    const handleDeleteOrders = async (id) => {
        try {
            const token = localStorage.getItem('token');
            await axios.delete(`http://localhost:5000/api/orders/${id}`, {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              });
          setOrders(orders.filter(order => order._id !== id));
        } catch (err) {
          setError('Failed to delete order.');
        }
      };
    
  
    if (loading) {
      return <p>Loading orders...</p>;
    }
  
    if (error) {
      return <p>{error}</p>;
    }
  return (
    <>
    <AdminNavbar/>
    <div className="order-list">
      {orders.map((order, index) => (
        <div className="order-item" key={index}>
          <div className="order-info">
            <h3>Order ID: {order._id}</h3>
            <p><strong>User ID:</strong> {order.userId}</p>
            <p><strong>Order Date:</strong> {new Date(order.createdAt).toLocaleDateString()}</p>
            <div className='cart-items-wrapper'>
            <h4>Cart Items:</h4>
            <ul className="cart-items">
              {order.cartItems.map((item, idx) => (
                <li key={idx}>
                  <div className="item-info">
                    <p><strong>Product Name:</strong> {item.name}</p>
                    <p><strong>Quantity:</strong> {item.quantity}</p>
                    <p><strong>Price:</strong> {item.price}</p>
                  </div>
                  <img src={`http://localhost:5000/api/${item.image}`} alt={item.name} className="item-image"/>
                </li>
              ))}
            </ul>
            </div>
            <div className='shipping-address'>
            <h4>Shipping Address:</h4>
            {order.shippingAddress ? (
              <>
                <p>{order.shippingAddress.firstName} {order.shippingAddress.lastName}</p>
                <p>{order.shippingAddress.streetAddress}, {order.shippingAddress.city}</p>
                <p>{order.shippingAddress.stateProvince}, {order.shippingAddress.country}</p>
                <p><strong>Phone:</strong> {order.shippingAddress.phoneNumber}</p>
              </>
            ) : (
              <p>No shipping address provided.</p>
            )}
            </div>
            <p><strong>Subtotal:</strong> ${order.subtotal ? order.subtotal.toFixed(2) : 'N/A'}</p>
            <p><strong>Shipping Cost:</strong> ${order.shippingCost ? order.shippingCost.toFixed(2) : 'N/A'}</p>
            <p><strong>Total:</strong> ${order.orderTotal ? order.orderTotal.toFixed(2) : 'N/A'}</p>
    
          </div>
          <button className="order-delete-button" onClick={() => handleDeleteOrders(order._id)}>
            Delete
          </button>
        </div>
      ))}
    </div>
    </>
  );
};

export default OrderList;
