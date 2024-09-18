import React, { useState } from 'react';
import Button from './Button';
import { Link, useNavigate } from 'react-router-dom';  // Import useNavigate

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});
  
  const navigate = useNavigate();  // Initialize useNavigate

  const validateForm = () => {
    let errors = {};
    let isValid = true;

    if (!email) {
      isValid = false;
      errors["email"] = "Please enter your email.";
    }

    if (typeof email !== "undefined") {
      const pattern = new RegExp(/^[^@\s]+@[^@\s]+\.[^@\s]+$/);
      if (!pattern.test(email)) {
        isValid = false;
        errors["email"] = "Please enter a valid email.";
      }
    }

    if (!password) {
      isValid = false;
      errors["password"] = "Please enter your password.";
    } else if (password.length < 6) {
      isValid = false;
      errors["password"] = "Password must be at least 6 characters.";
    }

    setErrors(errors);
    return isValid;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      // Handle form submission here (e.g., API call for login)
      console.log("Form submitted");

      // Navigate to the dashboard after successful login
      navigate('/dashboard');
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-4 bg-white rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold text-center">Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block mb-1 text-sm">Email Address</label>
            <input
              type="email"
              className="w-full p-2 border border-gray-300 rounded"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            {errors.email && <span className="text-red-500 text-sm">{errors.email}</span>}
          </div>
          <div className="mb-4">
            <label className="block mb-1 text-sm">Password</label>
            <input
              type="password"
              className="w-full p-2 border border-gray-300 rounded"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            {errors.password && <span className="text-red-500 text-sm">{errors.password}</span>}
          </div>
          <Button text='Login'></Button>
        </form>
        <div className="text-center mt-4">
          <p className="text-sm">Don't have an account?</p>
          <Link to="/adminregistration" className="text-blue-500 hover:underline">Register here</Link>
        </div>
      </div>
    </div>
  );
}

export default Login;
