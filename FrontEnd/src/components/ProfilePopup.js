import React from 'react';
import '../styles/ProfilePopup.css';
import myprofile from '../images/profile.png';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
const ProfilePopup = ({ onClose }) => {
    const {user, logout} =useAuth();
    const {handleLogout}=useCart();
    const navigate=useNavigate();
    const handleSignOut = () => {
        logout();
        handleLogout();
        onClose();
        navigate('/')
      };
  return (
    <div className="profile-popup-overlay">
      <div className="profile-popup">
        <button className="close-profile" onClick={onClose}>×</button>
        <div className="profile-info">
          <img src={myprofile} alt="Profile" className="profile-image" />
          <h3>{user.username}</h3>
          <div className='profile-info-column'>
            <h4>Email</h4>
          <p>{user.email}</p>
          <h4>Address</h4>
         <p>{user.address}</p>
          </div>
        </div>
        <button className="sign-out-button" onClick={handleSignOut}>Sign Out</button>
      </div>
    </div>
  );
};

export default ProfilePopup;
