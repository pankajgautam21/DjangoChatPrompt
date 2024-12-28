// Sidebar.jsx
import React, { useState } from "react";
import "../css/Sidebar.css";

const Sidebar = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <aside className={`sidebar ${isSidebarOpen ? "open" : "closed"}`}>
      <button className="sidebar-toggle-btn" onClick={toggleSidebar}>
        {isSidebarOpen ? "Hide" : "Show"} Sidebar
      </button>
      <ul className="sidebar-list">
        <li className="sidebar-item">Home</li>
        <li className="sidebar-item">Chat</li>
        <li className="sidebar-item" onClick={toggleDropdown}>
          Database
          <ul className={`dropdown-list ${isDropdownOpen ? "show" : ""}`}>
            <li className="dropdown-item">MySQL</li>
            <li className="dropdown-item">PostgreSQL</li>
            <li className="dropdown-item">MongoDB</li>
          </ul>
        </li>
        <li className="sidebar-item">Settings</li>
      </ul>
    </aside>
  );
};

export default Sidebar;
