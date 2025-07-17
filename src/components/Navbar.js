import React, { useEffect, useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { CartContext } from '../context/CartContext';
import { FaShoppingCart, FaSearch, FaSun, FaMoon, FaUser } from 'react-icons/fa';

function Navbar() {
  const navigate = useNavigate();
  const username = localStorage.getItem("username");
  const [darkMode, setDarkMode] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { cartItems } = useContext(CartContext);
  const cartItemCount = cartItems.reduce((total, item) => total + item.quantity, 0);

  useEffect(() => {
    const savedMode = localStorage.getItem("darkMode") === "true";
    setDarkMode(savedMode);
    document.body.classList.toggle("dark-mode", savedMode);
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

  return (
    <nav className={`navbar ${darkMode ? "dark-mode" : ""}`}>
      <div className="nav-brand">
        <Link to="/" className="logo">EcoShop</Link>
        <button className="menu-toggle" onClick={() => setIsMenuOpen(!isMenuOpen)}>
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
            <button className="dropdown-trigger">Categories</button>
            <div className="dropdown-content">
              <Link to="/category/electronics">Electronics</Link>
              <Link to="/category/fashion">Fashion</Link>
              <Link to="/category/home">Home & Living</Link>
              <Link to="/category/books">Books</Link>
            </div>
          </div>
          <Link to="/deals">Deals</Link>
          <Link to="/new-arrivals">New Arrivals</Link>
        </div>

        <div className="nav-actions">
          <Link to="/cart" className="cart-icon">
            <FaShoppingCart />
            {cartItemCount > 0 && <span className="cart-count">{cartItemCount}</span>}
          </Link>

          <div className="user-menu">
            {username ? (
              <>
                <button className="user-button">
                  <FaUser />
                  <span>{username}</span>
                </button>
                <div className="user-dropdown">
                  <Link to="/profile">Profile</Link>
                  <Link to="/orders">Orders</Link>
                  <button onClick={handleLogout}>Logout</button>
                </div>
              </>
            ) : (
              <Link to="/login" className="login-button">
                <FaUser />
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
