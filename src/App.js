import './App.css';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useState, useEffect } from 'react';

import Navbar from './Components/Navbar/Navbar';
import NavAfterLogin from './Components/Navbar/NavAfterLogin';
import Footer from './Components/Footer/Footer';

import LoginSignup from './Pages/LoginSignup';
import Shop from './Pages/shop';
import ShopCategory from './Pages/ShopCategory';
import Product from './Pages/Product';
import Cart from './Pages/Cart';
import ProfilePage from './Pages/ProfilePage';

import men_banner from './Components/Assets/banner_mens.png';
import women_banner from './Components/Assets/banner_women.png';
import kid_banner from './Components/Assets/banner_kids.png';

function App() {
  // State token
  const [token, setToken] = useState(sessionStorage.getItem("token"));

  // Khi user đóng tab hoặc refresh thì token mất tự nhiên với sessionStorage
  // nhưng refresh trong tab thì vẫn giữ
  useEffect(() => {
    const handleStorageChange = () => setToken(sessionStorage.getItem("token"));
    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  // PrivateRoute component
  const PrivateRoute = ({ children }) => {
  return token ? children : <Navigate to="/login" replace />;
  };

  return (
    <BrowserRouter>
      {/* Navbar thay đổi theo token */}
      {token ? <NavAfterLogin /> : <Navbar />}

      <Routes>
        {/* Public routes */}
        <Route path="/login" element={<LoginSignup setToken={setToken} />} />
        <Route path="/" element={<Shop />} />
        <Route path="/mens" element={<ShopCategory banner={men_banner} category="men" />} />
        <Route path="/womens" element={<ShopCategory banner={women_banner} category="women" />} />
        <Route path="/kids" element={<ShopCategory banner={kid_banner} category="kid" />} />
        <Route path="/product/:productID" element={<Product />} />
        <Route path="/profile" element={
          <PrivateRoute>
            <ProfilePage setToken={setToken} />
          </PrivateRoute>
        } />

        {/* Private routes */}
        <Route path="/cart" element={
          <PrivateRoute>
            <Cart />
          </PrivateRoute>
        } />
      </Routes>

      <Footer />
    </BrowserRouter>
  );
}

export default App;
