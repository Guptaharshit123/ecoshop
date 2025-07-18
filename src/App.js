import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import ProductDetail from "./pages/ProductDetail";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import Confirmation from "./pages/Confirmation";
import CategoryPage from "./pages/CategoryPage";
import DealsPage from "./pages/DealsPage";
import NewArrivalsPage from "./pages/NewArrivalsPage";
import Navbar from "./components/Navbar";
import { CartProvider } from "./context/CartContext";
import './styles.css';

const isAuthenticated = () => !!localStorage.getItem("username");

const PrivateRoute = ({ children }) => {
  if (!isAuthenticated()) {
    localStorage.setItem("previousPath", window.location.pathname);
    return <Navigate to="/login" />;
  }
  return children;
};

function App() {
  return (
    <CartProvider>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/product/:id" element={<ProductDetail />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<PrivateRoute><Checkout /></PrivateRoute>} />
          <Route path="/confirmation" element={<Confirmation />} />
          <Route path="/category/:category" element={<CategoryPage />} />
          <Route path="/deals" element={<DealsPage />} />
          <Route path="/new-arrivals" element={<NewArrivalsPage />} />
        </Routes>
      </Router>
    </CartProvider>
  );
}

export default App;