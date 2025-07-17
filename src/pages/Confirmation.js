import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaCheckCircle, FaBox, FaEnvelope } from 'react-icons/fa';

function Confirmation() {
  const navigate = useNavigate();
  const orderNumber = Math.floor(100000 + Math.random() * 900000);

  return (
    <div className="confirmation-page">
      <div className="confirmation-container">
        <FaCheckCircle className="success-icon" />
        <h1>Thank You for Your Purchase! 🎉</h1>
        <p className="confirmation-message">
          Your order has been successfully placed and will be processed shortly.
        </p>
        
        <div className="confirmation-details">
          <div className="detail-item">
            <FaBox className="detail-icon" />
            <div>
              <h3>Order Number</h3>
              <p>#{orderNumber}</p>
            </div>
          </div>
          <div className="detail-item">
            <FaEnvelope className="detail-icon" />
            <div>
              <h3>Confirmation Email</h3>
              <p>A confirmation email will be sent shortly</p>
            </div>
          </div>
        </div>

        <div className="confirmation-actions">
          <Link to="/" className="continue-shopping">
            Continue Shopping
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Confirmation;