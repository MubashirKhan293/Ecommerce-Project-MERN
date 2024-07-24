// src/components/ProductDetails.js

import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useCart } from '../context/CartContext'; // Import useCart hook
import '../styles/ProductDetails.css';
import Navbar from './Navbar';

const ProductDetails = () => {
  const location = useLocation();
  const { product } = location.state || {}; // Read the product from state
  const [quantity, setQuantity] = useState(1);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const navigate = useNavigate();
  const categories = ['Ovens', 'Perfumes', 'Commercial-Grills', 'Coffee-Equipment'];
  const { addToCart } = useCart(); // Destructure addToCart from useCart hook

  useEffect(() => {
    axios.get('http://localhost:5000/products')
      .then(response => {
        setRelatedProducts(response.data);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []);

  const incrementQuantity = () => {
    setQuantity(quantity + 1);
  };

  const decrementQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const handleAddToCart = async () => {
    const cartItem = {
      productId: product.id,
      image: product.image,
      name: product.name,
      price: product.price,
      quantity: quantity
    };
  
    try {
      addToCart(cartItem); // Use the context to add to cart
      alert('Product added to cart');
      window.location.reload(); // Refresh the page
    } catch (error) {
      console.error('Error adding product to cart:', error);
    }
  };
  

  const handleCheckout = () => {
    navigate('/checkout');
  };

  if (!product) {
    return <p>Product not found</p>;
  }

  return (
    <>
      <Navbar />
      <div className="category-menu">
        {categories.map((category, index) => (
          <div key={index} className="category-item" onClick={() => navigate(`/${category.toLowerCase()}`)}>
            {category}
          </div>
        ))}
      </div>

      <div className="product-details-container">
        <div className="left-column">
          <img
            src={`http://localhost:5000/api/${product.image}`}
            alt={product.name}
            className="product-image"
          />
          <div className="related-products">
            <h3>Related Products</h3>
            <div className="related-products-slider">
              {relatedProducts.map((relatedProduct) => (
                <div key={relatedProduct.id} className="related-product-item">
                  <img
                    src={`http://localhost:5000/api/${relatedProduct.image}`}
                    alt={relatedProduct.name}
                    className="related-product-image"
                  />
                  <p className="related-product-name">{relatedProduct.name}</p>
                  <p className="related-product-price">{relatedProduct.price}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="right-column">
          <h2 className="product-name">{product.name}</h2>
          <p className="product-description">{product.description}</p>
          <p className="product-price">Price: {product.price}</p>
          <div className="quantity-section">
            <label htmlFor="quantity">Quantity: </label>
            <button onClick={decrementQuantity} className="quantity-button">-</button>
            <span>{quantity}</span>
            <button onClick={incrementQuantity} className="quantity-button">+</button>
          </div>
          <p className="total-price">Total Price: {parseInt(product.price) * quantity}$</p>
          <div className="buttons-row">
            <button className="add-to-cart-button" onClick={handleAddToCart}>Add to Cart</button>
            <button className="add-to-basket-button" onClick={() => handleCheckout()}>CheckOut</button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductDetails;
