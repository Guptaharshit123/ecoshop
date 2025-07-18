import React from 'react';
import Home from './Home';

const DealsPage = () => {
  return (
    <div className="deals-page">
      <div className="page-header">
        <h1>Special Deals</h1>
        <p>Discover our best offers and save big on premium products</p>
      </div>
      <Home filterType="deals" />
    </div>
  );
};

export default DealsPage;