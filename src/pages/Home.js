import React, { useContext, useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { CartContext } from '../context/CartContext';
import { FaHeart, FaShoppingCart, FaStar, FaFilter, FaSearch, FaTags, FaSpinner } from 'react-icons/fa';
import { MdLocalShipping } from 'react-icons/md';
import { generateProductImage } from '../utils/imageGenerator';
import '../styles.css';

const categories = [
  { id: 'all', name: 'All Products', icon: FaSearch, description: 'Browse our complete collection' },
  { id: 'electronics', name: 'Electronics', icon: FaStar, description: 'Latest gadgets and devices' },
  { id: 'fashion', name: 'Fashion & Accessories', icon: FaTags, description: 'Trendy clothing and accessories' },
  { id: 'home', name: 'Home & Living', icon: FaHeart, description: 'Beautiful home essentials' }
];

const dummyProducts = [
  // Electronics Category

  {
    id: 1,
    name: 'Premium Wireless Headphones',
    description: 'Active noise-cancelling over-ear headphones with 40h battery life',
    price: 149.99,
    originalPrice: 199.99,
    rating: 4.8,
    reviews: 1250,
    category: 'electronics',
    tags: ['wireless', 'audio', 'premium', 'new-arrival'],
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
    tags: ['smartwatch', 'fitness', 'health', 'deal'],
    stock: 20,
    shipping: 'Free Shipping',
    features: ['Heart Rate Monitor', 'ECG Sensor', 'Sleep Tracking'],
    imagePrompt: 'modern smartwatch with fitness tracking display, premium metallic finish'
  },
  {
    id: 3,
    name: 'Smart LED TV 55"',
    description: '4K Ultra HD Smart LED TV with HDR and voice control',
    price: 699.99,
    originalPrice: 899.99,
    rating: 4.7,
    reviews: 890,
    category: 'electronics',
    tags: ['tv', '4k', 'smart', 'deal'],
    stock: 8,
    shipping: 'Free Shipping',
    features: ['4K Resolution', 'Smart TV Features', 'HDR Support'],
    imagePrompt: 'modern 55 inch smart tv with thin bezels on stylish stand'
  },
  {
    id: 4,
    name: 'Gaming Laptop Pro',
    description: 'High-performance gaming laptop with RTX graphics and 144Hz display',
    price: 1299.99,
    originalPrice: 1499.99,
    rating: 4.9,
    reviews: 340,
    category: 'electronics',
    tags: ['gaming', 'laptop', 'premium', 'new-arrival'],
    stock: 5,
    shipping: 'Free Shipping',
    features: ['RTX 3070 Graphics', '16GB RAM', '1TB SSD'],
    imagePrompt: 'sleek gaming laptop with RGB keyboard and slim design'
  },

  // Fashion Category
  {
    id: 5,
    name: 'Designer Leather Handbag',
    description: 'Genuine leather handbag with premium gold-plated hardware',
    price: 199.99,
    originalPrice: 299.99,
    rating: 4.9,
    reviews: 450,
    category: 'fashion',
    tags: ['leather', 'luxury', 'accessories', 'new-arrival'],
    stock: 10,
    shipping: 'Free Shipping',
    features: ['Genuine Leather', 'Multiple Compartments', 'Detachable Strap'],
    imagePrompt: 'luxury leather handbag with gold hardware, professional product photography'
  },
  {
    id: 6,
    name: 'Premium Yoga Mat',
    description: 'Extra thick eco-friendly yoga mat with alignment lines',
    price: 45.99,
    originalPrice: 59.99,
    rating: 4.8,
    reviews: 750,
    category: 'fashion',
    tags: ['yoga', 'fitness', 'eco-friendly', 'deal'],
    stock: 30,
    shipping: 'Free Shipping',
    features: ['Eco-friendly Material', 'Alignment Lines', 'Extra Thick Padding'],
    imagePrompt: 'premium yoga mat with alignment lines, lifestyle product photography'
  },
  {
    id: 7,
    name: 'Designer Sunglasses',
    description: 'Premium UV-protected sunglasses with polarized lenses',
    price: 159.99,
    originalPrice: 199.99,
    rating: 4.7,
    reviews: 280,
    category: 'fashion',
    tags: ['accessories', 'luxury', 'new-arrival'],
    stock: 15,
    shipping: 'Free Shipping',
    features: ['UV Protection', 'Polarized Lenses', 'Premium Case'],
    imagePrompt: 'luxury sunglasses with gold frames on marble surface'
  },
  {
    id: 8,
    name: 'Premium Watch Collection',
    description: 'Luxury automatic watch with sapphire crystal and leather strap',
    price: 499.99,
    originalPrice: 699.99,
    rating: 4.9,
    reviews: 150,
    category: 'fashion',
    tags: ['watch', 'luxury', 'deal'],
    stock: 8,
    shipping: 'Free Shipping',
    features: ['Automatic Movement', 'Sapphire Crystal', 'Genuine Leather'],
    imagePrompt: 'luxury automatic watch with leather strap on dark background'
  },

  // Home & Living Category
  {
    id: 9,
    name: 'Modern Coffee Table',
    description: 'Contemporary design coffee table with storage',
    price: 249.99,
    originalPrice: 349.99,
    rating: 4.5,
    reviews: 320,
    category: 'home',
    tags: ['furniture', 'modern', 'storage', 'new-arrival'],
    stock: 12,
    shipping: 'Standard Shipping',
    features: ['Hidden Storage', 'Tempered Glass Top', 'Solid Wood Frame'],
    imagePrompt: 'modern coffee table with storage, contemporary furniture photography'
  },
  {
    id: 10,
    name: 'Smart Home Security System',
    description: 'Complete home security system with cameras and smart sensors',
    price: 399.99,
    originalPrice: 499.99,
    rating: 4.8,
    reviews: 420,
    category: 'home',
    tags: ['security', 'smart-home', 'deal'],
    stock: 15,
    shipping: 'Free Shipping',
    features: ['HD Cameras', 'Motion Sensors', 'Mobile App'],
    imagePrompt: 'modern home security camera system with smart features'
  },
  {
    id: 11,
    name: 'Luxury Bedding Set',
    description: 'Premium Egyptian cotton bedding set with duvet cover',
    price: 199.99,
    originalPrice: 299.99,
    rating: 4.7,
    reviews: 280,
    category: 'home',
    tags: ['bedding', 'luxury', 'new-arrival'],
    stock: 20,
    shipping: 'Free Shipping',
    features: ['Egyptian Cotton', 'Duvet Cover', 'Pillowcases'],
    imagePrompt: 'luxury white bedding set with textured duvet cover'
  },
  {
    id: 12,
    name: 'Smart Kitchen Bundle',
    description: 'Complete smart kitchen appliance set with voice control',
    price: 899.99,
    originalPrice: 1299.99,
    rating: 4.6,
    reviews: 180,
    category: 'home',
    tags: ['kitchen', 'smart-home', 'deal'],
    stock: 5,
    shipping: 'Free Shipping',
    features: ['Voice Control', 'Smart Display', 'Connected Apps'],
    imagePrompt: 'modern smart kitchen appliances with stainless steel finish'
  }
];

const Home = ({ filterType, initialCategory }) => {
  const { addToCart } = useContext(CartContext);
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const [searchQuery, setSearchQuery] = useState(queryParams.get('search') || '');
  const [selectedCategory, setSelectedCategory] = useState(initialCategory || 'all');
  const [priceRange, setPriceRange] = useState({ min: 0, max: 1000 });
  const [sortBy, setSortBy] = useState('featured');
  const [showFilters, setShowFilters] = useState(false);
  const [favorites, setFavorites] = useState([]);

  const isNewArrival = product => product.tags.includes('new-arrival');
const isDeal = product => product.tags.includes('deal');

const filteredProducts = dummyProducts
  .filter(product => {
    if (filterType === 'new-arrivals') return isNewArrival(product);
    if (filterType === 'deals') return isDeal(product);
    return true;
  })
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
  }, [location.search]);  // Remove queryParams from dependency array since it's derived from location.search

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
          <div className="search-container-main">
            <input
              type="text"
              placeholder="Search products by name, description, or tags..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="search-input-main"
            />
            <FaSearch className="search-icon-main" onClick={() => setSearchQuery(searchQuery)} />
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
          <div className="category-grid">
            {categories.map(category => (
              <button
                key={category.id}
                className={`category-card ${selectedCategory === category.id ? 'active' : ''}`}
                onClick={() => setSelectedCategory(category.id)}
              >
                <div className="category-icon">
                  <category.icon />
                </div>
                <h3>{category.name}</h3>
                <p className="category-description">{category.description}</p>
                <p className="category-count">
                  {category.id === 'all' 
                    ? `${dummyProducts.length} Products`
                    : `${dummyProducts.filter(p => p.category === category.id).length} Products`}
                </p>
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
          <div
            key={product.id}
            className="product-card"
            data-new-arrival={product.tags.includes('new-arrival')}
            data-deal={product.tags.includes('deal')}
          >
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
                    data-tag={tag}
                  >
                    <FaTags />
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
