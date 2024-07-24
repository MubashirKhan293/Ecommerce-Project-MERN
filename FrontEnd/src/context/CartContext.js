import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from './AuthContext';

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  const { token } = useAuth(); // Assume you have a useAuth hook to get auth state

  useEffect(() => {
    if (token) {
      fetchCartItems();
    }
  }, [token]); // Fetch cart items when the token changes


const fetchCartItems = async () => {
  try {
    const token = localStorage.getItem('authToken');
    console.log('Fetched token:', token); // Check if token is fetched correctly
    const response = await axios.get('http://localhost:5000/api/cart', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log('Cart items:', response.data); // Check if data is fetched correctly
    setCartItems(response.data);
  } catch (error) {
    console.error('Error fetching cart items:', error.response?.data || error.message);
  }
};

  
  const addToCart = async (item) => {
    try {
      const token = localStorage.getItem('authToken'); // Correct the token key
      const response = await axios.post('http://localhost:5000/api/cart', item, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setCartItems((prevItems) => {
        const existingItem = prevItems.find((i) => i.productId === item.productId);
        if (existingItem) {
          return prevItems.map((i) =>
            i.productId === item.productId
              ? { ...i, quantity: i.quantity + item.quantity }
              : i
          );
        }
        return [...prevItems, response.data];
      });
    } catch (error) {
      console.error('Error adding item to cart:', error.response?.data || error.message);
    }
  };
  
  // const removeFromCart = async (productId) => {
  //   try {
  //     const token = localStorage.getItem('token');
  //     await axios.delete(`http://localhost:5000/api/cart/${productId}`, {
  //       headers: {
  //         Authorization: `Bearer ${token}`,
  //       },
  //     });
  //     // Update the cart items in the state
  //     setCartItems((prevItems) => prevItems.filter((item) => item.productId !== productId));
  //   } catch (error) {
  //     console.error('Error removing item from cart:', error.response?.data || error.message);
  //   }
  // };
  const removeFromCart = async (productId) => {
    try {
      const token = localStorage.getItem('authToken'); // Make sure to use 'authToken' here
      if (!token) {
        throw new Error('No authentication token found.');
      }
      await axios.delete(`http://localhost:5000/api/cart/${productId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      // Update the cart items in the state
      setCartItems((prevItems) => prevItems.filter((item) => item.productId !== productId));
    } catch (error) {
      console.error('Error removing item from cart:', error.response?.data || error.message);
    }
  };
  
  const clearCart = async () => {
    try {
      const token = localStorage.getItem('authToken'); // Use the correct key for the token
      if (!token) {
        throw new Error('No authentication token found.');
      }
      await axios.delete('http://localhost:5000/api/cart/clear', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setCartItems([]); // Clear the cart in the state
    } catch (error) {
      console.error('Error clearing cart:', error.response?.data || error.message);
    }
  };
  

  const updateCartItemQuantity = (id, quantity) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.productId === id ? { ...item, quantity } : item
      )
    );
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setCartItems([]); // Clear cart items on logout
  };

  return (
    <CartContext.Provider
      value={{ cartItems, addToCart, removeFromCart, clearCart, updateCartItemQuantity, handleLogout, fetchCartItems }}
    >
      {children}
    </CartContext.Provider>
  );
};
