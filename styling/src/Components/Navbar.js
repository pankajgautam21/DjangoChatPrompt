// Navbar.jsx
import React from "react";
import "../css/Navbar.css";

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-logo">ChatPrompt</div>
      <ul className="navbar-links">
        <li className="navbar-item">Home</li>
        <li className="navbar-item">Chat</li>
        <li className="navbar-item">Settings</li>
      </ul>
      <div className="navbar-profile">
        <img
          src="https://via.placeholder.com/40"
          alt="Profile"
          className="profile-icon"
        />
      </div>
    </nav>
  );
};

export default Navbar;
