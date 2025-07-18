import React, { useEffect, useState, useContext } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { CartContext } from '../context/CartContext';
import { FaShoppingCart, FaSearch, FaSun, FaMoon, FaUser, FaTags, FaBolt, FaHome, FaTshirt, FaBook, FaLaptop } from 'react-icons/fa';

function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();
  const username = localStorage.getItem("username");
  const [darkMode, setDarkMode] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const { cartItems } = useContext(CartContext);
  const cartItemCount = cartItems.reduce((total, item) => total + item.quantity, 0);

  useEffect(() => {
    const savedMode = localStorage.getItem("darkMode") === "true";
    setDarkMode(savedMode);
    document.body.classList.toggle("dark-mode", savedMode);

    const handleScroll = () => {
      const navbar = document.querySelector('.navbar');
      if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }
    };

    const handleClickOutside = (event) => {
      const userMenu = document.querySelector('.user-menu');
      if (userMenu && !userMenu.contains(event.target)) {
        setIsUserMenuOpen(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    document.addEventListener('click', handleClickOutside);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  const toggleDarkMode = () => {
    const newMode = !darkMode;
    setDarkMode(newMode);
    document.body.classList.toggle("dark-mode", newMode);
    localStorage.setItem("darkMode", newMode);
  };

  const handleLogout = () => {
    localStorage.removeItem("username");
    navigate("/login");
  };

  const isActive = (path) => {
    return location.pathname === path || location.pathname.startsWith(path + '/');
  };

  return (
    <nav className={`navbar ${darkMode ? "dark-mode" : ""}`}>
      <div className="nav-brand">
        <Link to="/" className="logo">
          <FaHome className="logo-icon" />
          EcoShop
        </Link>
        <button 
          className={`menu-toggle ${isMenuOpen ? 'active' : ''}`} 
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle menu"
        >
          <span></span><span></span><span></span>
        </button>
      </div>
      
      <div className={`nav-content ${isMenuOpen ? 'active' : ''}`}>
        <div className="search-bar">
          <input
            type="text"
            placeholder="Search products..."
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              navigate(`/?search=${encodeURIComponent(e.target.value)}`);
            }}
          />
          <button className="search-button">
            <FaSearch />
          </button>
        </div>

        <div className="nav-links">
          <div className="categories-dropdown">
            <button className={`dropdown-trigger ${isMenuOpen ? 'active' : ''}`}>
              <FaTags className="nav-icon" />
              <span>Categories</span>
            </button>
            <div className="dropdown-content">
              <Link to="/category/electronics" className={isActive('/category/electronics') ? 'active' : ''}>
                <FaLaptop className="nav-icon" /> Electronics
              </Link>
              <Link to="/category/fashion" className={isActive('/category/fashion') ? 'active' : ''}>
                <FaTshirt className="nav-icon" /> Fashion
              </Link>
              <Link to="/category/home" className={isActive('/category/home') ? 'active' : ''}>
                <FaHome className="nav-icon" /> Home & Living
              </Link>
              <Link to="/category/books" className={isActive('/category/books') ? 'active' : ''}>
                <FaBook className="nav-icon" /> Books
              </Link>
            </div>
          </div>
          <Link to="/deals" className={`nav-link ${isActive('/deals') ? 'active' : ''}`}>
            <FaBolt className="nav-icon" /> Deals
          </Link>
          <Link to="/new-arrivals" className={`nav-link ${isActive('/new-arrivals') ? 'active' : ''}`}>
            <FaTags className="nav-icon" /> New Arrivals
          </Link>
        </div>

        <div className="nav-actions">
          <Link to="/cart" className={`cart-icon ${isActive('/cart') ? 'active' : ''}`}>
            <div className="icon-container">
              <FaShoppingCart className="nav-icon" />
              {cartItemCount > 0 && (
                <span className="cart-count" key={cartItemCount}>
                  {cartItemCount}
                </span>
              )}
            </div>
          </Link>

          <div className="user-menu">
            {username ? (
              <>
                <button className="user-button" onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}>
                  <FaUser className="nav-icon" />
                  <span>{username}</span>
                </button>
                <div className={`user-dropdown ${isUserMenuOpen ? 'active' : ''}`}>
                  <Link to="/profile" className={isActive('/profile') ? 'active' : ''}>
                    <FaUser className="nav-icon" /> Profile
                  </Link>
                  <Link to="/orders" className={isActive('/orders') ? 'active' : ''}>
                    <FaShoppingCart className="nav-icon" /> Orders
                  </Link>
                  <button onClick={handleLogout} className="logout-btn">
                    <FaUser className="nav-icon" /> Logout
                  </button>
                </div>
              </>
            ) : (
              <Link to="/login" className={`login-button ${isActive('/login') ? 'active' : ''}`}>
                <FaUser className="nav-icon" />
                <span>Login</span>
              </Link>
            )}
          </div>

          <button onClick={toggleDarkMode} className="theme-toggle">
            {darkMode ? <FaMoon /> : <FaSun />}
          </button>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
