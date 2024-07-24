import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart, faUser, faBars } from '@fortawesome/free-solid-svg-icons';
import { useLocation } from 'react-router-dom'; 
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import '../styles/Navbar.css';
import SignupPopup from './auth-components/SignupPopup';
import LoginPopup from './auth-components/LoginPopup';
import CartPopup from './CartPopup';
import ProfilePopup from './ProfilePopup';
const logo=require('../images/shopping-logo.png')
function Navbar() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [showSignup, setShowSignup] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const { cartItems, removeFromCart } = useCart();
  const { isAuthenticated, isAdmin } = useAuth();
  const location = useLocation(); 

  const handleLoginClick = (e) => {
    e.preventDefault(); 
    setShowLogin(true);
  };

  const handleClosePopup = () => {
    setShowLogin(false);
    setShowSignup(false);
    setIsProfileOpen(false);
  };

  const openSignup = () => {
    setShowSignup(true);
    setShowLogin(false);
  };

  const openLogin = () => {
    setShowSignup(false);
    setShowLogin(true);
  };

  const handleCartClick = () => {
    setIsCartOpen(!isCartOpen);
  };

  const handleClose = () => {
    setIsCartOpen(false);
  };

  const handleDelete = (id) => {
    removeFromCart(id);
  };

  const toggleDrawer = () => {
    setDrawerOpen(!drawerOpen);
  };

  const handleProfileClick = () => {
    setIsProfileOpen(!isProfileOpen);
  };

  useEffect(() => {
    if (isAuthenticated) {
      setShowLogin(false);
      setShowSignup(false);
    }
  }, [isAuthenticated]);
  const isActiveLink = (path) => location.pathname === path;
  const isCategoryPage = () => location.pathname.includes('/ovens') ||
                              location.pathname.includes('/coffee-equipment') ||
                              location.pathname.includes('/commercial-grills') ||
                              location.pathname.includes('/perfumes') ||
                              location.pathname.includes('/product-details') ||
                              location.pathname.includes('/checkout');

  return (
    <header className="menu-bar fixed">
       <div className="logo">
        <img src={logo} alt="Logo" className="logo-image" />
        <span className="logo-text">KitchenKraft</span>
      </div>
      <nav className={`nav-links ${drawerOpen ? 'open' : ''}`}>
      {isAdmin && (
          <a 
            href="/admin-dashboard" 
            className={isActiveLink('/admin-dashboard') ? 'active' : ''}
          >
            Admin
          </a>
        )}
        <a 
          href="/" 
          className={isActiveLink('/') ? 'active' : ''}
        >
          Home
        </a>
        <a 
          href="/ovens" 
          className={isCategoryPage() ? 'active' : ''}
        >
          Categories
        </a>
        <a 
          href="/contact-us" 
          className={isActiveLink('/contact-us') ? 'active' : ''}
        >
          ContactUs
        </a>
      </nav>
      <div className="icons">
        <FontAwesomeIcon icon={faShoppingCart} onClick={handleCartClick} />
        {isCartOpen && (
          <CartPopup
            cartItems={cartItems}
            onClose={handleClose}
            onDelete={handleDelete}
          />
        )}
        {isAuthenticated ? (
          <>
            <FontAwesomeIcon icon={faUser} onClick={handleProfileClick} />
            {isProfileOpen && <ProfilePopup onClose={handleClosePopup} /> }
          </>
        ) : (
          <a onClick={handleLoginClick} style={{cursor: 'pointer'}}>Login</a>
        )}
        {showSignup && <SignupPopup onClose={handleClosePopup} onSwitchToLogin={openLogin} />}
        {showLogin && <LoginPopup onClose={handleClosePopup} onSwitchToSignup={openSignup} />}
        <FontAwesomeIcon icon={faBars} className="drawer-icon" onClick={toggleDrawer} />
      </div>
    </header>
  );
}

export default Navbar;
