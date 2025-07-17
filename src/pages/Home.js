import React, { useContext, useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { CartContext } from '../context/CartContext';
import { FaHeart, FaShoppingCart, FaStar, FaFilter, FaSearch, FaTags, FaSpinner } from 'react-icons/fa';
import { MdLocalShipping } from 'react-icons/md';
import { generateProductImage } from '../utils/imageGenerator';
import '../styles.css';

const categories = [
  { id: 'all', name: 'All Products', icon: FaSearch },
  { id: 'electronics', name: 'Electronics', icon: FaStar },
  { id: 'fashion', name: 'Fashion & Accessories', icon: FaTags },
  { id: 'home', name: 'Home & Living', icon: FaHeart }
];

const dummyProducts = [
  {
    id: 1,
    name: 'Premium Wireless Headphones',
    description: 'Active noise-cancelling over-ear headphones with 40h battery life',
    price: 149.99,
    originalPrice: 199.99,
    rating: 4.8,
    reviews: 1250,
    category: 'electronics',
    tags: ['wireless', 'audio', 'premium'],
    stock: 15,
    shipping: 'Free Shipping',
    features: ['Active Noise Cancellation', 'Bluetooth 5.0', '40h Battery Life'],
    imagePrompt: 'ultra realistic premium wireless headphones with sleek design, studio quality'
  },
  {
    id: 2,
    name: 'Smart Fitness Watch Pro',
    description: 'Advanced fitness tracking with heart rate, ECG, and sleep monitoring',
    price: 89.99,
    originalPrice: 129.99,
    rating: 4.6,
    reviews: 850,
    category: 'electronics',
    tags: ['smartwatch', 'fitness', 'health'],
    stock: 20,
    shipping: 'Free Shipping',
    features: ['Heart Rate Monitor', 'ECG Sensor', 'Sleep Tracking'],
    imagePrompt: 'modern smartwatch with fitness tracking display, premium metallic finish'
  },
  {
    id: 3,
    name: 'Portable Smart Speaker',
    description: 'Premium portable speaker with 360° sound and voice assistant',
    price: 59.99,
    originalPrice: 79.99,
    rating: 4.7,
    reviews: 620,
    category: 'electronics',
    tags: ['speaker', 'portable', 'smart'],
    stock: 25,
    shipping: 'Free Shipping',
    features: ['360° Sound', 'Voice Assistant', 'Waterproof'],
    imagePrompt: 'modern portable bluetooth speaker with LED display, premium fabric finish'
  },
  {
    id: 4,
    name: 'Designer Leather Handbag',
    description: 'Genuine leather handbag with premium gold-plated hardware',
    price: 199.99,
    originalPrice: 299.99,
    rating: 4.9,
    reviews: 450,
    category: 'fashion',
    tags: ['leather', 'luxury', 'accessories'],
    stock: 10,
    shipping: 'Free Shipping',
    features: ['Genuine Leather', 'Multiple Compartments', 'Detachable Strap'],
    imagePrompt: 'luxury leather handbag with gold hardware, professional product photography'
  },
  {
    id: 5,
    name: 'Smart LED TV 55"',
    description: '4K Ultra HD Smart LED TV with HDR and voice control',
    price: 699.99,
    originalPrice: 899.99,
    rating: 4.7,
    reviews: 890,
    category: 'electronics',
    tags: ['tv', '4k', 'smart'],
    stock: 8,
    shipping: 'Free Shipping',
    features: ['4K Resolution', 'Smart TV Features', 'HDR Support'],
    imagePrompt: 'modern 55 inch smart tv with thin bezels on stylish stand'
  },
  {
    id: 6,
    name: 'Modern Coffee Table',
    description: 'Contemporary design coffee table with storage',
    price: 249.99,
    originalPrice: 349.99,
    rating: 4.5,
    reviews: 320,
    category: 'home',
    tags: ['furniture', 'modern', 'storage'],
    stock: 12,
    shipping: 'Standard Shipping',
    features: ['Hidden Storage', 'Tempered Glass Top', 'Solid Wood Frame'],
    imagePrompt: 'modern coffee table with storage, contemporary furniture photography'
  },
  {
    id: 7,
    name: 'Premium Yoga Mat',
    description: 'Extra thick eco-friendly yoga mat with alignment lines',
    price: 45.99,
    originalPrice: 59.99,
    rating: 4.8,
    reviews: 750,
    category: 'fashion',
    tags: ['yoga', 'fitness', 'eco-friendly'],
    stock: 30,
    shipping: 'Free Shipping',
    features: ['Eco-friendly Material', 'Alignment Lines', 'Extra Thick Padding'],
    imagePrompt: 'premium yoga mat with alignment lines, lifestyle product photography'
  },
  {
    id: 1,
    name: 'Premium Wireless Headphones',
    description: 'Active noise-cancelling over-ear headphones with 40h battery life',
    price: 149.99,
    originalPrice: 199.99,
    rating: 4.8,
    reviews: 1250,
    category: 'electronics',
    tags: ['wireless', 'audio', 'premium'],
    stock: 15,
    shipping: 'Free Shipping',
    features: ['Active Noise Cancellation', 'Bluetooth 5.0', '40h Battery Life'],
    imagePrompt: 'ultra realistic premium wireless headphones with sleek design, studio quality'
  },
  {
    id: 2,
    name: 'Smart Fitness Watch Pro',
    description: 'Advanced fitness tracking with heart rate, ECG, and sleep monitoring',
    price: 89.99,
    originalPrice: 129.99,
    rating: 4.6,
    reviews: 850,
    category: 'electronics',
    tags: ['smartwatch', 'fitness', 'health'],
    stock: 20,
    shipping: 'Free Shipping',
    features: ['Heart Rate Monitor', 'ECG Sensor', 'Sleep Tracking'],
    imagePrompt: 'modern smartwatch with fitness tracking display, premium metallic finish'
  },
  {
    id: 3,
    name: 'Portable Smart Speaker',
    description: 'Premium portable speaker with 360° sound and voice assistant',
    price: 59.99,
    originalPrice: 79.99,
    rating: 4.7,
    reviews: 620,
    category: 'electronics',
    tags: ['speaker', 'portable', 'smart'],
    stock: 25,
    shipping: 'Free Shipping',
    features: ['360° Sound', 'Voice Assistant', 'Waterproof'],
    imagePrompt: 'modern portable bluetooth speaker with LED display, premium fabric finish'
  },
];

const Home = () => {
  const { addToCart } = useContext(CartContext);
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const [searchQuery, setSearchQuery] = useState(queryParams.get('search') || '');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [priceRange, setPriceRange] = useState({ min: 0, max: 1000 });
  const [sortBy, setSortBy] = useState('featured');
  const [showFilters, setShowFilters] = useState(false);
  const [favorites, setFavorites] = useState([]);

  const filteredProducts = dummyProducts
    .filter(product => {
      const matchesSearch = searchQuery === '' || 
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
      
      const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
      const matchesPrice = product.price >= priceRange.min && product.price <= priceRange.max;
      
      return matchesSearch && matchesCategory && matchesPrice;
    })
    .sort((a, b) => {
      switch(sortBy) {
        case 'price-low':
          return a.price - b.price;
        case 'price-high':
          return b.price - a.price;
        default:
          return 0;
      }
    });

  const toggleFavorite = (productId) => {
    setFavorites(prev => 
      prev.includes(productId)
        ? prev.filter(id => id !== productId)
        : [...prev, productId]
    );
  };

  const [selectedTags, setSelectedTags] = useState([]);
  const [viewMode, setViewMode] = useState('grid');
  const [isLoading, setIsLoading] = useState(false);
  const [productImages, setProductImages] = useState({});

  const handleTagClick = (tag) => {
    setSelectedTags(prev =>
      prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag]
    );
  };

  useEffect(() => {
    const searchParam = queryParams.get('search');
    if (searchParam !== null) {
      setSearchQuery(searchParam);
    }
  }, [location.search]);

  useEffect(() => {
    const loadProductImages = async () => {
      setIsLoading(true);
      const imagePromises = filteredProducts.map(async (product) => {
        if (!productImages[product.id]) {
          const imageUrl = await generateProductImage(product.name.toLowerCase());
          setProductImages(prev => ({
            ...prev,
            [product.id]: imageUrl
          }));
        }
      });

      await Promise.all(imagePromises);
      setIsLoading(false);
    };

    loadProductImages();
  }, [filteredProducts, productImages]);

  const renderProductFeatures = (features) => (
    <div className="product-features">
      {features.map((feature, index) => (
        <span key={index} className="feature-tag">{feature}</span>
      ))}
    </div>
  );

  return (
    <div className="home-container">
      <div className="home-header">
        <div className="header-content">
          <h1>Discover Amazing Products</h1>
          <div className="search-container">
            <input
              type="text"
              placeholder="Search products by name, description, or tags..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="search-input"
            />
            <FaSearch className="search-icon" onClick={() => setSearchQuery(searchQuery)} />
          </div>
          <p className="subtitle">Explore our curated collection of premium products</p>
        </div>
        <div className="header-actions">
          <div className="view-toggle">
            <button
              className={`view-btn ${viewMode === 'grid' ? 'active' : ''}`}
              onClick={() => setViewMode('grid')}
            >
              Grid
            </button>
            <button
              className={`view-btn ${viewMode === 'list' ? 'active' : ''}`}
              onClick={() => setViewMode('list')}
            >
              List
            </button>
          </div>
          <button 
            className="filter-toggle"
            onClick={() => setShowFilters(!showFilters)}
          >
            <FaFilter /> Filters
          </button>
        </div>
      </div>

      <div className={`filters-section ${showFilters ? 'show' : ''}`}>
        <div className="filter-group">
          <h3>Categories</h3>
          <div className="category-buttons">
            {categories.map(category => (
              <button
                key={category.id}
                className={`category-btn ${selectedCategory === category.id ? 'active' : ''}`}
                onClick={() => setSelectedCategory(category.id)}
              >
                <category.icon /> {category.name}
              </button>
            ))}
          </div>
        </div>

        <div className="filter-group">
          <h3>Price Range</h3>
          <div className="price-range">
            <input
              type="range"
              min="0"
              max="1000"
              value={priceRange.max}
              onChange={(e) => setPriceRange(prev => ({ ...prev, max: parseInt(e.target.value) }))}
            />
            <div className="price-inputs">
              <input
                type="number"
                value={priceRange.min}
                onChange={(e) => setPriceRange(prev => ({ ...prev, min: parseInt(e.target.value) }))}
                placeholder="Min"
              />
              <span>-</span>
              <input
                type="number"
                value={priceRange.max}
                onChange={(e) => setPriceRange(prev => ({ ...prev, max: parseInt(e.target.value) }))}
                placeholder="Max"
              />
            </div>
          </div>
        </div>

        <div className="filter-group">
          <h3>Sort By</h3>
          <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
            <option value="featured">Featured</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
          </select>
        </div>
      </div>

      <div className={`product-${viewMode}`}>
        {filteredProducts.map((product) => (
          <div key={product.id} className="product-card">
            <div className="product-image-container">
              {isLoading ? (
                <div className="product-image-placeholder">
                  <FaSpinner className="spinner" />
                </div>
              ) : productImages[product.id] ? (
                <img 
                  src={productImages[product.id]} 
                  alt={product.name} 
                  className="product-image" 
                />
              ) : (
                <div className="product-image-placeholder">
                  <FaSpinner className="spinner" />
                </div>
              )}
              <button 
                className={`favorite-btn ${favorites.includes(product.id) ? 'active' : ''}`}
                onClick={() => toggleFavorite(product.id)}
              >
                <FaHeart />
              </button>
            </div>
            <div className="product-info">
              <div className="product-header">
                <h3>{product.name}</h3>
                <div className="product-rating">
                  {[...Array(5)].map((_, index) => (
                    <FaStar
                      key={index}
                      className={index < Math.floor(product.rating) ? 'star-filled' : 'star-empty'}
                    />
                  ))}
                  <span>({product.rating} - {product.reviews} reviews)</span>
                </div>
              </div>
              
              <p className="product-description">{product.description}</p>
              
              {renderProductFeatures(product.features)}
              
              <div className="product-tags">
                {product.tags.map(tag => (
                  <button
                    key={tag}
                    className={`tag-btn ${selectedTags.includes(tag) ? 'active' : ''}`}
                    onClick={() => handleTagClick(tag)}
                  >
                    #{tag}
                  </button>
                ))}
              </div>
              
              <div className="product-footer">
                <div className="product-price">
                  <span className="price">${product.price}</span>
                  <span className="original-price">${product.originalPrice}</span>
                  <span className="discount">
                    {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}% OFF
                  </span>
                </div>
                
                <div className="product-stock">
                  <span className={`stock-status ${product.stock < 5 ? 'low-stock' : ''}`}>
                    {product.stock < 5 ? 'Low Stock' : `${product.stock} in stock`}
                  </span>
                  <span className="shipping">
                    <MdLocalShipping /> {product.shipping}
                  </span>
                </div>
                
                <button 
                  className="add-to-cart-btn" 
                  onClick={() => addToCart(product)}
                  disabled={product.stock === 0}
                >
                  <FaShoppingCart /> {product.stock === 0 ? 'Out of Stock' : 'Add to Cart'}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
