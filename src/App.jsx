import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './components/Home';
import Category from './components/Category';
import Menu from './components/Menu';
import AddFoodItem from './components/insert';
import FoodSearch from './components/linearsearch';
import CharacterSearch from './components/characterSearch';
import Cart from './components/cart';
import Checkout from './components/checkout';
import Contact from './components/Contact';
import Login from './components/adminlogin';
import Register from './components/adminregistration';
import Dashboard from './components/dashboard';  // Add this import

const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/category" element={<Category />} />
        <Route path="/menu" element={<Menu />} />
        <Route path="/insert" element={<AddFoodItem />} />
        <Route path="/lsearch" element={<FoodSearch />} />
        <Route path="/csearch" element={<CharacterSearch />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/adminlogin" element={<Login />} />
        <Route path="/adminregistration" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} /> {/* Dashboard route */}
      </Routes>
    </Router>
  );
};

export default App;
