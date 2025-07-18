import React from 'react';
import { useParams } from 'react-router-dom';
import Home from './Home';

const CategoryPage = () => {
  const { category } = useParams();
  
  return (
    <div className="category-page">
      <Home initialCategory={category} />
    </div>
  );
};

export default CategoryPage;