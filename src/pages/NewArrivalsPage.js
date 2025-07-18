import React from 'react';
import Home from './Home';

const NewArrivalsPage = () => {
  return (
    <div className="new-arrivals-page">
      <div className="page-header">
        <h1>New Arrivals</h1>
        <p>Be the first to explore our latest products and trending items</p>
      </div>
      <Home filterType="new-arrivals" />
    </div>
  );
};

export default NewArrivalsPage;