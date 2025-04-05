import React, { useState, useEffect } from 'react';
import { FaTrash, FaPlus, FaMinus } from 'react-icons/fa';
import './Cart.css';

function Cart() {
    const [cart, setCart] = useState([]);

    useEffect(() => {
        const storedCart = JSON.parse(localStorage.getItem('cart')) || [];
        setCart(storedCart);
    }, []);

    // Function to update cart in state and localStorage
    const updateCart = (updatedCart) => {
        setCart(updatedCart);
        localStorage.setItem('cart', JSON.stringify(updatedCart));
    };

    // Increase quantity if the same product (same ID & size) exists
    const increaseQuantity = (name, size) => {
        const updatedCart = cart.map(item =>
            item.name === name && item.size === size ? { ...item, quantity: item.quantity + 1 } : item
        );
        updateCart(updatedCart);
    };

    // Decrease quantity (only if quantity > 1)
    const decreaseQuantity = (name, size) => {
        const updatedCart = cart.map(item =>
            item.name === name && item.size === size && item.quantity > 1
                ? { ...item, quantity: item.quantity - 1 }
                : item
        );
        updateCart(updatedCart);
    };

    // Remove product from cart
    const removeItem = (name, size) => {
        const updatedCart = cart.filter(item => !(item.name === name && item.size === size));
        updateCart(updatedCart);
    };

    // Calculate total price
    const getTotalPrice = () => {
        return cart.reduce((total, item) => total + item.price * item.quantity, 0);
    };

    return (
        <div className="cart-page">
            <h2>Shopping Cart</h2>
            {cart.length === 0 ? (
                <p className="empty-cart">Your cart is empty</p>
            ) : (
                <>
                    {cart.map((item, index) => (
                        <div key={`${item.id}-${item.size}`} className="cart-item">
                            <img src={item.image} alt={item.name} className="cart-image" />
                            <div className="cart-details">
                                <h3>{item.name} ({item.size})</h3>
                                <p>Price: ₹{item.price}</p>
                                <div className="cart-actions">
                                    <button onClick={() => decreaseQuantity(item.name, item.size)}><FaMinus /></button>
                                    <span>{item.quantity}</span>
                                    <button onClick={() => increaseQuantity(item.name, item.size)}><FaPlus /></button>
                                </div>
                                <button className="remove-btn" onClick={() => removeItem(item.name, item.size)}>
                                    <FaTrash /> Remove
                                </button>
                            </div>
                        </div>
                    ))}
                    <div className="cart-total">
                        <h3>Total: ₹{getTotalPrice()}</h3>
                        <button className="checkout-btn">Proceed to Checkout</button>
                    </div>
                </>
            )}
        </div>
    );
}

export default Cart;
