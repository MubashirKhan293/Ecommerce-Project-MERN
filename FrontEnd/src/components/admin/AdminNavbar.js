import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faBars } from '@fortawesome/free-solid-svg-icons';
import { useLocation } from 'react-router-dom'; 
import { useAuth } from '../../context/AuthContext';
import '../admin/admin-styles/AdminNavbar.css';
import SignupPopup from '../auth-components/SignupPopup';
import LoginPopup from '../auth-components/LoginPopup';
import ProfilePopup from '../ProfilePopup';
const logo=require('../../images/shopping-logo.png')
function Navbar() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [showSignup, setShowSignup] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const { isAuthenticated } = useAuth();
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
    <header className="admin-menu-bar fixed">
       <div className="logo">
        <img src={logo} alt="Logo" className="admin-logo-image" />
        <span className="admin-logo-text">KitchenKraft</span>
      </div>
      <nav className={`admin-nav-links ${drawerOpen ? 'open' : ''}`}>
      <a 
          href="/" 
          className={isActiveLink('/') ? 'active' : ''}
        >
          Dashboard
        </a>
        <a 
          href="/all-users" 
          className={isActiveLink('/all-users') ? 'active' : ''}
        >
          Users
        </a>
        <a 
          href="/orders" 
          className={isActiveLink('/orders') ? 'active' : ''}
        >
          Orders
        </a>
        <a 
          href="/feedbacks" 
          className={isActiveLink('/feedbacks') ? 'active' : ''}
        >
          Feedbacks
        </a>
      </nav>
      <div className="admin-icons">
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
        <FontAwesomeIcon icon={faBars} className="admin-drawer-icon" onClick={toggleDrawer} />
      </div>
    </header>
  );
}

export default Navbar;
