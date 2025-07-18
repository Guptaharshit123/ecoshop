import React, { useContext, useState, useEffect } from "react";
import { CartContext } from "../context/CartContext";
import { Link } from "react-router-dom";
import { FaTrash, FaMinus, FaPlus, FaShoppingCart, FaSpinner } from 'react-icons/fa';
import { generateProductImage } from '../utils/imageGenerator';

function Cart() {
  const {
    cartItems,
    total,
    updateQuantity,
    removeFromCart,
    totalSavings
  } = useContext(CartContext);

  const [productImages, setProductImages] = useState({});
  // eslint-disable-next-line no-unused-vars
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const loadProductImages = async () => {
      setLoading(true);
      const imagePromises = cartItems.map(async (item) => {
        if (!productImages[item.id]) {
          const imageUrl = await generateProductImage(item.name.toLowerCase());
          setProductImages(prev => ({
            ...prev,
            [item.id]: imageUrl
          }));
        }
      });

      await Promise.all(imagePromises);
      setLoading(false);
    };

    loadProductImages();
  }, [cartItems, productImages]);

  const handleQuantityChange = (itemId, currentQuantity, change) => {
    if (currentQuantity + change >= 1) {
      updateQuantity(itemId, currentQuantity + change);
    }
  };

  return (
    <div className="cart-page">
      <div className="cart-header">
        <h1>Your Shopping Cart</h1>
        <FaShoppingCart className="cart-icon" />
      </div>
      
      {cartItems.length === 0 ? (
        <div className="empty-cart">
          <p>Your cart is empty</p>
          <Link to="/" className="continue-shopping">
            Continue Shopping
          </Link>
        </div>
      ) : (
        <div className="cart-container">
          <div className="cart-items">
            {cartItems.map((item) => (
              <div key={item.id} className="cart-item">
                <div className="item-image">
                  {productImages[item.id] ? (
                    <img src={productImages[item.id]} alt={item.name} />
                  ) : (
                    <div className="product-image-placeholder">
                      <FaSpinner className="spinner" />
                    </div>
                  )}
                </div>
                <div className="item-details">
                  <h3>{item.name}</h3>
                  <p className="item-description">{item.description}</p>
                  <div className="price-details">
                    <span className="current-price">${item.price}</span>
                    {item.originalPrice && (
                      <span className="original-price">${item.originalPrice}</span>
                    )}
                  </div>
                </div>
                <div className="item-controls">
                  <div className="quantity-control">
                    <button 
                      onClick={() => handleQuantityChange(item.id, item.quantity, -1)}
                      className="quantity-btn"
                      disabled={item.quantity <= 1}
                    >
                      <FaMinus />
                    </button>
                    <span className="quantity">{item.quantity}</span>
                    <button 
                      onClick={() => handleQuantityChange(item.id, item.quantity, 1)}
                      className="quantity-btn"
                    >
                      <FaPlus />
                    </button>
                  </div>
                  <button 
                    className="remove-btn"
                    onClick={() => removeFromCart(item.id)}
                  >
                    <FaTrash />
                  </button>
                </div>
                <div className="item-total">
                  <p>Total: ${(item.price * item.quantity).toFixed(2)}</p>
                </div>
              </div>
            ))}
          </div>
          
          <div className="cart-summary">
            <h3>Order Summary</h3>
            <div className="summary-row">
              <span>Subtotal</span>
              <span>${total.toFixed(2)}</span>
            </div>
            <div className="summary-row">
              <span>Savings</span>
              <span className="savings">-${totalSavings.toFixed(2)}</span>
            </div>
            <div className="summary-row total">
              <span>Total</span>
              <span>${(total - totalSavings).toFixed(2)}</span>
            </div>
            <Link to="/checkout" className="checkout-btn">
              Proceed to Checkout
            </Link>
            <Link to="/" className="continue-shopping">
              Continue Shopping
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}

export default Cart;
