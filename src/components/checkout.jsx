import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Checkout = () => {
    const [cartItems, setCartItems] = useState([]);
    const [contactInfo, setContactInfo] = useState({
        email: '',
        name: '',
        address: '',
        phone: '',
    });
    const [paymentMethod, setPaymentMethod] = useState('cod'); // Default to 'Cash on Delivery'

    useEffect(() => {
        fetchCartItems();
    }, []);

    const fetchCartItems = async () => {
        try {
            const response = await axios.get('http://localhost/php-rest-api/cart.php?action=get');
            console.log('Cart items fetched:', response.data);  // Debugging
            setCartItems(response.data);
        } catch (error) {
            toast.error('Error fetching cart items.');
            console.error('Error fetching cart items:', error);
        }
    };

    const calculateSubtotal = () => {
        return cartItems.reduce((total, item) => total + (Number(item.price) || 0) * item.quantity, 0);
    };

    const calculateTotalPrice = () => {
        const subtotal = calculateSubtotal();
        const tax = subtotal * 0.1; // Assume 10% tax for demonstration purposes
        return subtotal + tax;
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setContactInfo(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handlePaymentChange = (e) => {
        setPaymentMethod(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        // Prepare the data to send
        const orderData = {
            contactInfo: contactInfo,
            items: cartItems,
            paymentMethod: paymentMethod,
            total: calculateTotalPrice()  // Ensure 'total' is included
        };

        try {
            const response = await axios.post('http://localhost/php-rest-api/checkout.php', orderData, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            
            if (response.data.success) {
                toast.success(response.data.success);
                // Optionally, clear the cart or redirect user
            } else if (response.data.error) {
                toast.error(response.data.error);
            } else {
                toast.error('Order placement failed with unknown error.');
            }
        } catch (error) {
            toast.error('Error placing order.');
            console.error('Error placing order:', error);
        }
    };

    return (
        <div className="flex flex-col md:flex-row gap-8 p-6">
            {/* Left Side - Contact Information and Billing Address */}
            <div className="w-full md:w-2/3 bg-white p-6 shadow rounded-lg">
                <h2 className="text-2xl font-bold mb-4">Contact Information</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label htmlFor="email" className="block font-semibold mb-2">Email address</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={contactInfo.email}
                            onChange={handleChange}
                            required
                            className="w-full p-2 border rounded"
                        />
                    </div>

                    <h3 className="text-xl font-bold mt-6">Billing Address</h3>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label htmlFor="name" className="block font-semibold mb-2">Name</label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                value={contactInfo.name}
                                onChange={handleChange}
                                required
                                className="w-full p-2 border rounded"
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label htmlFor="address" className="block font-semibold mb-2">Address</label>
                            <input
                                type="text"
                                id="address"
                                name="address"
                                value={contactInfo.address}
                                onChange={handleChange}
                                required
                                className="w-full p-2 border rounded"
                            />
                        </div>
                        <div>
                            <label htmlFor="phone" className="block font-semibold mb-2">Phone</label>
                            <input
                                type="text"
                                id="phone"
                                name="phone"
                                value={contactInfo.phone}
                                onChange={handleChange}
                                required
                                className="w-full p-2 border rounded"
                            />
                        </div>
                    </div>

                    <h3 className="text-xl font-bold mt-6">Payment Options</h3>
                    <div className="space-y-2">
                        <div className="flex items-center">
                            <input
                                type="radio"
                                id="cod"
                                name="payment"
                                value="cod"
                                checked={paymentMethod === 'cod'}
                                onChange={handlePaymentChange}
                                className="mr-2"
                            />
                            <label htmlFor="cod" className="text-sm">Cash on Delivery</label>
                        </div>
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-blue-500 text-white py-2 mt-4 rounded hover:bg-blue-600"
                    >
                        Place Order
                    </button>
                </form>
            </div>

            {/* Right Side - Order Summary */}
            <div className="w-full md:w-1/3 bg-white p-6 shadow rounded-lg">
                <h3 className="text-xl font-bold mb-4">Order Summary</h3>
                <div className="space-y-4">
                    {cartItems.length > 0 ? (
                        cartItems.map(item => (
                            <div key={item.id} className="flex justify-between">
                                <div>
                                    <h4 className="font-semibold">{item.name}</h4>
                                    <p className="text-sm">Qty: {item.quantity}</p>
                                </div>
                                <div>
                                    <p>Rs {(Number(item.price) || 0).toFixed(2)}</p>
                                </div>
                            </div>
                        ))
                    ) : (
                        <p>Your cart is empty</p>
                    )}

                    {cartItems.length > 0 && (
                        <>
                            <div className="flex justify-between">
                                <span>Subtotal:</span>
                                <span>Rs {calculateSubtotal().toFixed(2)}</span>
                            </div>
                            <div className="flex justify-between">
                                <span>Tax (10%):</span>
                                <span>Rs {(calculateSubtotal() * 0.1).toFixed(2)}</span>
                            </div>
                            <div className="flex justify-between font-bold">
                                <span>Total:</span>
                                <span>Rs {calculateTotalPrice().toFixed(2)}</span>
                            </div>
                        </>
                    )}
                </div>
            </div>
            <ToastContainer />
        </div>
    );
};

export default Checkout;
