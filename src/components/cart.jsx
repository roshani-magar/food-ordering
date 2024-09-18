import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link } from 'react-router-dom';

const Cart = () => {
    const [cartItems, setCartItems] = useState([]);

    useEffect(() => {
        fetchCartItems();
    }, []);

    const fetchCartItems = async () => {
        try {
            const response = await axios.get('http://localhost/php-rest-api/cart.php?action=get');
            setCartItems(response.data);
        } catch (error) {
            toast.error('Error fetching cart items.');
            console.error('Error fetching cart items:', error);
        }
    };

    const handleAddToCart = async (item) => {
        try {
            const existingItem = cartItems.find(cartItem => cartItem.id === item.id);
            if (existingItem) {
                await handleQuantityChange(existingItem.id, existingItem.quantity + 1);
            } else {
                await axios.post('http://localhost/php-rest-api/cart.php?action=add', { id: item.id, quantity: 1 });
                fetchCartItems();
                toast.success(`${item.name} added to cart.`);
            }
        } catch (error) {
            toast.error('Error adding item to cart.');
            console.error('Error adding item to cart:', error);
        }
    };

    const handleQuantityChange = async (itemId, quantity) => {
        try {
            await axios.post('http://localhost/php-rest-api/cart.php?action=update', { id: itemId, quantity });
            fetchCartItems();
            toast.success('Quantity updated successfully.');
        } catch (error) {
            toast.error('Error updating quantity.');
            console.error('Error updating quantity:', error);
        }
    };

    const handleRemoveItem = async (itemId) => {
        try {
            await axios.post('http://localhost/php-rest-api/cart.php?action=remove', { id: itemId });
            fetchCartItems();
            toast.success('Item removed from cart.');
        } catch (error) {
            toast.error('Error removing item.');
            console.error('Error removing item:', error);
        }
    };

    const calculateSubtotal = () => {
        return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
    };

    const calculateTotalPrice = () => {
        const subtotal = calculateSubtotal();
        const tax = subtotal * 0.1; // Assume 10% tax for demonstration purposes
        return subtotal + tax;
    };

    return (
        <div className="flex flex-col md:flex-row gap-8 p-6">
            {/* Left Side - Cart Items */}
            <div className="w-full md:w-2/3">
                <h2 className="text-2xl font-bold mb-4">Your Cart</h2>
                {cartItems.length === 0 ? (
                    <p className="text-lg">Your cart is empty</p>
                ) : (
                    <div className="space-y-4">
                        {cartItems.map(item => (
                            <div key={item.id} className="flex justify-between items-center p-4 bg-white shadow rounded-lg">
                                <div>
                                    <h4 className="text-lg font-semibold">{item.name}</h4>
                                    <p className="text-sm">Price: ${item.price}</p>
                                </div>
                                <div className="flex items-center gap-2">
                                    <input
                                        type="number"
                                        value={item.quantity}
                                        min="1"
                                        onChange={(e) => handleQuantityChange(item.id, parseInt(e.target.value))}
                                        className="border rounded w-16 text-center"
                                    />
                                    <button
                                        onClick={() => handleRemoveItem(item.id)}
                                        className="text-red-500 hover:text-red-700"
                                    >
                                        Remove
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* Right Side - Summary and Checkout */}
            <div className="w-full md:w-1/3 bg-white p-6 shadow rounded-lg">
                <h3 className="text-xl font-bold mb-4">Order Summary</h3>
                <div className="space-y-2">
                    <div className="flex justify-between">
                        <span>Subtotal:</span>
                        <span>${calculateSubtotal().toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                        <span>Tax (10%):</span>
                        <span>${(calculateSubtotal() * 0.1).toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between font-bold">
                        <span>Total:</span>
                        <span>${calculateTotalPrice().toFixed(2)}</span>
                    </div>
                    <Link to="/checkout">
                        <button
                            className="w-full bg-blue-500 text-white py-2 mt-4 rounded hover:bg-blue-600"
                        >
                            Proceed to Checkout
                        </button>
                    </Link>
                </div>
            </div>
            <ToastContainer />
        </div>
    );
};

export default Cart;
