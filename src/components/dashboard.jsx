import React, { useState, useEffect } from 'react';
import Chart from 'chart.js/auto'; // Import Chart.js
import axios from 'axios'; // To fetch data from your API

const Dashboard = () => {
  const [foodItems, setFoodItems] = useState([]);
  const [newFoodItem, setNewFoodItem] = useState({ name: '', price: '' });
  const [editingFoodItem, setEditingFoodItem] = useState(null); // For editing a food item
  const [chartData, setChartData] = useState({});

  // Fetch food items from the backend
  useEffect(() => {
    axios.get('http://localhost/php-rest-api_old/getFoodItems.php')
      .then(response => setFoodItems(response.data))
      .catch(error => console.error('Error fetching food items:', error));
  }, []);

  // Add new food item
  const handleAddFood = () => {
    axios.post('http://localhost/php-rest-api_old/addFoodItem.php', newFoodItem)
      .then(response => {
        if (response.data.success) {
          setFoodItems([...foodItems, newFoodItem]); // Update the food list
          setNewFoodItem({ name: '', price: '' }); // Clear form
        }
      })
      .catch(error => console.error('Error adding food item:', error));
  };

  // Delete food item
  const handleDeleteFood = (id) => {
    axios.delete(`http://localhost/php-rest-api_old/deleteFoodItem.php?id=${id}`)
      .then(response => {
        if (response.data.success) {
          setFoodItems(foodItems.filter(item => item.id !== id)); // Remove item from state
        }
      })
      .catch(error => console.error('Error deleting food item:', error));
  };

  // Set food item for editing
  const handleEditFood = (item) => {
    setEditingFoodItem(item);
  };

  // Update the edited food item
  const handleUpdateFood = () => {
    axios.put(`http://localhost/php-rest-api_old/updateFoodItem.php?id=${editingFoodItem.id}`, editingFoodItem)
      .then(response => {
        if (response.data.success) {
          setFoodItems(foodItems.map(item => item.id === editingFoodItem.id ? editingFoodItem : item));
          setEditingFoodItem(null); // Clear edit form
        }
      })
      .catch(error => console.error('Error updating food item:', error));
  };

  // Chart setup
  useEffect(() => {
    const ctx = document.getElementById('ordersChart').getContext('2d');
    new Chart(ctx, {
      type: 'bar',
      data: {
        labels: ['January', 'February', 'March', 'April', 'May', 'June'],
        datasets: [{
          label: 'Orders',
          data: [10, 50, 30, 70, 40, 90],
          backgroundColor: '#F37116',
        }]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });
  }, []);

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-64 bg-primary text-white">
        <div className="p-6 text-2xl font-bold">Admin Dashboard</div>
        <nav className="mt-10">
          <a href="#" className="block py-2.5 px-4 rounded transition duration-200 hover:bg-orange-700">
            Dashboard
          </a>
          <a href="#" className="block py-2.5 px-4 rounded transition duration-200 hover:bg-orange-700">
            Orders
          </a>
          <a href="#" className="block py-2.5 px-4 rounded transition duration-200 hover:bg-orange-700">
            Products
          </a>
          <a href="#" className="block py-2.5 px-4 rounded transition duration-200 hover:bg-orange-700">
            Customers
          </a>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Navbar */}
        <header className="bg-white shadow py-4 px-6">
          <div className="flex justify-between items-center">
            <h1 className="text-xl font-semibold">Dashboard</h1>
            <div>
              <button className="bg-primary text-white py-2 px-4 rounded">Log Out</button>
            </div>
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 p-6 bg-gray-100">
          <div className="grid grid-cols-3 gap-6">
            {/* Example Stat Cards */}
            <div className="bg-white shadow-lg p-4 rounded-lg">
              <h2 className="text-lg font-bold">Total Orders</h2>
              <p className="text-4xl mt-3">150</p>
            </div>
            <div className="bg-white shadow-lg p-4 rounded-lg">
              <h2 className="text-lg font-bold">Total Revenue</h2>
              <p className="text-4xl mt-3">$5,230</p>
            </div>
            <div className="bg-white shadow-lg p-4 rounded-lg">
              <h2 className="text-lg font-bold">New Customers</h2>
              <p className="text-4xl mt-3">23</p>
            </div>
          </div>

          {/* CRUD Operations for Food */}
          <div className="mt-8">
            <h2 className="text-xl font-bold mb-4">Manage Food Items</h2>
            <div className="grid grid-cols-2 gap-4">
              {/* Add Food Form */}
              <div className="bg-white p-4 rounded-lg shadow-lg">
                <h3 className="font-semibold text-lg">Add Food Item</h3>
                <input
                  type="text"
                  placeholder="Food Name"
                  className="block w-full p-2 border mt-2"
                  value={newFoodItem.name}
                  onChange={(e) => setNewFoodItem({ ...newFoodItem, name: e.target.value })}
                />
                <input
                  type="number"
                  placeholder="Price"
                  className="block w-full p-2 border mt-2"
                  value={newFoodItem.price}
                  onChange={(e) => setNewFoodItem({ ...newFoodItem, price: e.target.value })}
                />
                <button className="mt-4 bg-primary text-white py-2 px-4 rounded" onClick={handleAddFood}>
                  Add Food
                </button>
              </div>

              {/* Food Items List */}
              <div className="bg-white p-4 rounded-lg shadow-lg">
                <h3 className="font-semibold text-lg">Food Items</h3>
                <ul className="mt-4">
                  {foodItems.map((item, index) => (
                    <li key={index} className="border-b py-2 flex justify-between">
                      {item.name} - ${item.price}
                      {/* Buttons for Edit/Delete */}
                      <span>
                        <button className="text-blue-500 mr-2" onClick={() => handleEditFood(item)}>Edit</button>
                        <button className="text-red-500" onClick={() => handleDeleteFood(item.id)}>Delete</button>
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Edit Food Form */}
            {editingFoodItem && (
              <div className="bg-white p-4 rounded-lg shadow-lg mt-6">
                <h3 className="font-semibold text-lg">Edit Food Item</h3>
                <input
                  type="text"
                  placeholder="Food Name"
                  className="block w-full p-2 border mt-2"
                  value={editingFoodItem.name}
                  onChange={(e) => setEditingFoodItem({ ...editingFoodItem, name: e.target.value })}
                />
                <input
                  type="number"
                  placeholder="Price"
                  className="block w-full p-2 border mt-2"
                  value={editingFoodItem.price}
                  onChange={(e) => setEditingFoodItem({ ...editingFoodItem, price: e.target.value })}
                />
                <button className="mt-4 bg-primary text-white py-2 px-4 rounded" onClick={handleUpdateFood}>
                  Update Food
                </button>
              </div>
            )}
          </div>

          {/* Orders Chart */}
          <div className="mt-8 bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-xl font-bold mb-4">Orders Chart</h2>
            <canvas id="ordersChart" height="100"></canvas>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
