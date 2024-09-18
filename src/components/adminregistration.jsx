import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Registration() {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errors, setErrors] = useState({});

  const navigate = useNavigate();

  const validateForm = () => {
    let errors = {};
    let isValid = true;

    // Full Name Validation (only letters allowed)
    if (!fullName) {
      isValid = false;
      errors["fullName"] = "Please enter your full name.";
    } else if (!/^[a-zA-Z\s]+$/.test(fullName)) {
      isValid = false;
      errors["fullName"] = "Name can only contain letters and spaces.";
    }

    // Email Validation
    if (!email) {
      isValid = false;
      errors["email"] = "Please enter your email.";
    } else if (!/^[A-Za-z][A-Za-z0-9._%+-]*@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/.test(email)) {
      isValid = false;
      errors["email"] = "Please enter a valid email that starts with a letter.";
    }

    // Password Validation (standard format)
    if (!password) {
      isValid = false;
      errors["password"] = "Please enter your password.";
    } else if (password.length < 6) {
      isValid = false;
      errors["password"] = "Password must be at least 6 characters.";
    } else if (!/[A-Z]/.test(password) || !/[a-z]/.test(password) || !/[0-9]/.test(password)) {
      isValid = false;
      errors["password"] = "Password must contain uppercase, lowercase, and a number.";
    }

    // Confirm Password Validation
    if (confirmPassword !== password) {
      isValid = false;
      errors["confirmPassword"] = "Passwords do not match.";
    }

    setErrors(errors);
    return isValid;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      const registrationData = {
        fullName,
        email,
        password
      };

      // Call the PHP API to insert data
      fetch('http://localhost/php-rest-api_old/adminregister.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(registrationData),
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.success) {
            navigate('/login');
          } else {
            alert('Registration failed: ' + data.message);
          }
        })
        .catch((error) => {
          console.error('Error:', error);
        });
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-4 bg-white rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold text-center">Register</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block mb-1 text-sm">Full Name</label>
            <input
              type="text"
              className="w-full p-2 border border-gray-300 rounded"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              required
            />
            {errors.fullName && <span className="text-red-500 text-sm">{errors.fullName}</span>}
          </div>
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
          <div className="mb-4">
            <label className="block mb-1 text-sm">Confirm Password</label>
            <input
              type="password"
              className="w-full p-2 border border-gray-300 rounded"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
            {errors.confirmPassword && <span className="text-red-500 text-sm">{errors.confirmPassword}</span>}
          </div>
          <button className="w-full bg-primary text-black py-2 rounded">Register</button>
        </form>
        <div className="text-center mt-4">
          <p className="text-sm">Already have an account?</p>
          <Link to="/login" className="text-blue-500 hover:underline">Login here</Link>
        </div>
      </div>
    </div>
  );
}

export default Registration;
