import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import ProductPage from './pages/ProductPage';
import Navbar from './components/Navbar';
import ShopAll from './components/ShopAll';
import Cart from './pages/Cart';
import Footer from './components/Footer';
function App() {
    return (
        <Router>
            <Navbar />
            <Routes>
                <Route path='/' element={<Home />} />
                <Route path='/product/:id' element={<ProductPage />} />
                <Route path='/shop' element={<ShopAll/>} />
                <Route path="/cart" element={<Cart />} />
            </Routes>
               <Footer/>
        </Router>
    );
}
export default App;