import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaBars, FaArrowLeft, FaHome } from 'react-icons/fa'; // Import icons
import './Navbar.css'; // Ensure this file exists

function NavBar() {
  const navigate = useNavigate(); // Hook for navigation

  // Function to handle the back button click
  const handleBackClick = () => {
    navigate(-1); // Go back to the previous page
  };

  // Function to handle the home button click
  const handleHomeClick = () => {
    navigate('/home'); // Navigate to the home page
  };

  return (
    <div className="navbar">
      <button className="navbar-button" onClick={handleBackClick}>
        <FaArrowLeft size={24} color="white" />
      </button>

      <button className="navbar-button" onClick={handleHomeClick}>
        <FaHome size={24} color="white" />
      </button>

      <button className="navbar-button">
        <FaBars size={24} color="white" />
      </button>
    </div>
  );
}

export default NavBar;