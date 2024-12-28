import React from 'react';

function Dropdown({ isDropdownOpen, toggleDropdown }) {
  return (
    <ul
      className={`dropdown-list ${isDropdownOpen ? 'show' : 'close'}`}
      onClick={(e) => {
        e.stopPropagation();
        toggleDropdown();
      }}
    >
      <li className="dropdown-item">Web Development</li>
      <li className="dropdown-item">App Development</li>
      <li className="dropdown-item">SEO</li>
    </ul>
  );
}

export default Dropdown;
